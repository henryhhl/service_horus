<?php

namespace App\Models\Comercio\Venta;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListaPrecioDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'listapreciodetalle';
    protected $primaryKey = 'idlistapreciodetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A', 'isdelete' => 'A', 'preciobase' => 0, 'preciopivote' => 0,
        'precioventa' => 0, 'descuento' => 0, 'montodescuento' => 0,
        'nota' => null,
    ];

    protected $fillable = [ 
        'fkidlistaprecio', 'fkidproducto', 'fkidmoneda', 'preciobase', 'preciopivote', 'precioventa',
        'descuento', 'montodescuento', 'nota', 'isdelete', 'estado', 'fecha', 'hora',
    ];

}
