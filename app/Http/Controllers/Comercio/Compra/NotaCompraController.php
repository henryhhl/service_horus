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
                $proveedor->cantidadtotalcomprarealizada = $proveedor->cantidadtotalcomprarealizada + 1;
                $proveedor->cantidadcomprarealizada = $proveedor->cantidadcomprarealizada + 1;
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
                    if ( !$almproddet->existAlmacenProducto( $almproddet, $detalle->fkidalmacen, $detalle->fkidproducto ) ) {
                        $almproddet->fkidproducto = $detalle->fkidproducto;
                        $almproddet->fkidalmacen = $detalle->fkidalmacen;
                        $almproddet->stockactual = $detalle->cantidad;
                        $almproddet->totalcompras = $detalle->cantidad;
                        $almproddet->compras = $detalle->cantidad;
                        $almproddet->fecha = $request->x_fecha;
                        $almproddet->hora = $request->x_hora;
                        $almproddet->save();
                        $detalle->fkidalmacenproductodetalle = $almproddet->idalmacenproductodetalle;
                    } else {
                        $firstAlmProd = $almproddet->firstAlmacenProducto( $almproddet, $detalle->fkidalmacen, $detalle->fkidproducto );
                        $almacenproductodetalle = $almproddet->find( $firstAlmProd->idalmacenproductodetalle );
                        $almacenproductodetalle->stockactual = intval($detalle->cantidad) + intval($almacenproductodetalle->stockactual);
                        $almacenproductodetalle->totalcompras = intval($almacenproductodetalle->totalcompras) + intval($almacenproductodetalle->stockactual);
                        $almacenproductodetalle->compras = intval($almacenproductodetalle->compras) + intval($almacenproductodetalle->stockactual);
                        $almacenproductodetalle->update();

                        $detalle->fkidalmacenproductodetalle = $almacenproductodetalle->idalmacenproductodetalle;
                    }

                    $prod = new Producto();
                    $producto = $prod->find( $detalle->fkidproducto );
                    $producto->stockactual = intval($producto->stockactual) + intval($detalle->cantidad);
                    $producto->totalnotacompra = intval($producto->totalnotacompra) + intval($detalle->cantidad);
                    $producto->notacompra = intval($producto->notacompra) + intval($detalle->cantidad);
                    $producto->update();

                    $provprod = new ProveedorProducto();
                    if ( $provprod->existProd( $provprod, $detalle->fkidproducto, $detalle->fkidproveedor ) ) {
                        $firstProvProd = $provprod->firstProvProd( $provprod, $detalle->fkidproducto, $detalle->fkidproveedor );
                        $proveedorproducto = $provprod->find( $firstProvProd->idproveedorproducto );
                        if ( !is_null( $proveedorproducto ) ) {
                            $proveedorproducto->stock = intval($proveedorproducto->stock) + intval($detalle->cantidad);
                            $proveedorproducto->update();
                        }
                    }
                    if ( !is_null( $proveedor ) ) {
                        $proveedor->cantidadtotalproductocomprarealizada = $proveedor->cantidadtotalproductocomprarealizada + intval($detalle->cantidad);
                        $proveedor->cantidadproductocomprarealizada = $proveedor->cantidadproductocomprarealizada + intval($detalle->cantidad);
                        $proveedor->update();
                    }

                    $ntacompdet = new NotaCompraDetalle();
                    $notacompradetalle = $ntacompdet->store($ntacompdet, $request, $detalle);
                    if ( $notacompradetalle ) {
                        // Verifiaciones
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
                'idnotacompra.required' => 'El ID es requerido.'
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

            if ( $notacompra->isdevolucioncompra == "A" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Funcionalidad no permitido. Ya que se encuentra en DEVOLUCIÓN DE COMPRA registrado.',
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

            $provdor = new Proveedor();
            $proveedor = $provdor->find( $notacompra->fkidproveedor );

            if ( !is_null( $proveedor ) ) {
                $proveedor->nroorden = intval( $proveedor->nroorden ) - 1;
                $proveedor->cantidadtotalcomprarealizada = $proveedor->cantidadtotalcomprarealizada - 1;
                $proveedor->cantidadcompracancelada = $proveedor->cantidadcompracancelada + 1;
                $proveedor->update();
            }

            $notacompradelete = $obj->remove( $obj, $request );

            if ( $notacompradelete ) {
                $ntacompdet = new NotaCompraDetalle();
                $arrayNotaCompraDetalle = $ntacompdet->getCompraDetalle( $ntacompdet, $request->idnotacompra );

                foreach ( $arrayNotaCompraDetalle as $detalle ) {
                    $notacompradetalle = $ntacompdet->find( $detalle->idnotacompradetalle );
                    if ( !is_null( $notacompradetalle ) ) {
                        $notacompradetalledelete = $notacompradetalle->delete();
                        if ( $notacompradetalledelete ) {
                            $almproddet = new AlmacenProductoDetalle();
                            $almacenproductodetalle = $almproddet->find($notacompradetalle->fkidalmacenproductodetalle);
                            if ( !is_null( $almacenproductodetalle ) ) {
                                $almacenproductodetalle->stockactual = intval( $almacenproductodetalle->stockactual ) - intval( $notacompradetalle->cantidad );
                                $almacenproductodetalle->totalcompras = intval( $almacenproductodetalle->totalcompras ) - intval( $notacompradetalle->cantidad );
                                $almacenproductodetalle->compracancelada = intval( $almacenproductodetalle->compracancelada ) + intval( $notacompradetalle->cantidad );
                                $almacenproductodetalle->update();
                            }
                            $prod = new Producto();
                            $producto = $prod->find($almacenproductodetalle->fkidproducto);
                            if ( !is_null( $producto ) ) {
                                $producto->stockactual = intval( $producto->stockactual ) - intval( $notacompradetalle->cantidad );
                                $producto->totalnotacompra = intval( $producto->totalnotacompra ) - intval( $notacompradetalle->cantidad );
                                $producto->notacompracancelado = intval( $producto->notacompracancelado ) + intval( $notacompradetalle->cantidad );
                                $producto->update();
                            }

                            $provprod = new ProveedorProducto();
                            if ( $provprod->existProd( $provprod, $notacompradetalle->fkidproducto, $notacompradetalle->fkidproveedor ) ) {
                                $firstProvProd = $provprod->firstProvProd( $provprod, $notacompradetalle->fkidproducto, $notacompradetalle->fkidproveedor );
                                $proveedorproducto = $provprod->find( $firstProvProd->idproveedorproducto );
                                if ( !is_null( $proveedorproducto ) ) {
                                    $proveedorproducto->stock = intval($proveedorproducto->stock) - intval($detalle->cantidad);
                                    $proveedorproducto->update();
                                }
                            }
                            if ( !is_null( $proveedor ) ) {
                                $proveedor->cantidadtotalproductocomprarealizada = $proveedor->cantidadtotalproductocomprarealizada - intval($notacompradetalle->cantidad);
                                $proveedor->cantidadproductocompracancelada = $proveedor->cantidadproductocompracancelada + intval($notacompradetalle->cantidad);
                                $proveedor->update();
                            }
                        }
                    }
                }

                if ( !is_null( $notacompra->fkidordencompra ) ) {
                    $ordcomp = new OrdenCompra();
                    $ordencompra = $ordcomp->find( $notacompra->fkidordencompra );
                    if ( !is_null( $ordencompra ) ) {
                        $ordencompra->iscompra = "N";
                        $ordencompra->update();
                    }
                }

                $tpotrans = new TipoTransaccion();
                $tipotransaccion = $tpotrans->find( $notacompra->fkidtipotransaccion );
                if ( !is_null( $tipotransaccion ) ) {
                    $tipotransaccion->cantidadcancelada = intval( $tipotransaccion->cantidadcancelada ) + 1;
                    $tipotransaccion->update();
                }

                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Compra eliminado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar Nota Compra.',
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
