<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comercio\Inventario\AlmacenProductoDetalle;

class AlmacenProductoDetalleController extends Controller
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
            $obj = new AlmacenProductoDetalle();

            if ( $esPaginado == 0 ) {

                $almacenProductoDetalle = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'arrayAlmacenProductoDetalle'  => $almacenProductoDetalle,
                ] );
            }

            $almacenProductoDetalle = $obj->get_paginate( $obj, $request );
            
            return response( )->json( [
                'response' => 1,
                'arrayAlmacenProductoDetalle'  => $almacenProductoDetalle->getCollection(),
                'pagination' => [
                    'total'        => $almacenProductoDetalle->total(),
                    'current_page' => $almacenProductoDetalle->currentPage(),
                    'per_page'     => $almacenProductoDetalle->perPage(),
                    'last_page'    => $almacenProductoDetalle->lastPage(),
                    'from'         => $almacenProductoDetalle->firstItem(),
                    'to'           => $almacenProductoDetalle->lastItem(),
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
