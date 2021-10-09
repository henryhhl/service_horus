<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\UnionSucursalRequest;
use App\Models\Comercio\Venta\Sucursal;
use App\Models\Comercio\Venta\UnionSucursal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class UnionSucursalController extends Controller
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
            $obj = new UnionSucursal();

            if ( $esPaginado == 0 ) {

                $unionsucursal = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'unionsucursal'  => $unionsucursal,
                ] );
            }

            $unionsucursal = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'unionsucursal'  => $unionsucursal->getCollection(),
                'pagination' => [
                    'total'        => $unionsucursal->total(),
                    'current_page' => $unionsucursal->currentPage(),
                    'per_page'     => $unionsucursal->perPage(),
                    'last_page'    => $unionsucursal->lastPage(),
                    'from'         => $unionsucursal->firstItem(),
                    'to'           => $unionsucursal->lastItem(),
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

            $obj = new UnionSucursal();
            $idunionsucursal = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idunionsucursal'  => $idunionsucursal,
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
    public function store(UnionSucursalRequest $request)
    {
        try {

            $obj = new UnionSucursal();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Unión Sucursal ya existe.',
                ] );
            }

            $unionsucursal = $obj->store( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'unionsucursal' => $unionsucursal,
                'message'      => 'Unión Sucursal registrado éxitosamente.',
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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UnionSucursalRequest $request)
    {
        try {

            $regla = [
                'idunionsucursal' => 'required',
            ];

            $mensajes = [
                'idunionsucursal.required' => 'El ID Unión Sucursal es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new UnionSucursal();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Unión Sucursal ya existe.',
                ] );
            }

            $unionsucursal = $obj->find( $request->idunionsucursal );

            if ( is_null( $unionsucursal ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Unión Sucursal no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Unión Sucursal actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Unión Sucursal.',
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
                'idunionsucursal' => 'required',
            ];

            $mensajes = [
                'idunionsucursal.required' => 'El ID Unión Sucursal es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new UnionSucursal();
            $unionsucursal = $obj->find( $request->idunionsucursal );

            if ( is_null( $unionsucursal ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Unión Sucursal no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */
            
            $obj_sucursal = new Sucursal(); 

            if ( $obj_sucursal->tieneUnionSucursal( $obj_sucursal, $request->idunionsucursal ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Sucursal Agregado.',
                ] );
            }

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Unión Sucursal eliminado éxitosamente.',
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
                'idunionsucursal' => 'required',
            ];

            $mensajes = [
                'idunionsucursal.required' => 'El ID Unión Sucursal es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idunionsucursal = $request->input('idunionsucursal');
            
            $obj = new UnionSucursal();
            $unionsucursal = $obj->searchByID( $obj, $idunionsucursal );

            if ( is_null( $unionsucursal ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Unión Sucursal no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'unionsucursal' => $unionsucursal,
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

            $obj = new UnionSucursal();

            $unionsucursal = $obj->get_data( $obj, $request );

            if ( sizeof( $unionsucursal ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Unión Scursal insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response'           => 1,
                'fecha'              => $fecha,
                'hora'               => $hora,
                'arrayUnionSucursal' => $unionsucursal,
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
