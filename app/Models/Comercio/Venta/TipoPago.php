<?php

namespace App\Models\Comercio\Venta;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoPago extends Model
{
    use SoftDeletes;

    protected $table      = 'tipopago';
    protected $primaryKey = 'idtipopago';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'estado' => 'A',  'isdelete' => 'A',
        'codigo' => null, 'abreviatura' => null,
        'imagen' => null, 'extension' => null, 'x_idusuario' => null,
    ];

    protected $fillable = [
        'codigo', 'descripcion', 'abreviatura', 'imagen', 'extension',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'tipopago.idtipopago';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';

        $islike =  Functions::isLikeAndIlike();

        $tipopago = $query
            ->select( [
                'tipopago.idtipopago', 'tipopago.codigo', 'tipopago.descripcion',
                'tipopago.abreviatura', 'tipopago.imagen', 'tipopago.extension',
                'tipopago.estado', 'tipopago.isdelete', 'tipopago.fecha', 'tipopago.hora'
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query
                        ->where('tipopago.idtipopago', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('tipopago.codigo', $islike, '%' . $search . '%')
                        ->orWhere('tipopago.descripcion', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->whereNull( 'tipopago.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $tipopago;
    }

}
