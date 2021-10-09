<?php

namespace App\Models\Comercio\Inventario;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlmacenUnidadMedidaProducto extends Model
{
    use SoftDeletes;

    protected $table      = 'almacenunidadmedidaproducto';
    protected $primaryKey = 'idalmacenunidadmedidaproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'estado' => 'A',  'isdelete' => 'A', 
        'stockactual' => 0, 'stockminimo' => 0, 'stockmaximo' => 0,
        'ingresos' => 0, 'salidas' => 0, 'traspasos' => 0, 'ventas' => 0, 'compras' => 0,
    ];

    protected $fillable = [ 
        'fkidunidadmedidaproducto', 'fkidalmacen', 'stockactual', 'stockminimo', 'stockmaximo',
        'ingresos', 'salidas', 'traspasos', 'ventas', 'compras',
        'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function firstAlmUndMedProd( $query, $idalmacen, $idunidadmedidaproducto ) {

        $almacenunidadmedidaproducto = $query
            ->where( 'fkidalmacen', '=', $idalmacen )
            ->where( 'fkidunidadmedidaproducto', '=', $idunidadmedidaproducto )
            ->whereNull('deleted_at')
            ->first();
        
        return $almacenunidadmedidaproducto;
    }

    public function store( $query, $request, $detalle )
    {
        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidalmacen              = $detalle->fkidalmacen;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $stockminimo = is_numeric( $detalle->stockminimo ) ? $detalle->stockminimo : 0;
        $stockmaximo = is_numeric( $detalle->stockmaximo ) ? $detalle->stockmaximo : 0;

        $fecha = $request->x_fecha;
        $hora  = $request->x_hora;

        $almacenunidadmedidaproducto = $query->create( [
            'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
            'fkidalmacen'  => $fkidalmacen,
            'stockactual'  => $stockactual,
            'stockminimo'  => $stockminimo,
            'stockmaximo'  => $stockmaximo,
            'fecha'  => $fecha,
            'hora'   => $hora
        ] );

        return $almacenunidadmedidaproducto;
    }

    public function upgrade( $query, $detalle )
    {
        $idalmacenunidadmedidaproducto = $detalle->idalmacenunidadmedidaproducto;

        $fkidunidadmedidaproducto = $detalle->fkidunidadmedidaproducto;
        $fkidalmacen              = $detalle->fkidalmacen;

        $stockactual = is_numeric( $detalle->stockactual ) ? $detalle->stockactual : 0;
        $stockminimo = is_numeric( $detalle->stockminimo ) ? $detalle->stockminimo : 0;
        $stockmaximo = is_numeric( $detalle->stockmaximo ) ? $detalle->stockmaximo : 0;

        $almacenunidadmedidaproducto = $query->where( 'idalmacenunidadmedidaproducto', '=', $idalmacenunidadmedidaproducto )
            ->update( [
                'fkidunidadmedidaproducto' => $fkidunidadmedidaproducto,
                'fkidalmacen'  => $fkidalmacen,
                'stockactual'  => $stockactual,
                'stockminimo'  => $stockminimo,
                'stockmaximo'  => $stockmaximo,
            ] );

        return $almacenunidadmedidaproducto;
    }

    public function remove( $query, $idalmacenunidadmedidaproducto )
    {
        $query->where('idalmacenunidadmedidaproducto', '=', $idalmacenunidadmedidaproducto)->delete();
    }

}
