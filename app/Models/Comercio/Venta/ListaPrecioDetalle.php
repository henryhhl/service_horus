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
        'nota' => null, 'x_idusuario' => null, 'fkidmoneda' => null,
    ];

    protected $fillable = [
        'fkidlistaprecio', 'fkidunidadmedidaproducto', 'fkidproducto', 'fkidmoneda', 'preciobase', 'preciopivote', 'precioventa',
        'descuento', 'montodescuento', 'nota',
        'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle ) {
        $fkidlistaprecio = $detalle->fkidlistaprecio;
        $fkidproducto = $detalle->fkidproducto;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;

        $preciobase = $detalle->preciobase;
        $preciopivote = $detalle->preciopivote;
        $precioventa = $detalle->precioventa;
        $descuento = $detalle->descuento;
        $montodescuento = $detalle->montodescuento;
        $nota = $detalle->nota;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $listapreciodetalle = $query->create( [
            'fkidlistaprecio' => $fkidlistaprecio,
            'fkidproducto' => $fkidproducto,
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,

            'preciobase' => $preciobase,
            'preciopivote' => $preciopivote,
            'precioventa' => $precioventa,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'nota' => $nota,

            'fecha' => $fecha,
            'hora' => $hora,
        ] );
        return $listapreciodetalle;
    }

    public function upgrade( $query, $detalle ) {
        $idlistapreciodetalle = $detalle->idlistapreciodetalle;

        $fkidlistaprecio = $detalle->fkidlistaprecio;
        $fkidproducto = $detalle->fkidproducto;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;

        $preciobase = $detalle->preciobase;
        $preciopivote = $detalle->preciopivote;
        $precioventa = $detalle->precioventa;
        $descuento = $detalle->descuento;
        $montodescuento = $detalle->montodescuento;
        $nota = $detalle->nota;

        $listapreciodetalle = $query->where( 'idlistapreciodetalle', '=', $idlistapreciodetalle )
            ->update( [
                'fkidlistaprecio' => $fkidlistaprecio,
                'fkidproducto' => $fkidproducto,
                'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,

                'preciobase' => $preciobase,
                'preciopivote' => $preciopivote,
                'precioventa' => $precioventa,
                'descuento' => $descuento,
                'montodescuento' => $montodescuento,
                'nota' => $nota,

            ] );
        return $listapreciodetalle;
    }

}
