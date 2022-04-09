<?php

namespace App\Models\Comercio\Venta;

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
}
