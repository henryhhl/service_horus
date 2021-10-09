<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\NotaIngresoRequest;
use App\Models\Comercio\Inventario\AlmacenUnidadMedidaProducto;
use App\Models\Comercio\Inventario\NotaIngreso;
use App\Models\Comercio\Inventario\NotaIngresoDetalle;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Inventario\UnidadMedidaProducto;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotaIngresoController extends Controller
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
            $obj = new NotaIngreso();

            if ( $esPaginado == 0 ) {

                $notaingreso = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'notaingreso'  => $notaingreso,
                ] );
            }

            $notaingreso = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'notaingreso'  => $notaingreso->getCollection(),
                'pagination' => [
                    'total'        => $notaingreso->total(),
                    'current_page' => $notaingreso->currentPage(),
                    'per_page'     => $notaingreso->perPage(),
                    'last_page'    => $notaingreso->lastPage(),
                    'from'         => $notaingreso->firstItem(),
                    'to'           => $notaingreso->lastItem(),
                ],
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

            $obj = new NotaIngreso();
            $idnotaingreso = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            return response()->json( [
                'response' => 1,
                'idnotaingreso' => $idnotaingreso,
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
    public function store(NotaIngresoRequest $request)
    {

        try {

            DB::beginTransaction();

            $obj = new NotaIngreso();
            $notaingreso = $obj->store( $obj, $request );

            $arrayNotaIngresoDetalle = json_decode($request->input('arrayNotaIngresoDetalle', '[]'));

            foreach ( $arrayNotaIngresoDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {

                    $fkidalmacen = $notaingreso->fkidalmacen;
                    $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;

                    $almunidmedprod = new AlmacenUnidadMedidaProducto();
                    $firstalmunidmedprod = $almunidmedprod->firstAlmUndMedProd($almunidmedprod, $fkidalmacen, $fkidunidadmedidaproducto );
                    
                    if ( is_null( $firstalmunidmedprod ) ) {
                        $almunidmedprod->fkidunidadmedidaproducto = $fkidunidadmedidaproducto;
                        $almunidmedprod->fkidalmacen = $fkidalmacen;
                        $almunidmedprod->stockactual = $detalle->cantidad;
                        $almunidmedprod->fecha       = $request->x_fecha;
                        $almunidmedprod->hora        = $request->x_hora;
                        $almunidmedprod->save();

                        $firstalmunidmedprod = $almunidmedprod->firstAlmUndMedProd($almunidmedprod, $fkidalmacen, $fkidunidadmedidaproducto );
                    } else {
                        $almacenunidadmedidaproducto = $almunidmedprod->find($firstalmunidmedprod->idalmacenunidadmedidaproducto);
                        $almacenunidadmedidaproducto->stockactual = intval($almacenunidadmedidaproducto->stockactual) + intval($detalle->cantidad);
                        $almacenunidadmedidaproducto->update();
                    }

                    $detalle->fkidnotaingreso = $notaingreso->idnotaingreso;
                    $detalle->fkidalmacenunidadmedidaproducto = $firstalmunidmedprod->idalmacenunidadmedidaproducto;

                    $notaingresodetalle = new NotaIngresoDetalle();
                    $notaingresodetalle->store($notaingresodetalle, $request, $detalle);

                    $undmedprod = new UnidadMedidaProducto();
                    $unidadmedidaproducto = $undmedprod->find($fkidunidadmedidaproducto);
                    $unidadmedidaproducto->costo = $detalle->costounitario;
                    $unidadmedidaproducto->stock = intval($unidadmedidaproducto->stock) + intval($detalle->cantidad);
                    $unidadmedidaproducto->update();

                    $prod = new Producto();
                    $producto = $prod->find( $detalle->fkidproducto );
                    $producto->stockactual = intval($producto->stockactual) + intval($detalle->cantidad);
                    $producto->update();
                }
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'notaingreso' => $notaingreso,
                'message'  => 'Nota Ingreso registrado éxitosamente.',
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
    public function show( Request $request, $idnotaingreso )
    {
        try {

            $obj = new NotaIngreso();
            $notaingreso = $obj->show( $obj, $idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'notaingreso' => $notaingreso,
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
    public function edit( Request $request, $idnotaingreso )
    {
        try {

            $obj = new NotaIngreso();
            $notaingreso = $obj->show( $obj, $idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'notaingreso'   => $notaingreso,
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
    public function update( NotaIngresoRequest $request )
    {
        try {

            $regla = [
                'idnotaingreso' => 'required',
            ];

            $mensajes = [
                'idnotaingreso.required' => 'El ID Nota Ingreso es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaIngreso();
            $notaingreso = $obj->find( $request->idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Nota Ingreso actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Nota Ingreso.',
            ] );
            
        } catch ( \Exception $th ) {

            return response()->json( [
                'response' => -4,
                'message'  => 'Error al procesar la solicitud.',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage()
                ],
            ] );
        }
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

            $regla = [
                'idnotaingreso' => 'required',
            ];

            $mensajes = [
                'idnotaingreso.required' => 'El ID Nota Ingreso es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new NotaIngreso();
            $notaingreso = $obj->find( $request->idnotaingreso );

            if ( is_null( $notaingreso ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Nota Ingreso eliminado éxitosamente.',
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

    public function searchByID(Request $request)
    {
        try {

            $regla = [
                'idnotaingreso' => 'required',
            ];

            $mensajes = [
                'idnotaingreso.required' => 'El ID Nota Ingreso es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idnotaingreso = $request->input('idnotaingreso');
            
            $obj = new NotaIngreso();
            $notaingreso = $obj->searchByID( $obj, $idnotaingreso );

            if ( is_null( $notaingreso ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Nota Ingreso no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'notaingreso' => $notaingreso,
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

            $obj = new NotaIngreso();

            $notaingreso = $obj->get_data( $obj, $request );

            if ( sizeof( $notaingreso ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Nota Ingreso insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response' => 1,
                'fecha'    => $fecha,
                'hora'     => $hora,
                'arrayNotaIngreso' => $notaingreso,
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
