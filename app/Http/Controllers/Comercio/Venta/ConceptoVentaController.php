<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\ConceptoVentaRequest;
use App\Models\Comercio\Venta\ConceptoVenta;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ConceptoVentaController extends Controller
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
            $obj = new ConceptoVenta();

            if ( $esPaginado == 0 ) {

                $conceptoventa = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'conceptoventa'  => $conceptoventa,
                ] );
            }

            $conceptoventa = $obj->get_paginate( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'conceptoventa'  => $conceptoventa->getCollection(),
                'pagination' => [
                    'total'        => $conceptoventa->total(),
                    'current_page' => $conceptoventa->currentPage(),
                    'per_page'     => $conceptoventa->perPage(),
                    'last_page'    => $conceptoventa->lastPage(),
                    'from'         => $conceptoventa->firstItem(),
                    'to'           => $conceptoventa->lastItem(),
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

            $obj = new ConceptoVenta();
            $idconceptoventa = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idconceptoventa'  => $idconceptoventa,
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
    public function store( ConceptoVentaRequest $request )
    {
        try {

            $obj = new ConceptoVenta();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Concepto Venta ya existe.',
                ] );
            }

            $conceptoventa = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'conceptoventa' => $conceptoventa,
                'message'  => 'Concepto Venta registrado éxitosamente.',
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
    public function show( Request $request, $idconceptoventa )
    {
        try {

            $obj = new ConceptoVenta();
            $conceptoventa = $obj->show( $obj, $idconceptoventa );

            if ( is_null( $conceptoventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'conceptoventa'   => $conceptoventa,
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
    public function edit( Request $request, $idconceptoventa )
    {
        try {

            $obj = new ConceptoVenta();
            $conceptoventa = $obj->show( $obj, $idconceptoventa );

            if ( is_null( $conceptoventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Venta no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'conceptoventa'   => $conceptoventa,
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
    public function update( ConceptoVentaRequest $request )
    {
        try {

            $regla = [
                'idconceptoventa' => 'required',
            ];

            $mensajes = [
                'idconceptoventa.required' => 'El ID Concepto Venta es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ConceptoVenta();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Concepto Venta ya existe.',
                ] );
            }

            $conceptoventa = $obj->find( $request->idconceptoventa );

            if ( is_null( $conceptoventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Venta no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Concepto Venta actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Concepto Venta.',
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
                'idconceptoventa' => 'required',
            ];

            $mensajes = [
                'idconceptoventa.required' => 'El ID Concepto Venta es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ConceptoVenta();
            $conceptoventa = $obj->find( $request->idconceptoventa );

            if ( is_null( $conceptoventa ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Venta no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            /* fin de restriccion */

            $conceptoventadelete = $conceptoventa->delete();

            return response()->json( [
                'response' => 1,
                'message'  => 'Concepto Venta eliminado éxitosamente.',
                'conceptoventadelete' => $conceptoventadelete,
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
                'idconceptoventa' => 'required',
            ];

            $mensajes = [
                'idconceptoventa.required' => 'El ID Concepto Venta es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idconceptoventa = $request->input('idconceptoventa');

            $obj = new ConceptoVenta();
            $conceptoventa = $obj->searchByID( $obj, $idconceptoventa );

            if ( is_null( $conceptoventa ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Concepto Venta no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'conceptoventa' => $conceptoventa,
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

            $obj = new ConceptoVenta();

            $conceptoventa = $obj->get_data( $obj, $request );

            if ( sizeof( $conceptoventa ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Concepto Venta insertado.',
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
                'arrayConceptoVenta' => $conceptoventa,
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
