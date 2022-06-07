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
        'cantidad' => 0, 'cantidadsolicitada' => 0, 'preciobase' => 0, 'preciounitario' => 0, 'preciosubtotal' => 0,
        'descuento' => 0, 'montodescuento' => 0, 'nota' => null, 'nrolote' => 0, 'nrofabrica' => 0, 'fechavencimiento' => null,
        'estadoproceso' => 'F', 'tipoentrega' => null, 'isdevolucionventa' => 'N',
        'estado' => 'A', 'isdelete' => 'A', 'x_idusuario' => null,
    ];

    protected $fillable = [
        'fkidnotaventa', 'fkidalmacenproductodetalle', 'fkidalmacen', 'fkidvendedor',
        'fkidproducto', 'fkidproductotipo', 'fkidproductomarca',
        'fkidlistaprecio', 'fkidlistapreciodetalle',
        'cantidad', 'cantidadsolicitada', 'preciobase', 'preciounitario', 'preciosubtotal',
        'descuento', 'montodescuento', 'nota', 'estadoproceso', 'tipoentrega', 'isdevolucionventa',
        'nrolote', 'nrofabrica', 'fechavencimiento',
        'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function getNotaVentaDetalle( $query, $fkidnotaventa ) {
        $arraynotaventadetalle = $query
            ->select( [
                'notaventadetalle.idnotaventadetalle', 'notaventadetalle.fkidnotaventa', 'notaventadetalle.fkidalmacenproductodetalle', 
                'notaventadetalle.fkidalmacen', 'notaventadetalle.fkidvendedor',
                'notaventadetalle.fkidproducto', 'notaventadetalle.fkidproductotipo', 'notaventadetalle.fkidproductomarca', 
                'notaventadetalle.fkidlistaprecio', 'notaventadetalle.fkidlistapreciodetalle',
                'notaventadetalle.cantidad', 'notaventadetalle.cantidadsolicitada', 
                'notaventadetalle.preciobase', 'notaventadetalle.preciounitario', 'notaventadetalle.preciosubtotal',
                'notaventadetalle.descuento', 'notaventadetalle.montodescuento', 'notaventadetalle.nota', 
                'notaventadetalle.estadoproceso', 'notaventadetalle.tipoentrega', 'notaventadetalle.isdevolucionventa',
                'notaventadetalle.nrolote', 'notaventadetalle.nrofabrica', 'notaventadetalle.fechavencimiento',
            ] )
            ->where( 'notaventadetalle.fkidnotaventa', '=', $fkidnotaventa )
            ->whereNull( 'notaventadetalle.deleted_at' )
            ->orderBy( 'notaventadetalle.idnotaventadetalle', 'ASC' )
            ->get();

        return $arraynotaventadetalle;
    }

    public function store( $query, $request, $detalle ) {
        $fkidnotaventa = $detalle->fkidnotaventa;

        $fkidproducto = $detalle->fkidproducto;
        $fkidproductotipo = $detalle->fkidproductotipo;
        $fkidproductomarca = $detalle->fkidproductomarca;

        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        $fkidalmacen = $detalle->fkidalmacen;

        $fkidlistaprecio = $detalle->fkidlistaprecio;
        $fkidlistapreciodetalle = $detalle->fkidlistapreciodetalle;
        $fkidvendedor = $detalle->fkidvendedor;

        $cantidad = $detalle->cantidad;
        $cantidadsolicitada = $detalle->cantidadsolicitada;

        $preciobase = $detalle->preciobase;
        $preciounitario = $detalle->preciounitario;
        $preciosubtotal = $detalle->preciosubtotal;

        $descuento = $detalle->descuento;
        $montodescuento = $detalle->montodescuento;

        $nrolote = $detalle->nrolote;
        $nrofabrica = $detalle->nrofabrica;
        $fechavencimiento = $detalle->fechavencimiento;

        $nota = $detalle->nota;
        $estadoproceso = $detalle->estadoproceso;
        $tipoentrega = $detalle->tipoentrega;
        $isdevolucionventa = $detalle->isdevolucionventa;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $notaventadetalle = $query->create( [
            'fkidnotaventa' => $fkidnotaventa,
            'fkidproducto' => $fkidproducto,
            'fkidproductotipo' => $fkidproductotipo,
            'fkidproductomarca' => $fkidproductomarca,

            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,
            'fkidalmacen' => $fkidalmacen,

            'fkidlistaprecio' => $fkidlistaprecio,
            'fkidlistapreciodetalle' => $fkidlistapreciodetalle,
            'fkidvendedor' => $fkidvendedor,

            'cantidad' => $cantidad,
            'cantidadsolicitada' => $cantidadsolicitada,

            'preciobase' => $preciobase,
            'preciounitario' => $preciounitario,
            'preciosubtotal' => $preciosubtotal,

            'descuento' => $descuento,
            'montodescuento' => $montodescuento,

            'nrolote' => $nrolote,
            'nrofabrica' => $nrofabrica,
            'fechavencimiento' => $fechavencimiento,

            'nota' => $nota,
            'estadoproceso' => $estadoproceso,
            'tipoentrega' => $tipoentrega,
            'isdevolucionventa' => $isdevolucionventa,

            'fecha' => $fecha,
            'hora' => $hora,
        ] );
        return $notaventadetalle;
    }

    public function upgrade( $query, $detalle ) {
        $idnotaventadetalle = $detalle->idnotaventadetalle;
        $fkidnotaventa = $detalle->fkidnotaventa;

        $fkidproducto = $detalle->fkidproducto;
        $fkidproductotipo = $detalle->fkidproductotipo;
        $fkidproductomarca = $detalle->fkidproductomarca;

        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        $fkidalmacen = $detalle->fkidalmacen;

        $fkidlistaprecio = $detalle->fkidlistaprecio;
        $fkidlistapreciodetalle = $detalle->fkidlistapreciodetalle;
        $fkidvendedor = $detalle->fkidvendedor;

        $cantidad = $detalle->cantidad;
        $cantidadsolicitada = $detalle->cantidadsolicitada;

        $preciobase = $detalle->preciobase;
        $preciounitario = $detalle->preciounitario;
        $preciosubtotal = $detalle->preciosubtotal;

        $descuento = $detalle->descuento;
        $montodescuento = $detalle->montodescuento;

        $nrolote = $detalle->nrolote;
        $nrofabrica = $detalle->nrofabrica;
        $fechavencimiento = $detalle->fechavencimiento;

        $nota = $detalle->nota;
        $estadoproceso = $detalle->estadoproceso;
        $tipoentrega = $detalle->tipoentrega;
        $isdevolucionventa = $detalle->isdevolucionventa;

        $notaventadetalle = $query->where( 'idnotaventadetalle', '=', $idnotaventadetalle )
            ->update( [
                'fkidnotaventa' => $fkidnotaventa,
                'fkidproducto' => $fkidproducto,
                'fkidproductotipo' => $fkidproductotipo,
                'fkidproductomarca' => $fkidproductomarca,

                'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,
                'fkidalmacen' => $fkidalmacen,

                'fkidlistaprecio' => $fkidlistaprecio,
                'fkidlistapreciodetalle' => $fkidlistapreciodetalle,
                'fkidvendedor' => $fkidvendedor,

                'cantidad' => $cantidad,
                'cantidadsolicitada' => $cantidadsolicitada,

                'preciobase' => $preciobase,
                'preciounitario' => $preciounitario,
                'preciosubtotal' => $preciosubtotal,

                'descuento' => $descuento,
                'montodescuento' => $montodescuento,

                'nrolote' => $nrolote,
                'nrofabrica' => $nrofabrica,
                'fechavencimiento' => $fechavencimiento,

                'nota' => $nota,
                'estadoproceso' => $estadoproceso,
                'tipoentrega' => $tipoentrega,
                'isdevolucionventa' => $isdevolucionventa,

            ] );
        return $notaventadetalle;
    }

}
