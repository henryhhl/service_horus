<?php

namespace App\Models\Comercio\Venta;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DevolucionNotaVentaDetalle extends Model
{
    use SoftDeletes;

    protected $table      = 'devolucionnotaventadetalle';
    protected $primaryKey = 'iddevolucionnotaventadetalle';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [
        'cantidadvendida' => 0, 'cantidad' => 0, 'preciounitario' => 0, 'preciosubtotal' => 0,
        'nrolote' => 0, 'nrofabrica' => 0, 'fechavencimiento' => null, 'nota' => null,
        'estado' => 'A',  'isdelete' => 'A', 'x_idusuario' => null,
    ];

    protected $fillable = [
        'fkidproducto', 'fkidproductotipo', 'fkidproductomarca', 'fkidalmacenproductodetalle', 'fkidalmacen', 'fkidlistaprecio', 'fkidlistapreciodetalle',
        'fkiddevolucionnotaventa', 'fkidvendedor', 'fkidnotaventadetalle', 'fkidcliente', 'fkidsucursal',
        'cantidadvendida', 'cantidad', 'preciounitario', 'preciosubtotal',
        'nrolote', 'nrofabrica', 'fechavencimiento', 'nota',
        'fecha', 'hora', 'estado', 'isdelete', 'x_idusuario',
    ];

    public function getDevolucionNotaVentaDetalle( $query, $fkiddevolucionnotaventa ) {
        $arraydevolucionnotaventadetalle = $query
            ->select( [
                'devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'devolucionnotaventadetalle.fkidproducto', 'devolucionnotaventadetalle.fkidproductotipo', 
                'devolucionnotaventadetalle.fkidproductomarca', 'devolucionnotaventadetalle.fkidalmacenproductodetalle', 'devolucionnotaventadetalle.fkiddevolucionnotaventa',
                'devolucionnotaventadetalle.fkidalmacen', 'devolucionnotaventadetalle.fkidlistaprecio', 'devolucionnotaventadetalle.fkidlistapreciodetalle', 
                'devolucionnotaventadetalle.fkidnotaventadetalle', 'devolucionnotaventadetalle.fkidcliente', 'devolucionnotaventadetalle.fkidsucursal', 
                'devolucionnotaventadetalle.fkidvendedor', 'devolucionnotaventadetalle.cantidadvendida', 'devolucionnotaventadetalle.cantidad', 

                'devolucionnotaventadetalle.preciounitario', 'devolucionnotaventadetalle.preciosubtotal', 'devolucionnotaventadetalle.nota', 
                'devolucionnotaventadetalle.nrolote', 'devolucionnotaventadetalle.nrofabrica', 'devolucionnotaventadetalle.fechavencimiento',
            ] )
            ->where( 'devolucionnotaventadetalle.fkiddevolucionnotaventa', '=', $fkiddevolucionnotaventa )
            ->whereNull( 'devolucionnotaventadetalle.deleted_at' )
            ->orderBy( 'devolucionnotaventadetalle.iddevolucionnotaventadetalle', 'ASC' )
            ->get();

        return $arraydevolucionnotaventadetalle;
    }

