<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\NotaCompraRequest;
use App\Models\Comercio\Compra\LibroCompra;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\NotaCompraDetalle;
use App\Models\Comercio\Compra\OrdenCompra;
use App\Models\Comercio\Compra\ProveedorProducto;
use App\Models\Comercio\Inventario\AlmacenUnidadMedidaProducto;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\UnidadMedidaProducto;
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

            return response()->json( [
                'response' => 1,
                'idnotacompra' => $idnotacompra,
                'arrayMoneda'   => $moneda,
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

            $arrayNotaCompraDetalle = json_decode($request->input('arrayNotaCompraDetalle', '[]'));
            foreach ( $arrayNotaCompraDetalle as $detalle ) {

                if ( !is_null( $detalle->fkidproducto ) ) {
                    $detalle->fkidnotacompra = $notacompra->idnotacompra;

                    $almundmedprod = new AlmacenUnidadMedidaProducto();
                    if ( !$almundmedprod->existAlmUndMedProd( $almundmedprod, $notacompra->fkidalmacen, $detalle->fkidunidadmedidaproducto ) ) {

                        $almundmedprod->fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
                        $almundmedprod->fkidalmacen = $notacompra->fkidalmacen;
                        $almundmedprod->stockactual = $detalle->cantidad;
                        $almundmedprod->stockminimo = 0;
                        $almundmedprod->stockmaximo = 0;
                        $almundmedprod->ingresos = 0;
                        $almundmedprod->salidas = 0;
                        $almundmedprod->traspasos = 0;
                        $almundmedprod->ventas = 0;
                        $almundmedprod->compras = 1;
                        $almundmedprod->fecha = $request->x_fecha;
                        $almundmedprod->hora = $request->x_hora;
                        $almundmedprod->estado = "A";
                        $almundmedprod->save();

                        $detalle->fkidalmacenunidadmedidaproducto = $almundmedprod->idalmacenunidadmedidaproducto;

                    } else {
                        $firstAlmUndMedProd = $almundmedprod->firstAlmUndMedProd( $almundmedprod, $notacompra->fkidalmacen, $detalle->fkidunidadmedidaproducto );
                        $almacenunidadmedidaproducto = $almundmedprod->find( $firstAlmUndMedProd->idalmacenunidadmedidaproducto );
                        $almacenunidadmedidaproducto->stockactual = intval($detalle->cantidad) + intval($almacenunidadmedidaproducto->cantidad);
                        $almacenunidadmedidaproducto->compras = intval($almundmedprod->compras) + 1;
                        $almacenunidadmedidaproducto->update();

                        $detalle->fkidalmacenunidadmedidaproducto = $almacenunidadmedidaproducto->idalmacenunidadmedidaproducto;
                    }

                    $notacompradetalle = new NotaCompraDetalle();
                    $notacompradetalle->store($notacompradetalle, $request, $detalle);

                    $prod = new Producto();
                    $producto = $prod->find( $detalle->fkidproducto );
                    $producto->stockactual = intval($producto->stockactual) + intval($detalle->cantidad);
                    $producto->update();

                    $undmedprod = new UnidadMedidaProducto();
                    $unidadmedidaproducto = $undmedprod->find( $detalle->fkidunidadmedidaproducto );
                    $unidadmedidaproducto->stock = intval($unidadmedidaproducto->stock) + intval($detalle->cantidad);
                    $unidadmedidaproducto->update();

                    $provprod = new ProveedorProducto();
                    if ( $provprod->existProd( $provprod, $detalle->fkidproducto, $notacompra->fkidproveedor ) ) {
                        $firstProvProd = $provprod->firstProvProd( $provprod, $detalle->fkidproducto, $notacompra->fkidproveedor );
                        $proveedorproducto = $provprod->find( $firstProvProd->idproveedorproducto );
                        $proveedorproducto->stock = intval($proveedorproducto->stock) + intval($detalle->cantidad);
                        $proveedorproducto->update();

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

            //

            /* fin de restriccion */

            if ( !is_null( $notacompra->fkidordencompra ) ) {
                $ordcomp = new OrdenCompra();
                $ordencompra = $ordcomp->find( $notacompra->fkidordencompra );
                if ( !is_null( $ordencompra ) ) {
                    $ordencompra->iscompra = "N";
                    $ordencompra->update();
                }
            }

            $result = $obj->remove( $obj, $request );
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
