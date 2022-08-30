<?php

namespace App\Http\Controllers;

use App\Models\Comercio\Compra\Proveedor;
use App\Models\Comercio\Inventario\Producto;
use App\Models\Comercio\Venta\Cliente;
use App\Models\Comercio\Venta\TipoTransaccion;
use Illuminate\Http\Request;

class InicioController extends Controller
{
    public function inicio( Request $request ) {
        try {

            $tpotrans = new TipoTransaccion();
            $arrayTipoTransaccion = $tpotrans->get_data( $tpotrans, $request );

            $prod = new Producto();
            $arrayProducto = $prod->getTransacciones( $prod );

            $clte = new Cliente();
            $arrayCliente = $clte->getTransacciones( $clte );

            $prov = new Proveedor();
            $arrayProveedor = $prov->getTransacciones( $prov );

            return response()->json( [
                'response' => 1,
                'arrayTipoTransaccion' => $arrayTipoTransaccion,
                'arrayProducto' => $arrayProducto,
                'arrayCliente' => $arrayCliente,
                'arrayProveedor' => $arrayProveedor,
            ] );

        } catch ( \Exception $th ) {

            return response()->json( [
                'response' => -4,
                'message' => 'Error al procesar la solicitud',
                'error' => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }

}
