<?php

namespace App\Http\Controllers\Comercio\Compra;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Compra\ConceptoCompraRequest;
use App\Models\Comercio\Compra\ConceptoCompra;
use App\Models\Comercio\Compra\NotaCompra;
use App\Models\Comercio\Compra\OrdenCompra;
use App\Models\Comercio\Compra\SolicitudCompra;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ConceptoCompraController extends Controller
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
            $obj = new ConceptoCompra();

            if ( $esPaginado == 0 ) {

                $conceptocompra = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'conceptocompra'  => $conceptocompra,
                ] );
            }

            $conceptocompra = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'conceptocompra'  => $conceptocompra->getCollection(),
                'pagination' => [
                    'total'        => $conceptocompra->total(),
                    'current_page' => $conceptocompra->currentPage(),
                    'per_page'     => $conceptocompra->perPage(),
                    'last_page'    => $conceptocompra->lastPage(),
                    'from'         => $conceptocompra->firstItem(),
                    'to'           => $conceptocompra->lastItem(),
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

            $obj = new ConceptoCompra();
            $idconceptocompra = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idconceptocompra'  => $idconceptocompra,
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
    public function store(ConceptoCompraRequest $request)
    {
        try {

            $obj = new ConceptoCompra();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Concepto Compra ya existe.',
                ] );
            }

            $conceptocompra = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'conceptocompra' => $conceptocompra,
                'message'  => 'Concepto Compra registrado éxitosamente.',
            ] );
            
        } catch ( \Exception $th ) {

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
    public function show( Request $request, $idconceptocompra )
    {
        try {

            $obj = new ConceptoCompra();
            $conceptocompra = $obj->show( $obj, $idconceptocompra );

            if ( is_null( $conceptocompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Compra no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'conceptocompra'   => $conceptocompra,
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
    public function edit( Request $request, $idconceptocompra )
    {
        try {

            $obj = new ConceptoCompra();
            $conceptocompra = $obj->show( $obj, $idconceptocompra );

            if ( is_null( $conceptocompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Compra no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'conceptocompra'   => $conceptocompra,
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
    public function update(ConceptoCompraRequest $request)
    {
        try {

            $regla = [
                'idconceptocompra' => 'required',
            ];

            $mensajes = [
                'idconceptocompra.required' => 'El ID Concepto Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ConceptoCompra();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Concepto Compra ya existe.',
                ] );
            }

            $conceptocompra = $obj->find( $request->idconceptocompra );

            if ( is_null( $conceptocompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Compra no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Concepto Compra actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Concepto Compra.',
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
                'idconceptocompra' => 'required',
            ];

            $mensajes = [
                'idconceptocompra.required' => 'El ID Concepto Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ConceptoCompra();
            $conceptocompra = $obj->find( $request->idconceptocompra );

            if ( is_null( $conceptocompra ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Compra no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_solicitudcompra = new SolicitudCompra();

            if ( $obj_solicitudcompra->tieneConceptoCompra( $obj_solicitudcompra, $request->idconceptocompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene una transacción Agregado.',
                ] );
            }

            $obj_ordencompra = new OrdenCompra();

            if ( $obj_ordencompra->tieneConceptoCompra( $obj_ordencompra, $request->idconceptocompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene una transacción Agregado.',
                ] );
            }

            $obj_notacompra = new NotaCompra();

            if ( $obj_notacompra->tieneConceptoCompra( $obj_notacompra, $request->idconceptocompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene una transacción Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Concepto Compra eliminado éxitosamente.',
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
                'idconceptocompra' => 'required',
            ];

            $mensajes = [
                'idconceptocompra.required' => 'El ID Concepto Compra es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idconceptocompra = $request->input('idconceptocompra');
            
            $obj = new ConceptoCompra();
            $conceptocompra = $obj->searchByID( $obj, $idconceptocompra );

            if ( is_null( $conceptocompra ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Compra no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'conceptocompra' => $conceptocompra,
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

            $obj = new ConceptoCompra();

            $conceptocompra = $obj->get_data( $obj, $request );

            if ( sizeof( $conceptocompra ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Concepto Compra insertado.',
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
                'arrayConceptoCompra' => $conceptocompra,
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