    public function store( $query, $request, $detalle ) {
        $fkiddevolucionnotaventa = $detalle->fkiddevolucionnotaventa;
        $fkidnotaventadetalle = $detalle->fkidnotaventadetalle;

        $fkidproducto = $detalle->fkidproducto;
        $fkidproductotipo = $detalle->fkidproductotipo;
        $fkidproductomarca = $detalle->fkidproductomarca;

        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        $fkidalmacen = $detalle->fkidalmacen;

        $fkidlistaprecio = $detalle->fkidlistaprecio;
        $fkidlistapreciodetalle = $detalle->fkidlistapreciodetalle;
        $fkidvendedor = $detalle->fkidvendedor;
        $fkidcliente = $detalle->fkidcliente;
        $fkidsucursal = $detalle->fkidsucursal;

        $cantidad = $detalle->cantidad;
        $cantidadvendida = $detalle->cantidadvendida;

        $preciounitario = $detalle->preciounitario;
        $preciosubtotal = $detalle->preciosubtotal;

        $nrolote = $detalle->nrolote;
        $nrofabrica = $detalle->nrofabrica;
        $fechavencimiento = $detalle->fechavencimiento;
        $nota = $detalle->nota;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $devolucionnotaventadetalle = $query->create( [
            'fkiddevolucionnotaventa' => $fkiddevolucionnotaventa,
            'fkidnotaventadetalle' => $fkidnotaventadetalle,
            'fkidproducto' => $fkidproducto,
            'fkidproductotipo' => $fkidproductotipo,
            'fkidproductomarca' => $fkidproductomarca,

            'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,
            'fkidalmacen' => $fkidalmacen,

            'fkidlistaprecio' => $fkidlistaprecio,
            'fkidlistapreciodetalle' => $fkidlistapreciodetalle,
            'fkidvendedor' => $fkidvendedor,
            'fkidcliente' => $fkidcliente,
            'fkidsucursal' => $fkidsucursal,

            'cantidad' => $cantidad,
            'cantidadvendida' => $cantidadvendida,

            'preciounitario' => $preciounitario,
            'preciosubtotal' => $preciosubtotal,

            'nrolote' => $nrolote,
            'nrofabrica' => $nrofabrica,
            'fechavencimiento' => $fechavencimiento,
            'nota' => $nota,

            'fecha' => $fecha,
            'hora' => $hora,
        ] );
        return $devolucionnotaventadetalle;
    }

    public function upgrade( $query, $detalle ) {
        $iddevolucionnotaventadetalle = $detalle->iddevolucionnotaventadetalle;
        $fkiddevolucionnotaventa = $detalle->fkiddevolucionnotaventa;
        $fkidnotaventadetalle = $detalle->fkidnotaventadetalle;

        $fkidproducto = $detalle->fkidproducto;
        $fkidproductotipo = $detalle->fkidproductotipo;
        $fkidproductomarca = $detalle->fkidproductomarca;

        $fkidalmacenproductodetalle = $detalle->fkidalmacenproductodetalle;
        $fkidalmacen = $detalle->fkidalmacen;

        $fkidlistaprecio = $detalle->fkidlistaprecio;
        $fkidlistapreciodetalle = $detalle->fkidlistapreciodetalle;
        $fkidvendedor = $detalle->fkidvendedor;
        $fkidcliente = $detalle->fkidcliente;
        $fkidsucursal = $detalle->fkidsucursal;

        $cantidad = $detalle->cantidad;
        $cantidadvendida = $detalle->cantidadvendida;

        $preciounitario = $detalle->preciounitario;
        $preciosubtotal = $detalle->preciosubtotal;

        $nrolote = $detalle->nrolote;
        $nrofabrica = $detalle->nrofabrica;
        $fechavencimiento = $detalle->fechavencimiento;
        $nota = $detalle->nota;

        $devolucionnotaventadetalle = $query->where( 'iddevolucionnotaventadetalle', '=', $iddevolucionnotaventadetalle )
            ->update( [
                'fkiddevolucionnotaventa' => $fkiddevolucionnotaventa,
                'fkidnotaventadetalle' => $fkidnotaventadetalle,
                'fkidproducto' => $fkidproducto,
                'fkidproductotipo' => $fkidproductotipo,
                'fkidproductomarca' => $fkidproductomarca,

                'fkidalmacenproductodetalle' => $fkidalmacenproductodetalle,
                'fkidalmacen' => $fkidalmacen,

                'fkidlistaprecio' => $fkidlistaprecio,
                'fkidlistapreciodetalle' => $fkidlistapreciodetalle,
                'fkidvendedor' => $fkidvendedor,
                'fkidcliente' => $fkidcliente,
                'fkidsucursal' => $fkidsucursal,

                'cantidad' => $cantidad,
                'cantidadvendida' => $cantidadvendida,

                'preciounitario' => $preciounitario,
                'preciosubtotal' => $preciosubtotal,

                'nrolote' => $nrolote,
                'nrofabrica' => $nrofabrica,
                'fechavencimiento' => $fechavencimiento,
                'nota' => $nota,

            ] );
        return $devolucionnotaventadetalle;
    }
    
}
