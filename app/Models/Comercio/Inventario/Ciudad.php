<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Ciudad extends Model
{
    use SoftDeletes;

    protected $table      = 'ciudad';
    protected $primaryKey = 'idciudad';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'codigo' => null, 'fkidciudadpadre' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null,
    ];

    protected $fillable = [ 
        'codigo', 'descripcion', 'abreviatura', 'fkidciudadpadre', 'fkidciudadclasificacion', 
        'imagen', 'extension', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'DESC';
        $column  = 'ciudad.idciudad';

        if ( strtoupper( $orderBy ) != 'ASC' ) $orderBy = 'DESC';

        $islike =  Functions::isLikeAndIlike();

        $ciudad = $query
            ->leftJoin('ciudadclasificacion as ciudclasif', 'ciudad.fkidciudadclasificacion', '=', 'ciudclasif.idciudadclasificacion')
            ->select( [
                'ciudad.idciudad', 'ciudad.codigo', 'ciudad.descripcion', 
                'ciudad.abreviatura', 'ciudad.imagen', 'ciudad.extension', 'ciudad.fkidciudadpadre',
                'ciudad.fkidciudadclasificacion', 'ciudclasif.descripcion as ciudadclasificacion',
                'ciudad.isdelete', 'ciudad.estado', 'ciudad.fecha', 'ciudad.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('ciudad.idciudad', '=', $search)
                        ->orWhere('ciudad.codigo', $islike, '%' . $search . '%')
                        ->orWhere('ciudad.descripcion', $islike, '%' . $search . '%');
                }
                if ( !is_null( $search ) ) {
                    return $query->where('ciudad.codigo', $islike, '%' . $search . '%')
                        ->orWhere('ciudad.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'ciudad.deleted_at' )
            ->orderBy( $column , "ASC")
            ->get();

        return $ciudad;
    }

    public function existDescripcion( $query, $request ) {

        $idciudad    = isset( $request->idciudad )    ? $request->idciudad : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $fkidciudadpadre = isset( $request->fkidciudadpadre ) ? $request->fkidciudadpadre : null;

        $ciudad = $query
            ->where( function ( $query ) use ( $idciudad, $descripcion ) {
                if ( !is_null( $idciudad ) ) {
                    return $query->where('idciudad', '<>', $idciudad)
                        ->where('descripcion', '=', $descripcion);
                }
                return $query->where('descripcion', '=', $descripcion);
            } )
            ->where( ( is_numeric( $fkidciudadpadre ) ) ? [['fkidciudadpadre', '=', $fkidciudadpadre]] : [] )
            ->whereNull('deleted_at')
            ->get();
        
        return ( sizeof( $ciudad ) > 0 );
    }

    public function newID( )
    {
        $ciudad = DB::table('ciudad')
            ->select('ciudad.idciudad')
            ->orderBy('ciudad.idciudad', 'DESC')
            ->first();

        return ( is_null( $ciudad ) ) ? 1 : intval( $ciudad->idciudad ) + 1;
    }

    public function store( $query, $request )
    {
        $codigo      = isset( $request->codigo )      ? $request->codigo : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $fkidciudadpadre = isset( $request->fkidciudadpadre ) ? $request->fkidciudadpadre : null;
        $fkidciudadclasificacion = isset( $request->fkidciudadclasificacion ) ? $request->fkidciudadclasificacion : null;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $ciudadclasificacion = $query->create( [
            'abreviatura' => $abreviatura,
            'codigo'      => $codigo,
            'descripcion' => $descripcion,
            'fkidciudadpadre' => $fkidciudadpadre,
            'fkidciudadclasificacion' => $fkidciudadclasificacion,
            'fecha'       => $fecha,
            'hora'        => $hora
        ] );

        return $ciudadclasificacion;
    }

    public function upgrade( $query, $request )
    {
        $idciudad    = isset( $request->idciudad ) ? $request->idciudad : null;
        $abreviatura = isset( $request->abreviatura ) ? $request->abreviatura : null;
        $codigo      = isset( $request->codigo ) ? $request->codigo : null;
        $descripcion = isset( $request->descripcion ) ? $request->descripcion : null;
        $fkidciudadpadre = isset( $request->fkidciudadpadre ) ? $request->fkidciudadpadre : null;
        $fkidciudadclasificacion = isset( $request->fkidciudadclasificacion ) ? $request->fkidciudadclasificacion : null;

        $ciudad = $query->where( 'idciudad', '=', $idciudad )
            ->update( [
                'codigo'      => $codigo,
                'abreviatura' => $abreviatura,
                'descripcion' => $descripcion,
                'fkidciudadpadre' => $fkidciudadpadre,
                'fkidciudadclasificacion' => $fkidciudadclasificacion,
            ] );

        return $ciudad;
    }

    public function show( $query, $idciudad ) {


        $ciudad = $query
            ->leftJoin('ciudadclasificacion as ciudclasif', 'ciudad.fkidciudadclasificacion', '=', 'ciudclasif.idciudadclasificacion')
            ->select( [
                'ciudad.idciudad', 'ciudad.codigo', 'ciudad.descripcion', 
                'ciudad.abreviatura', 'ciudad.imagen', 'ciudad.extension', 'ciudad.fkidciudadpadre',
                'ciudad.fkidciudadclasificacion', 'ciudclasif.descripcion as ciudadclasificacion',
                'ciudad.isdelete', 'ciudad.estado', 'ciudad.fecha', 'ciudad.hora'
            ] )
            ->where( 'ciudad.idciudad', '=', $idciudad )
            ->whereNull('ciudad.deleted_at')
            ->first();
        
        return $ciudad;
    }

    public function tieneCiudadHijo( $query, $idciudad ) {


        $ciudad = $query
            ->leftJoin('ciudadclasificacion as ciudclasif', 'ciudad.fkidciudadclasificacion', '=', 'ciudclasif.idciudadclasificacion')
            ->select( [
                'ciudad.idciudad', 'ciudad.codigo', 'ciudad.descripcion', 
                'ciudad.abreviatura', 'ciudad.imagen', 'ciudad.extension', 'ciudad.fkidciudadpadre',
                'ciudad.fkidciudadclasificacion', 'ciudclasif.descripcion as ciudadclasificacion',
                'ciudad.isdelete', 'ciudad.estado', 'ciudad.fecha', 'ciudad.hora'
            ] )
            ->where( 'ciudad.fkidciudadpadre', '=', $idciudad )
            ->whereNull('ciudad.deleted_at')
            ->get();
        
        return ( sizeof( $ciudad ) > 0 );
    }

    public function tieneCiudadClasificacion( $query, $idciudadclasificacion ) {

        $ciudad = $query
            ->where( 'ciudad.fkidciudadclasificacion', '=', $idciudadclasificacion )
            ->whereNull('ciudad.deleted_at')
            ->get();
        
        return ( sizeof( $ciudad ) > 0 );
    }

    public function scopeEnable( $query, $request )
    {
        $idciudad = $request->idciudad;
        $query->where('idciudad', '=', $idciudad)->update(['estado' => 'A']);
    }

    public function scopeDisable( $query, $request )
    {
        $idciudad = $request->idciudad;
        $query->where('idciudad', '=', $idciudad)->update(['estado' => 'N']);
    }

    public function remove( $query, $request )
    {
        $idciudad = $request->idciudad;
        $query->where('idciudad', '=', $idciudad)->delete();
    }

    public function searchByID( $idciudad ) {
        $ciudad = DB::table('ciudad')
            ->leftJoin('ciudadclasificacion as ciudclasif', 'ciudad.fkidciudadclasificacion', '=', 'ciudclasif.idciudadclasificacion')
            ->select( [
                'ciudad.idciudad', 'ciudad.codigo', 'ciudad.descripcion', 
                'ciudad.abreviatura', 'ciudad.imagen', 'ciudad.extension', 'ciudad.fkidciudadpadre',
                'ciudad.fkidciudadclasificacion', 'ciudclasif.descripcion as ciudadclasificacion',
                'ciudad.isdelete', 'ciudad.estado', 'ciudad.fecha', 'ciudad.hora'
            ] )
            ->where('ciudad.idciudad', '=', $idciudad)
            ->whereNull('ciudad.deleted_at')
            ->orderBy('ciudad.idciudad', 'desc')
            ->first();

        return $ciudad;
    }

}
