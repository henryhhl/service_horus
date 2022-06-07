<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comercio\Inventario\AlmacenUnidadMedidaProducto;

class AlmacenUnidadMedidaProductoController extends Controller
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
            $obj = new AlmacenUnidadMedidaProducto();

            if ( $esPaginado == 0 ) {

                $almacenUnidadMedidaProducto = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayAlmacenUnidadMedidaProducto'  => $almacenUnidadMedidaProducto,
                ] );
            }

            $almacenUnidadMedidaProducto = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'arrayAlmacenUnidadMedidaProducto'  => $almacenUnidadMedidaProducto->getCollection(),
                'pagination' => [
                    'total'        => $almacenUnidadMedidaProducto->total(),
                    'current_page' => $almacenUnidadMedidaProducto->currentPage(),
                    'per_page'     => $almacenUnidadMedidaProducto->perPage(),
                    'last_page'    => $almacenUnidadMedidaProducto->lastPage(),
                    'from'         => $almacenUnidadMedidaProducto->firstItem(),
                    'to'           => $almacenUnidadMedidaProducto->lastItem(),
                ],
            ] );

        } catch (\Throwable $th) {
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, $id)
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
}
