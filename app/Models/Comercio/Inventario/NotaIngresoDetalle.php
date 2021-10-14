<?php

namespace App\Models\Comercio\Inventario;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotaIngresoDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'notaingresodetalle';
    protected $primaryKey = 'idnotaingresodetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'cantidad' => 0, 'costounitario' => 0, 'costosubtotal' => 0, 'nrocajas' => 0,
        'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0, 'fechavencimiento' => null,
        'nrolote' => 0, 'nrofabrica' => 0, 'precio' => 0, 'nota'=> null, 'esingresado' => 'N',
    ];

    protected $fillable = [ 
        'fkidnotaingreso', 'fkidalmacenunidadmedidaproducto',
        'cantidad', 'costounitario', 'costosubtotal', 'nrocajas', 'peso', 'pesosubtotal', 'volumen',
        'volumensubtotal', 'fechavencimiento', 'nrolote', 'nrofabrica', 'precio', 'nota', 'esingresado',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function store( $query, $request, $detalle )
    {
        $fkidalmacenunidadmedidaproducto = $detalle->fkidalmacenunidadmedidaproducto;
        $fkidnotaingreso = $detalle->fkidnotaingreso;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $cantidad   = is_numeric( $detalle->cantidad )  ? $detalle->cantidad : 0;
        $costounitario   = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal   = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;
        $nrocajas   = is_numeric( $detalle->nrocajas )  ? $detalle->nrocajas : 0;
        $peso   = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal   = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;
        $volumen   = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal   = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;
        $nrolote   = is_numeric( $detalle->nrolote )  ? $detalle->nrolote : 0;
        $nrofabrica   = is_numeric( $detalle->nrofabrica )  ? $detalle->nrofabrica : 0;
        $precio   = is_numeric( $detalle->precio )  ? $detalle->precio : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaingresodetalle = $query->create( [
            'fkidalmacenunidadmedidaproducto' => $fkidalmacenunidadmedidaproducto,
            'fkidnotaingreso' => $fkidnotaingreso,

            'nota' => $nota,
            'fechavencimiento' => $fechavencimiento,

            'cantidad' => $cantidad,
            'costounitario' => $costounitario,
            'costosubtotal' => $costosubtotal,
            'nrocajas' => $nrocajas,
            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,
            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,
            'nrolote' => $nrolote,
            'nrofabrica' => $nrofabrica,
            'precio' => $precio,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $notaingresodetalle;
    }

    public function upgrade( $query, $detalle )
    {
        $idnotaingresodetalle = $detalle->idnotaingresodetalle;

        $fkidalmacenunidadmedidaproducto = $detalle->fkidalmacenunidadmedidaproducto;
        $fkidnotaingreso = $detalle->fkidnotaingreso;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $cantidad   = is_numeric( $detalle->cantidad )  ? $detalle->cantidad : 0;
        $costounitario   = is_numeric( $detalle->costounitario )  ? $detalle->costounitario : 0;
        $costosubtotal   = is_numeric( $detalle->costosubtotal )  ? $detalle->costosubtotal : 0;
        $nrocajas   = is_numeric( $detalle->nrocajas )  ? $detalle->nrocajas : 0;
        $peso   = is_numeric( $detalle->peso )  ? $detalle->peso : 0;
        $pesosubtotal   = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;
        $volumen   = is_numeric( $detalle->volumen )  ? $detalle->volumen : 0;
        $volumensubtotal   = is_numeric( $detalle->volumensubtotal )  ? $detalle->volumensubtotal : 0;
        $nrolote   = is_numeric( $detalle->nrolote )  ? $detalle->nrolote : 0;
        $nrofabrica   = is_numeric( $detalle->nrofabrica )  ? $detalle->nrofabrica : 0;
        $precio   = is_numeric( $detalle->precio )  ? $detalle->precio : 0;

        $notaingresodetalle = $query->where( 'idnotaingresodetalle', '=', $idnotaingresodetalle )
            ->update( [
                'fkidalmacenunidadmedidaproducto' => $fkidalmacenunidadmedidaproducto,
                'fkidnotaingreso' => $fkidnotaingreso,

                'nota' => $nota,
                'fechavencimiento' => $fechavencimiento,

                'cantidad' => $cantidad,
                'costounitario' => $costounitario,
                'costosubtotal' => $costosubtotal,
                'nrocajas' => $nrocajas,
                'peso' => $peso,
                'pesosubtotal' => $pesosubtotal,
                'volumen' => $volumen,
                'volumensubtotal' => $volumensubtotal,
                'nrolote' => $nrolote,
                'nrofabrica' => $nrofabrica,
                'precio' => $precio,
            ] );

        return $notaingresodetalle;
    }

    public function remove( $query, $idnotaingresodetalle )
    {
        $query->where('idnotaingresodetalle', '=', $idnotaingresodetalle)->delete();
    }

}
