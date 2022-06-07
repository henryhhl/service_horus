<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\NotaCompraRequest;
use App\Models\Comercio\Compra\ConceptoCompra;
use App\Models\Comercio\Compra\DevolucionCompra;
use App\Models\Comercio\Compra\LibroCompra;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\NotaCompraDetalle;
use App\Models\Comercio\Compra\OrdenCompra;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Compra\ProveedorProducto;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;
use App\Models\Comercio\Inventario\AlmacenUnidadMedidaProducto;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\SeccionInventario;
use App\Models\Comercio\Inventario\UnidadMedidaProducto;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\TipoTransaccion;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotaCompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        try {

            $esPaginado = isset( $request->esPaginado ) ? $request->esPaginado : 1;
            $obj = new NotaCompra();

            if ( $esPaginado == 0 ) {

                $notacompra = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'notacompra'  => $notacompra,
                ] );
            }

            $notacompra = $obj->get_paginate( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'notacompra'  => $notacompra->getCollection(),
                'pagination' => [
                    'total'        => $notacompra->total(),
                    'current_page' => $notacompra->currentPage(),
                    'per_page'     => $notacompra->perPage(),
                    'last_page'    => $notacompra->lastPage(),
                    'from'         => $notacompra->firstItem(),
                    'to'           => $notacompra->lastItem(),
                ],
                'request' => $request->all(),
                'ip' => $request->ip(),
            ] );

        } catch ( \Exception $th ) {

            return response( )->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create( Request $request )
    {
        try {

            $obj = new NotaCompra();
            $idnotacompra = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            $suc = new Sucursal();
            $arraySucursal = $suc->get_data( $suc, $request );

            $concepcomp = new ConceptoCompra();
            $arrayConceptoCompra = $concepcomp->get_data( $concepcomp, $request );

            $seccinv = new SeccionInventario();
            $arraySeccionInventario = $seccinv->get_data( $seccinv, $request );

            return response()->json( [
                'response' => 1,
                'idnotacompra' => $idnotacompra,
                'arrayMoneda'   => $moneda,
                'arraySucursal'   => $arraySucursal,
                'arrayConceptoCompra'   => $arrayConceptoCompra,
                'arraySeccionInventario'   => $arraySeccionInventario,
            ] );

        } catch ( \Exception $th ) {

            return response( )->json( [
                'response' => -4,
                'message'  => 'Error al procesar la solicitud',
                'error'    => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NotaCompraRequest $request)
    {
        try {

            DB::beginTransaction();

            $obj = new NotaCompra();
            $notacompra = $obj->store( $obj, $request );

            $request->fkidnotacompra = $notacompra->idnotacompra;

            if ( !is_null( $notacompra->fkidordencompra ) ) {
                $ordcomp = new OrdenCompra();
                $ordencompra = $ordcomp->find( $notacompra->fkidordencompra );
                $ordencompra->iscompra = "A";
                $ordencompra->update();
            }

            $prov = new Proveedor();
            $proveedor = $prov->find( $notacompra->fkidproveedor );
            if ( !is_null( $proveedor ) ) {
                $proveedor->nroorden = intval( $proveedor->nroorden ) + 1;
                $proveedor->update();
            }

            $tpotrans = new TipoTransaccion();
            $tipotransaccion = $tpotrans->find( $notacompra->fkidtipotransaccion );
            if ( !is_null( $tipotransaccion ) ) {
                $tipotransaccion->cantidadrealizada = intval( $tipotransaccion->cantidadrealizada ) + 1;
                $tipotransaccion->update();
            }

            $arrayNotaCompraDetalle = json_decode($request->input('arrayNotaCompraDetalle', '[]'));
            foreach ( $arrayNotaCompraDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {
                    $detalle->fkidnotacompra = $notacompra->idnotacompra;
                    $almproddet = new AlmacenProductoDetalle();
                    if ( !$almproddet->existAlmacenProducto( $almproddet, $notacompra->fkidalmacen, $detalle->fkidproducto ) ) {
                        $almproddet->fkidproducto = $detalle->fkidproducto;
                        $almproddet->fkidalmacen = $notacompra->fkidalmacen;
                        $almproddet->stockactual = $detalle->cantidad;
                        $almproddet->compras = 1;
                        $almproddet->fecha = $request->x_fecha;
                        $almproddet->hora = $request->x_hora;
                        $almproddet->save();
                        $detalle->fkidalmacenproductodetalle = $almproddet->idalmacenproductodetalle;
                    } else {
                        $firstAlmProd = $almproddet->firstAlmacenProducto( $almproddet, $notacompra->fkidalmacen, $detalle->fkidproducto );
                        $almacenproductodetalle = $almproddet->find( $firstAlmProd->idalmacenunidadmedidaproducto );
                        $almacenproductodetalle->stockactual = intval($detalle->cantidad) + intval($almacenproductodetalle->cantidad);
                        $almacenproductodetalle->compras = intval($almproddet->compras) + 1;
                        $almacenproductodetalle->update();

                        $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                    }

                    $notacompradetalle = new NotaCompraDetalle();
                    $notacompradetalle->store($notacompradetalle, $request, $detalle);

                    $prod = new Producto();
                    $producto = $prod->find( $detalle->fkidproducto );
                    $producto->stockactual = intval($producto->stockactual) + intval($detalle->cantidad);
                    $producto->update();

                    $provprod = new ProveedorProducto();
                    if ( $provprod->existProd( $provprod, $detalle->fkidproducto, $notacompra->fkidproveedor ) ) {
                        $firstProvProd = $provprod->firstProvProd( $provprod, $detalle->fkidproducto, $notacompra->fkidproveedor );
                        $proveedorproducto = $provprod->find( $firstProvProd->idproveedorproducto );
                        if ( !is_null( $proveedorproducto ) ) {
                            $proveedorproducto->stock = intval($proveedorproducto->stock) + intval($detalle->cantidad);
                            $proveedorproducto->update();
                        }
                    }

                }
            }

            $libcomp = new LibroCompra();
            $librocompra = $libcomp->store($libcomp, $request);

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'notacompra' => $notacompra,
                'librocompra' => $librocompra,
                'message'  => 'Nota Compra registrado éxitosamente.',
            ] );

        } catch ( \Exception $th ) {
            DB::rollBack();
            return response( )->json( [
                'response' => -4,
                'message'  => 'Error al procesar la solicitud.',
                'error'    => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Request $request, $idnotacompra )
    {
        try {

            $obj = new NotaCompra();
            $notacompra = $obj->show( $obj, $idnotacompra );

            if ( is_null( $notacompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Compra no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notacompra'   => $notacompra,
            ] );

        } catch (\Exception $th) {
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit( Request $request, $idnotacompra )
    {
        try {

            $obj = new NotaCompra();
            $notacompra = $obj->show( $obj, $idnotacompra );

            if ( is_null( $notacompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Compra no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'notacompra'   => $notacompra,
            ] );

        } catch (\Exception $th) {
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( NotaCompraRequest $request )
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function delete( Request $request )
    {
        try {

            DB::beginTransaction();

            $regla = [
                'idnotacompra' => 'required',
            ];

            $mensajes = [
                'idnotacompra.required' => 'El ID Nota Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaCompra();
            $notacompra = $obj->find( $request->idnotacompra );

            if ( is_null( $notacompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Compra no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $devcomp = new DevolucionCompra();
            if ( !$devcomp->existsNotaCompra( $devcomp, $request->idnotacompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que se encuentra registrado en una devolución.',
                ] );
            }

            //

            /* fin de restriccion */

            $prov = new Proveedor();
            $proveedor = $prov->find( $notacompra->fkidproveedor );
            if ( !is_null( $proveedor ) ) {
                $proveedor->nroorden = intval( $proveedor->nroorden ) - 1;
                $proveedor->update();
            }

            if ( !is_null( $notacompra->fkidordencompra ) ) {
                $ordcomp = new OrdenCompra();
                $ordencompra = $ordcomp->find( $notacompra->fkidordencompra );
                if ( !is_null( $ordencompra ) ) {
                    $ordencompra->iscompra = "N";
                    $ordencompra->update();
                }
            }

            $notacompradelete = $obj->remove( $obj, $request );

            if ( $notacompradelete ) {
                $ntacompdet = new NotaCompraDetalle();
                $arrayNotaCompraDetalle = $ntacompdet->getCompraDetalle( $ntacompdet, $request->idnotacompra );

                foreach ( $arrayNotaCompraDetalle as $detalle ) {
                    $notacompradetalle = $ntacompdet->find( $detalle->idnotacompradetalle );
                    if ( !is_null( $notacompradetalle ) ) {
                        $almundmedprod = new AlmacenUnidadMedidaProducto();
                        $almacenunidadmedidaproducto = $almundmedprod->find($notacompradetalle->fkidalmacenunidadmedidaproducto);
                        if ( !is_null( $almacenunidadmedidaproducto ) ) {
                            $almacenunidadmedidaproducto->stockactual = intval( $almacenunidadmedidaproducto->stockactual ) - intval( $notacompradetalle->cantidad );
                            $almacenunidadmedidaproducto->compras = intval( $almacenunidadmedidaproducto->compras ) - 1;
                            $almacenunidadmedidaproducto->update();
                        }

                        $undmedprod = new UnidadMedidaProducto();
                        $unidadmedidaproducto = $undmedprod->find($notacompradetalle->fkidunidadmedidaproducto);
                        if ( !is_null( $unidadmedidaproducto ) ) {
                            $unidadmedidaproducto->stock = intval( $unidadmedidaproducto->stock ) - intval( $notacompradetalle->cantidad );
                            $unidadmedidaproducto->update();

                            $prod = new Producto();
                            $producto = $prod->find($unidadmedidaproducto->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) - intval( $notacompradetalle->cantidad );
                                $producto->update();
                            }
                        }
                        $notacompradetalle->delete();
                    }
                }
            }

            DB::commit();
            return response()->json( [
                'response' => 1,
                'message'  => 'Nota Compra eliminado éxitosamente.',
            ] );

        } catch (\Exception $th) {
            DB::rollBack();
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    public function searchByID(Request $request)
    {
        try {

            $regla = [
                'idnotacompra' => 'required',
            ];

            $mensajes = [
                'idnotacompra.required' => 'El ID Nota Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idnotacompra = $request->input('idnotacompra');

            $obj = new NotaCompra();
            $notacompra = $obj->searchByID( $obj, $idnotacompra );

            if ( is_null( $notacompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Compra no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'notacompra' => $notacompra,
            ] );

        } catch (\Exception $th) {
            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

    public function reporte(Request $request)
    {
        try {

            $obj = new NotaCompra();

            $notacompra = $obj->get_data( $obj, $request );

            if ( sizeof( $notacompra ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Nota Compra insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];

            return response()->json( [
                'response'      => 1,
                'fecha'         => $fecha,
                'hora'          => $hora,
                'arrayNotaCompra' => $notacompra,
            ] );

        } catch (\Exception $th) {

            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

}
