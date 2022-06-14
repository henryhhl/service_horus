<?php

namespace App\Models\Comercio\Inventario;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotaTraspasoProducto extends Model
{
    use SoftDeletes;

    protected $table      = 'notatraspasoproducto';
    protected $primaryKey = 'idnotatraspasoproducto';
    public    $timestamps = true;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $attributes = [ 
        'codigo' => null, 'nromanual' => null, 'tipocambio' => 0, 'cantidadtotal' => 0,
        'montototal' => 0, 'volumentotal' => 0, 'pesototal' => 0, 'nrocajastotal' => 0, 'nota' => null,
        'fkidusers' => null, 'x_idusuario' => null, 'estado' => 'A',  'isdelete' => 'A', 
    ];

    protected $fillable = [ 
        'fkidsucursalingreso', 'fkidsucursalsalida', 'fkidalmaceningreso', 'fkidalmacensalida', 'fkidconceptoinventario', 'fkidmoneda', 'fkidtipotransaccion',
        'codigo', 'nromanual', 'fechanotraspaso', 'tipocambio', 'cantidadtotal', 'montototal',
        'volumentotal', 'pesototal', 'nrocajastotal', 'nota',
        'fkidusers', 'x_idusuario', 'isdelete', 'estado', 'fecha', 'hora',
    ];

    public function arraynotatraspasoproductodetalle() {
        return $this->hasMany(
            'App\Models\Comercio\Inventario\NotaTraspasoProductoDetalle',
            'fkidnotatraspasoproducto',
            'idnotatraspasoproducto'
        );
    }

    public function get_data( $query, $request )
    {
        $search  = isset($request->search)  ? $request->search  : null;
        $orderBy = isset($request->orderBy) ? $request->orderBy : 'ASC';
        $column  = 'notasalida.idnotasalida';

        if ( strtoupper( $orderBy ) != 'DESC' ) $orderBy = 'ASC';
        $islike =  Functions::isLikeAndIlike();

        $notasalida = $query
            ->leftJoin('sucursal as sucu', 'notasalida.fkidsucursal', '=', 'sucu.idsucursal')
            ->leftJoin('almacen as alm', 'notasalida.fkidalmacen', '=', 'alm.idalmacen')
            ->leftJoin('conceptoinventario as concepinv', 'notasalida.fkidconceptoinventario', '=', 'concepinv.idconceptoinventario')
            ->leftJoin('moneda as mon', 'notasalida.fkidmoneda', '=', 'mon.idmoneda')
            ->select( [
                'notasalida.idnotasalida', 'notasalida.codigo', 'notasalida.nro', 'notasalida.nromanual', 'notasalida.fechanotasalida', 
                'notasalida.tipocambio', 'notasalida.cantidadtotal', 'notasalida.montototal',
                'notasalida.volumentotal', 'notasalida.pesototal', 'notasalida.nrocajastotal', 'notasalida.estado', 
                'notasalida.nota', 'notasalida.esnotasalida', 'notasalida.esingresado',
                'notasalida.fkidsucursal', 'sucu.descripcion as sucursal',
                'notasalida.fkidalmacen', 'alm.descripcion as almacen',
                'notasalida.fkidmoneda', 'mon.descripcion as moneda',
                'notasalida.fkidconceptoinventario', 'concepinv.descripcion as conceptoinventario',
            ] )
            ->where( function ( $query ) use ( $search, $islike ) {
                if ( is_numeric($search) ) {
                    return $query->where('notasalida.idnotasalida', '=', $search);
                }
                if ( !is_null( $search ) ) {
                    return $query->where('notasalida.codigo', $islike, '%' . $search . '%');
                }
                return;
            } )
            ->with( [ 'arraynotasalidadetalle' => function( $query ) {
                $query
                    ->leftJoin('sucursal as suc', 'notasalidadetalle.fkidsucursal', '=', 'suc.idsucursal')
                    ->leftJoin('almacen as alm', 'notasalidadetalle.fkidalmacen', '=', 'alm.idalmacen')
                    ->leftJoin('producto as prod', 'notasalidadetalle.fkidproducto', '=', 'prod.idproducto')
                    ->leftJoin('unidadmedida as unidmed', 'prod.fkidunidadmedida', '=', 'unidmed.idunidadmedida')
                    ->leftJoin('ciudad as ciud', 'prod.fkidciudadorigen', '=', 'ciud.idciudad')
                    ->leftJoin('productomarca as prodmarc', 'prod.fkidproductomarca', '=', 'prodmarc.idproductomarca')
                    ->leftJoin('productotipo as prodtpo', 'prod.fkidproductotipo', '=', 'prodtpo.idproductotipo')
                    ->select( [
                        'notasalidadetalle.idnotasalidadetalle', 'notasalidadetalle.fkidnotasalida', 'notasalidadetalle.fkidalmacenproductodetalle', 
                        'notasalidadetalle.stockactualanterior', 'notasalidadetalle.cantidad', 'notasalidadetalle.nrocajas', 
                        'notasalidadetalle.costobase', 'notasalidadetalle.costounitario', 'notasalidadetalle.costosubtotal',
                        'notasalidadetalle.descuento', 'notasalidadetalle.montodescuento', 
                        'notasalidadetalle.peso', 'notasalidadetalle.pesosubtotal', 'notasalidadetalle.volumen', 'notasalidadetalle.volumensubtotal',
                        'notasalidadetalle.nota', 'notasalidadetalle.fechavencimiento', 
                        'notasalidadetalle.nrolote', 'notasalidadetalle.nrofabrica',

                        'notasalidadetalle.fkidsucursal', 'suc.descripcion as sucursal',
                        'notasalidadetalle.fkidalmacen', 'alm.descripcion as almacen',

                        'prod.fkidunidadmedida', 'unidmed.abreviatura', 'unidmed.descripcion as unidadmedida',
                        'notasalidadetalle.fkidproducto', 'prod.codigo', 'prod.valorequivalente', 'prod.stockactual as stocktotal', 'prod.nombre as producto',

                        'prod.fkidciudadorigen', 'ciud.descripcion as ciudadorigen',
                        'prod.fkidproductomarca', 'prodmarc.descripcion as productomarca',
                        'prod.fkidproductotipo', 'prodtpo.descripcion as productotipo',

                    ] )
                    ->orderBy('notasalidadetalle.idnotasalidadetalle');
            } ] )
            ->whereNull( 'notasalida.deleted_at' )
            ->orderBy( $column , $orderBy)
            ->get();

        return $notasalida;
    }
    
}
