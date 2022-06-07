<?php

namespace App\Models\Comercio\Venta;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoTransaccion extends Model
{
    use SoftDeletes;

    protected $table      = 'tipotransaccion';
    protected $primaryKey = 'idtipotransaccion';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'codigo' => null, 'abreviatura' => null, 'cantidadrealizada' => 0, 'cantidadcancelada' => 0,
        'imagen' => null, 'extension' => null, 'estado' => 'A',  'isdelete' => 'A', 'x_idusuario' => null,
    ];

    protected $fillable = [
        'codigo', 'descripcion', 'abreviatura', 'cantidadrealizada', 'cantidadcancelada', 'imagen', 'extension',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];
}
