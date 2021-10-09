<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\DevolucionCompraRequest;
use App\Models\Comercio\Compra\DevolucionCompra;
use App\Models\Comercio\Compra\DevolucionCompraDetalle;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Configuracion\Moneda;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DevolucionCompraController extends Controller
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
            $obj = new DevolucionCompra();

            if ( $esPaginado == 0 ) {

                $devolucioncompra = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'devolucioncompra'  => $devolucioncompra,
                ] );
            }

            $devolucioncompra = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'devolucioncompra'  => $devolucioncompra->getCollection(),
                'pagination' => [
                    'total'        => $devolucioncompra->total(),
                    'current_page' => $devolucioncompra->currentPage(),
                    'per_page'     => $devolucioncompra->perPage(),
                    'last_page'    => $devolucioncompra->lastPage(),
                    'from'         => $devolucioncompra->firstItem(),
                    'to'           => $devolucioncompra->lastItem(),
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

            $obj = new DevolucionCompra();
            $iddevolucioncompra = $obj->newID();

            $obj = new Moneda();
            $moneda = $obj->get_data( $obj, $request );

            return response()->json( [
                'response' => 1,
                'iddevolucioncompra' => $iddevolucioncompra,
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
    public function store(DevolucionCompraRequest $request)
    {
        try {

            DB::beginTransaction();

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->store( $obj, $request );

            if ( !is_null( $devolucioncompra->fkidnotacompra ) ) {
                $notcomp = new NotaCompra();
                $notacompra = $notcomp->find( $devolucioncompra->fkidnotacompra );
                $notacompra->isdevolucioncompra = "A";
                $notacompra->update();
            }

            $arrayDevolucionCompraDetalle = json_decode($request->input('arrayDevolucionCompraDetalle', '[]'));
            foreach ( $arrayDevolucionCompraDetalle as $detalle ) {
                if ( !is_null( $detalle->fkidproducto ) ) {

                    $detalle->fkiddevolucioncompra = $devolucioncompra->iddevolucioncompra;
                    $devolucioncompradetalle = new DevolucionCompraDetalle();
                    $devolucioncompradetalle->store($devolucioncompradetalle, $request, $detalle);
                    
                }
            }

            DB::commit();
            return response( )->json( [
                'response' => 1,
                'devolucioncompra' => $devolucioncompra,
                'message'  => 'Devolución Compra registrado éxitosamente.',
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
    public function show( Request $request, $iddevolucioncompra )
    {
        try {

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->show( $obj, $iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'devolucioncompra' => $devolucioncompra,
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
    public function edit( Request $request, $iddevolucioncompra )
    {
        try {

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->show( $obj, $iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'devolucioncompra'   => $devolucioncompra,
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
    public function update( DevolucionCompraRequest $request )
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
                'iddevolucioncompra' => 'required',
            ];

            $mensajes = [
                'iddevolucioncompra.required' => 'El ID Devolucion Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->find( $request->iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolucion Compra no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            if ( !is_null( $devolucioncompra->fkidnotacompra ) ) {
                $notcomp = new NotaCompra();
                $notacompra = $notcomp->find( $devolucioncompra->fkidnotacompra );
                if ( !is_null( $notacompra ) ) {
                    $notacompra->isdevolucioncompra = "N";
                    $notacompra->update();
                }
            }

            $result = $obj->remove( $obj, $request );

            DB::commit();
            return response()->json( [
                'response' => 1,
                'message'  => 'devolución Compra eliminado éxitosamente.',
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
                'iddevolucioncompra' => 'required',
            ];

            $mensajes = [
                'iddevolucioncompra.required' => 'El ID Nota Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $iddevolucioncompra = $request->input('iddevolucioncompra');
            
            $obj = new DevolucionCompra();
            $devolucioncompra = $obj->searchByID( $obj, $iddevolucioncompra );

            if ( is_null( $devolucioncompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Devolución Compra no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'devolucioncompra' => $devolucioncompra,
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

            $obj = new DevolucionCompra();

            $devolucioncompra = $obj->get_data( $obj, $request );

            if ( sizeof( $devolucioncompra ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Devolución Compra insertado.',
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
                'arrayDevolucionCompra' => $devolucioncompra,
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
