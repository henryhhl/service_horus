<?php

namespace App\Models\Comercio\Venta;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotaVentaDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'notaventadetalle';
    protected $primaryKey = 'idnotaventadetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'cantidad' => 0, 'cantidadsolicitada' => 0, 'preciounitario' => 0, 'preciounitariosubtotal' => 0,
        'descuento' => 0, 'montodescuento' => 0, 'nota' => null,
        'estadoproceso' => 'F', 'tipoentrega' => null, 'isdevolucionventa' => 'N',
        'estado' => 'A', 'isdelete' => 'A', 'x_idusuario' => null,
    ];

    protected $fillable = [
        'fkidnotaventa', 'fkidunidadmedidaproducto', 'fkidalmacenunidadmedidaproducto', 'fkidalmacen',
        'fkidlistapreciodetalle', 'fkidvendedor',
        'cantidad', 'cantidadsolicitada', 'preciounitario', 'preciounitariosubtotal',
        'descuento', 'montodescuento', 'nota', 'estadoproceso', 'tipoentrega', 'isdevolucionventa',
        'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle ) {
        $fkidnotaventa = $detalle->fkidnotaventa;
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidalmacenunidadmedidaproducto = $detalle->fkidalmacenunidadmedidaproducto;
        $fkidalmacen = $detalle->fkidalmacen;
        $fkidlistapreciodetalle = $detalle->fkidlistapreciodetalle;
        $fkidvendedor = $detalle->fkidvendedor;

        $cantidad = $detalle->cantidad;
        $cantidadsolicitada = $detalle->cantidadsolicitada;
        $preciounitario = $detalle->preciounitario;
        $preciounitariosubtotal = $detalle->preciounitariosubtotal;
        $descuento = $detalle->descuento;
        $montodescuento = $detalle->montodescuento;
        $nota = $detalle->nota;
        $estadoproceso = $detalle->estadoproceso;
        $tipoentrega = $detalle->tipoentrega;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaventadetalle = $query->create( [
            'fkidnotaventa' => $fkidnotaventa,
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
            'fkidalmacenunidadmedidaproducto' => $fkidalmacenunidadmedidaproducto,
            'fkidalmacen' => $fkidalmacen,
            'fkidlistapreciodetalle' => $fkidlistapreciodetalle,
            'fkidvendedor' => $fkidvendedor,

            'cantidad' => $cantidad,
            'cantidadsolicitada' => $cantidadsolicitada,
            'preciounitario' => $preciounitario,
            'preciounitariosubtotal' => $preciounitariosubtotal,
            'descuento' => $descuento,
            'montodescuento' => $montodescuento,
            'nota' => $nota,
            'estadoproceso' => $estadoproceso,
            'tipoentrega' => $tipoentrega,

            'fecha' => $fecha,
            'hora' => $hora,
        ] );
        return $notaventadetalle;
    }
}
