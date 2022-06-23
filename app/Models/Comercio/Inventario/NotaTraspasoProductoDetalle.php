<?php

namespace App\Models\Comercio\Inventario;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotaTraspasoProductoDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'notatraspasoproductodetalle';
    protected $primaryKey = 'idnotatraspasoproductodetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'stockactualanterior' => 0, 'cantidad' => 0, 'nrocajas' => 0, 'costobase' => 0, 
        'costounitarioingreso' => 0, 'costounitariosalida' => 0, 'costosubtotalingreso' => 0, 'costosubtotalsalida' => 0,
        'descuento' => 0, 'montodescuento' => 0, 'peso' => 0, 'pesosubtotal' => 0, 'volumen' => 0, 'volumensubtotal' => 0,
        'nota' => null, 'fechavencimiento' => null, 'nrolote' => 0, 'nrofabrica' => 0,
        'fkidusers' => null, 'x_idusuario' =>null, 'estado' => 'A',  'isdelete' => 'A',
    ];

    protected $fillable = [ 
        'fkidnotatraspasoproducto', 'fkidalmacenproductodetalleingreso', 'fkidproducto',
        'fkidsucursalingreso', 'fkidsucursalsalida','fkidalmaceningreso', 'fkidalmacensalida',
        'stockactualanterior', 'cantidad', 'nrocajas', 'costobase', 'costounitarioingreso', 'costounitariosalida', 'costosubtotalingreso', 'costosubtotalsalida',
        'descuento', 'montodescuento', 'peso', 'pesosubtotal', 'volumen', 'volumensubtotal', 'nota', 'fechavencimiento', 'nrolote', 'nrofabrica',
        'fkidusers', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getNotaTraspasoProductoDetalle( $query, $fkidnotatraspasoproducto ) {
        $notatraspasoproductodetalle = $query
            ->select( [
                'notatraspasoproductodetalle.idnotatraspasoproductodetalle', 'notatraspasoproductodetalle.fkidnotatraspasoproducto', 
                'notatraspasoproductodetalle.fkidalmacenproductodetalleingreso', 'notatraspasoproductodetalle.fkidalmacenproductodetallesalida', 'notatraspasoproductodetalle.fkidproducto',
                'notatraspasoproductodetalle.fkidsucursalingreso', 'notatraspasoproductodetalle.fkidsucursalsalida',
                'notatraspasoproductodetalle.fkidalmaceningreso', 'notatraspasoproductodetalle.fkidalmacensalida',
                'notatraspasoproductodetalle.stockactualanterior', 'notatraspasoproductodetalle.cantidad', 'notatraspasoproductodetalle.nrocajas', 
                'notatraspasoproductodetalle.costobase', 'notatraspasoproductodetalle.costounitarioingreso', 'notatraspasoproductodetalle.costounitariosalida', 
                'notatraspasoproductodetalle.costosubtotalingreso', 'notatraspasoproductodetalle.costosubtotalsalida',
                'notatraspasoproductodetalle.descuento', 'notatraspasoproductodetalle.montodescuento', 'notatraspasoproductodetalle.peso', 'notatraspasoproductodetalle.pesosubtotal', 
                'notatraspasoproductodetalle.volumen', 'notatraspasoproductodetalle.volumensubtotal', 'notatraspasoproductodetalle.nota', 
                'notatraspasoproductodetalle.fechavencimiento', 'notatraspasoproductodetalle.nrolote', 'notatraspasoproductodetalle.nrofabrica',
            ] )
            ->where('notatraspasoproductodetalle.fkidnotatraspasoproducto', '=', $fkidnotatraspasoproducto)
            ->whereNull('notatraspasoproductodetalle.deleted_at')
            ->orderBy('notatraspasoproductodetalle.idnotatraspasoproductodetalle')
            ->get();

        return $notatraspasoproductodetalle;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidalmacenproductodetalleingreso = $detalle->fkidalmacenproductodetalleingreso;
        $fkidalmacenproductodetallesalida = $detalle->fkidalmacenproductodetallesalida;
        $fkidnotatraspasoproducto = $detalle->fkidnotatraspasoproducto;
        $fkidsucursalingreso = $detalle->fkidsucursalingreso;
        $fkidsucursalsalida = $detalle->fkidsucursalsalida;
        $fkidalmaceningreso = $detalle->fkidalmaceningreso;
        $fkidalmacensalida = $detalle->fkidalmacensalida;
        $fkidproducto = $detalle->fkidproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $stockactualanterior = is_numeric( $detalle->stockactualanterior ) ? $detalle->stockactualanterior : 0;
        $cantidad = is_numeric( $detalle->cantidad ) ? $detalle->cantidad : 0;

        $costobase = is_numeric( $detalle->costobase ) ? $detalle->costobase : 0;
        $costounitarioingreso = is_numeric( $detalle->costounitarioingreso ) ? $detalle->costounitarioingreso : 0;
        $costounitariosalida = is_numeric( $detalle->costounitariosalida ) ? $detalle->costounitariosalida : 0;
        $costosubtotalingreso = is_numeric( $detalle->costosubtotalingreso ) ? $detalle->costosubtotalingreso : 0;
        $costosubtotalsalida = is_numeric( $detalle->costosubtotalsalida ) ? $detalle->costosubtotalsalida : 0;

        $descuento = is_numeric( $detalle->descuento ) ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento ) ? $detalle->montodescuento : 0;

        $nrocajas = is_numeric( $detalle->nrocajas ) ? $detalle->nrocajas : 0;
        $peso = is_numeric( $detalle->peso ) ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;
        $volumen = is_numeric( $detalle->volumen ) ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal ) ? $detalle->volumensubtotal : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notatraspasoproductodetalle = $query->create( [
            'fkidalmacenproductodetalleingreso' => $fkidalmacenproductodetalleingreso,
            'fkidalmacenproductodetallesalida' => $fkidalmacenproductodetallesalida,
            'fkidnotatraspasoproducto' => $fkidnotatraspasoproducto,
            'fkidsucursalingreso' => $fkidsucursalingreso,
            'fkidsucursalsalida' => $fkidsucursalsalida,
            'fkidalmaceningreso' => $fkidalmaceningreso,
            'fkidalmacensalida' => $fkidalmacensalida,
            'fkidproducto' => $fkidproducto,

            'nota' => $nota,
            'fechavencimiento' => $fechavencimiento,

            'stockactualanterior' => $stockactualanterior,
            'cantidad' => $cantidad,

            'costobase' => $costobase,
            'costounitarioingreso' => $costounitarioingreso,
            'costounitariosalida' => $costounitariosalida,
            'costosubtotalingreso' => $costosubtotalingreso,
            'costosubtotalsalida' => $costosubtotalsalida,

            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'nrocajas' => $nrocajas,
            'peso' => $peso,
            'pesosubtotal' => $pesosubtotal,
            'volumen' => $volumen,
            'volumensubtotal' => $volumensubtotal,
            'nrolote' => $nrolote,
            'nrofabrica' => $nrofabrica,

            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $notatraspasoproductodetalle;
    }

    public function upgrade( $query, $detalle )
    {
        $idnotatraspasoproductodetalle = $detalle->idnotatraspasoproductodetalle;

        $fkidalmacenproductodetalleingreso = $detalle->fkidalmacenproductodetalleingreso;
        $fkidalmacenproductodetallesalida = $detalle->fkidalmacenproductodetallesalida;
        $fkidnotatraspasoproducto = $detalle->fkidnotatraspasoproducto;
        $fkidsucursalingreso = $detalle->fkidsucursalingreso;
        $fkidsucursalsalida = $detalle->fkidsucursalsalida;
        $fkidalmaceningreso = $detalle->fkidalmaceningreso;
        $fkidalmacensalida = $detalle->fkidalmacensalida;
        $fkidproducto = $detalle->fkidproducto;

        $nota = isset( $detalle->nota ) ? $detalle->nota : null;
        $fechavencimiento = isset( $detalle->fechavencimiento ) ? $detalle->fechavencimiento : null;

        $stockactualanterior = is_numeric( $detalle->stockactualanterior ) ? $detalle->stockactualanterior : 0;
        $cantidad = is_numeric( $detalle->cantidad ) ? $detalle->cantidad : 0;

        $costobase = is_numeric( $detalle->costobase ) ? $detalle->costobase : 0;
        $costounitarioingreso = is_numeric( $detalle->costounitarioingreso ) ? $detalle->costounitarioingreso : 0;
        $costounitariosalida = is_numeric( $detalle->costounitariosalida ) ? $detalle->costounitariosalida : 0;
        $costosubtotalingreso = is_numeric( $detalle->costosubtotalingreso ) ? $detalle->costosubtotalingreso : 0;
        $costosubtotalsalida = is_numeric( $detalle->costosubtotalsalida ) ? $detalle->costosubtotalsalida : 0;

        $descuento = is_numeric( $detalle->descuento ) ? $detalle->descuento : 0;
        $montodescuento = is_numeric( $detalle->montodescuento ) ? $detalle->montodescuento : 0;

        $nrocajas = is_numeric( $detalle->nrocajas ) ? $detalle->nrocajas : 0;
        $peso = is_numeric( $detalle->peso ) ? $detalle->peso : 0;
        $pesosubtotal = is_numeric( $detalle->pesosubtotal )  ? $detalle->pesosubtotal : 0;
        $volumen = is_numeric( $detalle->volumen ) ? $detalle->volumen : 0;
        $volumensubtotal = is_numeric( $detalle->volumensubtotal ) ? $detalle->volumensubtotal : 0;

        $nrolote = is_numeric( $detalle->nrolote ) ? $detalle->nrolote : 0;
        $nrofabrica = is_numeric( $detalle->nrofabrica ) ? $detalle->nrofabrica : 0;

        $notatraspasoproductodetalle = $query->where( 'idnotatraspasoproductodetalle', '=', $idnotatraspasoproductodetalle )
            ->update( [
                'fkidalmacenproductodetalleingreso' => $fkidalmacenproductodetalleingreso,
                'fkidalmacenproductodetallesalida' => $fkidalmacenproductodetallesalida,
                'fkidnotatraspasoproducto' => $fkidnotatraspasoproducto,
                'fkidsucursalingreso' => $fkidsucursalingreso,
                'fkidsucursalsalida' => $fkidsucursalsalida,
                'fkidalmaceningreso' => $fkidalmaceningreso,
                'fkidalmacensalida' => $fkidalmacensalida,
                'fkidproducto' => $fkidproducto,

                'nota' => $nota,
                'fechavencimiento' => $fechavencimiento,

                'stockactualanterior' => $stockactualanterior,
                'cantidad' => $cantidad,

                'costobase' => $costobase,
                'costounitarioingreso' => $costounitarioingreso,
                'costounitariosalida' => $costounitariosalida,
                'costosubtotalingreso' => $costosubtotalingreso,
                'costosubtotalsalida' => $costosubtotalsalida,

                'descuento' => $descuento,
                'montodescuento' => $montodescuento,

                'nrocajas' => $nrocajas,
                'peso' => $peso,
                'pesosubtotal' => $pesosubtotal,
                'volumen' => $volumen,
                'volumensubtotal' => $volumensubtotal,
                'nrolote' => $nrolote,
                'nrofabrica' => $nrofabrica,
            ] );

        return $notatraspasoproductodetalle;
    }

    public function remove( $query, $idnotatraspasoproductodetalle )
    {
        return $query->where('idnotatraspasoproductodetalle', '=', $idnotatraspasoproductodetalle)->delete();
    }
    
}
