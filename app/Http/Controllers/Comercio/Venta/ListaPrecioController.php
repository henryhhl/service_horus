<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Venta\ListaPrecioRequest;
use App\Models\Comercio\Venta\ListaPrecio;
use App\Models\Comercio\Venta\ListaPrecioDetalle;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ListaPrecioController extends Controller
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
            $obj = new ListaPrecio();

            if ( $esPaginado == 0 ) {

                $listaprecio = $obj->get_data( $obj, $request );

                return response( )->json( [
                    'response' => 1,
                    'listaprecio'  => $listaprecio,
                ] );
            }

            $listaprecio = $obj->get_paginate( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'listaprecio'  => $listaprecio->getCollection(),
                'pagination' => [
                    'total'        => $listaprecio->total(),
                    'current_page' => $listaprecio->currentPage(),
                    'per_page'     => $listaprecio->perPage(),
                    'last_page'    => $listaprecio->lastPage(),
                    'from'         => $listaprecio->firstItem(),
                    'to'           => $listaprecio->lastItem(),
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

            $obj = new ListaPrecio();
            $idlistaprecio = $obj->newID();

            return response()->json( [
                'response' => 1,
                'idlistaprecio'  => $idlistaprecio,
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
    public function store(ListaPrecioRequest $request)
    {
        try {

            DB::beginTransaction();
            $obj = new ListaPrecio();

            $listaprecio = $obj->store( $obj, $request );

            if ( $listaprecio ) {
                $arrayListaPrecioDetalle = json_decode( isset( $request->listapreciodetalle ) ? $request->listapreciodetalle : '[]' );
                foreach ( $arrayListaPrecioDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {
                        $detalle->fkidlistaprecio = $listaprecio->idlistaprecio;
                        $listprecdet = new ListaPrecioDetalle();
                        $listapreciodetalle = $listprecdet->store( $listprecdet, $request, $detalle );
                    }
                }

                DB::commit();
                return response( )->json( [
                    'response'     => 1,
                    'listaprecio' => $listaprecio,
                    'message'      => 'Lista Precio registrado éxitosamente.',
                ] );
            }

            DB::rollBack();
            return response( )->json( [
                'response' => -1,
                'listaprecio' => $listaprecio,
                'message'  => 'Lista Precio no registrado, intentar nuevamente.',
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
    public function show( Request $request, $idlistaprecio )
    {
        try {

            $obj = new ListaPrecio();
            $listaprecio = $obj->show( $obj, $idlistaprecio );

            if ( is_null( $listaprecio ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Lista Precio no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'listaprecio'   => $listaprecio,
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
    public function edit( Request $request, $idlistaprecio )
    {
        try {

            $obj = new ListaPrecio();
            $listaprecio = $obj->show( $obj, $idlistaprecio );

            if ( is_null( $listaprecio ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Lista Precio no existente, favor revisar.',
                ] );
            }


            return response()->json( [
                'response' => 1,
                'listaprecio'   => $listaprecio,
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
    public function update(ListaPrecioRequest $request)
    {
        try {

            $regla = [
                'idlistaprecio' => 'required',
            ];

            $mensajes = [
                'idlistaprecio.required' => 'El ID Lista Precio es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ListaPrecio();
            $listaprecio = $obj->find( $request->idlistaprecio );

            if ( is_null( $listaprecio ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Lista Precio no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {
                $arrayListaPrecioDetalle = json_decode( isset( $request->listapreciodetalle ) ? $request->listapreciodetalle : '[]' );
                foreach ( $arrayListaPrecioDetalle as $detalle ) {
                    if ( !is_null( $detalle->fkidproducto ) ) {
                        $detalle->fkidlistaprecio = $listaprecio->idlistaprecio;
                        $listprecdet = new ListaPrecioDetalle();
                        if ( is_null( $detalle->idlistapreciodetalle ) ) {
                            $listapreciodetalle = $listprecdet->store( $listprecdet, $request, $detalle );
                        } else {
                            $listapreciodetalle = $listprecdet->upgrade( $listprecdet, $detalle );
                        }
                    }
                }

                $arrayListaPrecioDetalleDelete = json_decode( isset( $request->listapreciodetalledelete ) ? $request->listapreciodetalledelete : '[]' );
                foreach ( $arrayListaPrecioDetalleDelete as $idlistapreciodetalle ) {
                    $listprecdet = new ListaPrecioDetalle();
                    $listapreciodetalle = $listprecdet->find( $idlistapreciodetalle );
                    if ( !is_null( $listapreciodetalle ) ) {
                        $listapreciodetalle->delete();
                    }
                }
            }

            if ( $result ) {
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Lista Precio actualizado éxitosamente.',
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Lista Precio.',
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

            DB::beginTransaction();

            $regla = [
                'idlistaprecio' => 'required',
            ];

            $mensajes = [
                'idlistaprecio.required' => 'El ID Lista Precio es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new ListaPrecio();
            $listaprecio = $obj->find( $request->idlistaprecio );

            if ( is_null( $listaprecio ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Lista Precio no existe.',
                ] );
            }

            if ( $listaprecio->isdelete == "N" ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Acción no permitido.',
                ] );
            }


            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            //

            /* fin de restriccion */

            $listprecdet = new ListaPrecioDetalle();
            $arraylistapreciodetalle = $listprecdet->getListaPrecioDetalle( $listprecdet, $request->idlistaprecio );

            foreach ( $arraylistapreciodetalle as $detalle ) {
                $listapreciodetalle = $listprecdet->find( $detalle->idlistapreciodetalle );
                if ( !is_null( $listapreciodetalle ) ) {
                    $listapreciodetalle->delete();
                }
            }

            $listaPrecioDelete = $listaprecio->delete();

            if ( $listaPrecioDelete ) {
                DB::commit();
                return response()->json( [
                    'response' => 1,
                    'message'  => 'Lista Precio eliminado éxitosamente.',
                    'listaPrecioDelete' => $listaPrecioDelete,
                ] );
            }

            DB::rollBack();
            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al eliminar, favor de intentar nuevamente.',
                'listaPrecioDelete' => $listaPrecioDelete,
            ] );

            return response()->json( [
                'response' => 1,
                'message'  => 'Lista Precio eliminado éxitosamente.',
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
                'idlistaprecio' => 'required',
            ];

            $mensajes = [
                'idlistaprecio.required' => 'El ID Lista Precio es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idlistaprecio = $request->input('idlistaprecio');

            $obj = new ListaPrecio();
            $listaprecio = $obj->searchByID( $obj, $idlistaprecio );

            if ( is_null( $listaprecio ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Lista Precio no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'listaprecio' => $listaprecio,
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

            $obj = new ListaPrecio();

            $listaprecio = $obj->get_data( $obj, $request );

            if ( sizeof( $listaprecio ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Lista Precio insertado.',
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
                'arrayListaPrecio' => $listaprecio,
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
