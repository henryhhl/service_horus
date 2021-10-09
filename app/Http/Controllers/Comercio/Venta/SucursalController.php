<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\SucursalRequest;
use App\Models\Comercio\Inventario\Almacen;
use App\Models\Comercio\Venta\Sucursal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class SucursalController extends Controller
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
            $obj = new Sucursal();

            if ( $esPaginado == 0 ) {

                $sucursal = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'sucursal'  => $sucursal,
                ] );
            }

            $sucursal = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'sucursal'  => $sucursal->getCollection(),
                'pagination' => [
                    'total'        => $sucursal->total(),
                    'current_page' => $sucursal->currentPage(),
                    'per_page'     => $sucursal->perPage(),
                    'last_page'    => $sucursal->lastPage(),
                    'from'         => $sucursal->firstItem(),
                    'to'           => $sucursal->lastItem(),
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

            $obj = new Sucursal();
            $idsucursal = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idsucursal'  => $idsucursal,
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
    public function store(SucursalRequest $request)
    {
        try {

            $obj = new Sucursal();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Sucursal ya existe.',
                ] );
            }

            $sucursal = $obj->store( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'sucursal' => $sucursal,
                'message'  => 'Sucursal registrado éxitosamente.',
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
    public function update(SucursalRequest $request)
    {
        try {

            $regla = [
                'idsucursal' => 'required',
            ];

            $mensajes = [
                'idsucursal.required' => 'El ID Sucursal es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Sucursal();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Sucursal ya existe.',
                ] );
            }

            $sucursal = $obj->find( $request->idsucursal );

            if ( is_null( $sucursal ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sucursal no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Sucursal actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Sucursal.',
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
                'idsucursal' => 'required',
            ];

            $mensajes = [
                'idsucursal.required' => 'El ID Sucursal es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Sucursal();
            $sucursal = $obj->find( $request->idsucursal );

            if ( is_null( $sucursal ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sucursal no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_almacen = new Almacen();

            if ( $obj_almacen->tieneSucursal( $obj_almacen, $request->idsucursal ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Álmacen Agregado.',
                ] );
            }

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Sucursal eliminado éxitosamente.',
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
                'idsucursal' => 'required',
            ];

            $mensajes = [
                'idsucursal.required' => 'El ID Sucursal es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idsucursal = $request->input('idsucursal');
            
            $obj = new Sucursal();
            $sucursal = $obj->searchByID( $obj, $idsucursal );

            if ( is_null( $sucursal ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Sucursal no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'sucursal' => $sucursal,
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

            $obj = new Sucursal();

            $sucursal = $obj->get_data( $obj, $request );

            if ( sizeof( $sucursal ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Sucursal insertado.',
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
                'arraySucursal' => $sucursal,
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
