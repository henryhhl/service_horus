<?php

namespace App\Http\Controllers\Comercio\Inventario;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comercio\Inventario\CiudadRequest;
use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Inventario\Ciudad;
use App\Models\Comercio\Inventario\CiudadClasificacion;
use App\Models\Comercio\Inventario\Producto;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class CiudadController extends Controller
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
            $obj = new Ciudad();

            $request->orderBy = "ASC";
            $ciudad = $obj->get_data( $obj, $request );

            return response( )->json( [
                'response' => 1,
                'ciudad'   => $ciudad,
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

            $obj = new Ciudad();
            $idciudad = $obj->newID();

            $arrayCiudad = $obj->get_data( $obj, $request );

            $obj = new CiudadClasificacion();
            $ciudadclasificacion = $obj->get_data( $obj, $request );

            return response()->json( [
                'response' => 1,
                'idciudad' => $idciudad,
                'array_ciudad'   => $arrayCiudad,
                'array_ciudadClasificacion' => $ciudadclasificacion,
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
    public function store(CiudadRequest $request)
    {
        try {

            $obj = new Ciudad();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response( )->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Ciudad ya existe.',
                ] );
            }

            $ciudad = $obj->store( $obj, $request );

            $request->orderBy = "ASC";
            $arrayCiudad = $obj->get_data( $obj, $request );

            return response( )->json( [
                'response'     => 1,
                'ciudad'       => $ciudad,
                'arrayCiudad'  => $arrayCiudad,
                'message'      => 'Ciudad registrado éxitosamente.',
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
    public function show( Request $request, $idciudad )
    {
        try {


            $obj = new Ciudad();
            $ciudad = $obj->show( $obj, $idciudad );

            if ( is_null( $ciudad ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad no existente, favor revisar.',
                ] );
            }

            return response()->json( [
                'response' => 1,
                'ciudad'   => $ciudad,
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
    public function edit( Request $request, $idciudad )
    {
        try {


            $obj = new Ciudad();
            $ciudad = $obj->show( $obj, $idciudad );

            if ( is_null( $ciudad ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad no existente, favor revisar.',
                ] );
            }

            $arrayCiudad = $obj->get_data( $obj, $request );

            $obj = new CiudadClasificacion();
            $ciudadclasificacion = $obj->get_data( $obj, $request );

            return response()->json( [
                'response' => 1,
                'ciudad'   => $ciudad,
                'array_ciudad'              => $arrayCiudad,
                'array_ciudadClasificacion' => $ciudadclasificacion,
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
    public function update( CiudadRequest $request )
    {
        try {

            $regla = [
                'idciudad' => 'required',
            ];

            $mensajes = [
                'idciudad.required' => 'El ID Ciudad Clasificación es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Ciudad();

            if ( $obj->existDescripcion( $obj, $request ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'La descripción de Ciudad ya existe.',
                ] );
            }

            $ciudad = $obj->find( $request->idciudad );

            if ( is_null( $ciudad ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad no existe.',
                ] );
            }

            $result = $obj->upgrade( $obj, $request );

            if ( $result ) {

                $request->orderBy = "ASC";
                $arrayCiudad = $obj->get_data( $obj, $request );

                return response()->json( [
                    'response' => 1,
                    'message'  => 'Ciudad actualizado éxitosamente.',
                    'arrayCiudad'  => $arrayCiudad,
                ] );
            }

            return response()->json( [
                'response' => -1,
                'message'  => 'Hubo conflictos al actualizar Ciudad.',
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
                'idciudad' => 'required',
            ];

            $mensajes = [
                'idciudad.required' => 'El ID Ciudad es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response'  => 0,
                    'errors'    => $validator->errors(),
                    'message'   => "Conflictos al solicitar el servicio.",
                ] );
            }

            $obj = new Ciudad();
            $ciudad = $obj->find( $request->idciudad );

            if ( is_null( $ciudad ) ) {

                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad no existe.',
                ] );
            }

            /* restriccion en eliminar, cuando otras tablas lleva su fk */

            $obj_producto = new Producto();

            if ( $obj_producto->tieneCiudadOrigen( $obj_producto, $request->idciudad ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Producto Agregado.',
                ] );
            }

            $obj_proveedor = new Proveedor();

            if ( $obj_proveedor->tieneCiudad( $obj_proveedor, $request->idciudad ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene en Proveedor Agregado.',
                ] );
            }

            if ( $obj->tieneCiudadHijo( $obj, $request->idciudad ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No se puede eliminar, ya que tiene Ciudad Hijo Agregado.',
                ] );
            }

            //

            /* fin de restriccion */

            $result = $obj->remove( $obj, $request );

            return response()->json( [
                'response' => 1,
                'message'  => 'Ciudad eliminado éxitosamente.',
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
                'idciudad' => 'required',
            ];

            $mensajes = [
                'idciudad.required' => 'El ID Ciudad es requerido.'
            ];

            $validator = Validator::make( $request->all(), $regla, $mensajes );
            if ( $validator->fails() ) {

                return response()->json( [
                    'response' => 0,
                    'errors'   => $validator->errors(),
                    'message'  => "Conflictos al solicitar el servicio.",
                ] );
            }

            $idciudad = $request->input('idciudad');
            
            $obj = new Ciudad();
            $ciudad = $obj->searchByID( $idciudad );

            if ( is_null( $ciudad ) ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'Ciudad no existe.',
                ] );
            }

            return response()->json( [
                'response'  => 1,
                'ciudad' => $ciudad,
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

            $obj = new Ciudad();

            $ciudad = $obj->get_data( $obj, $request );

            if ( sizeof( $ciudad ) == 0 ) {
                return response()->json( [
                    'response'  => -1,
                    'message'   => 'No existe Ciudad insertado.',
                ] );
            }

            $mytime = Carbon::now('America/La_paz');

            $fecha = $mytime->toDateString();
            $hora  = $mytime->toTimeString();

            $fecha = explode( '-', $fecha );
            $fecha = $fecha[2] . '/' . $fecha[1] . '/' . $fecha[0];
            
            return response()->json( [
                'response'    => 1,
                'fecha'       => $fecha,
                'hora'        => $hora,
                'arrayCiudad' => $ciudad,
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
