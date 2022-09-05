<?php

namespace App\Http\Controllers\Comercio\Venta;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InformeVentaController extends Controller
{
    
    public function notaventageneral(Request $request) {
        try {
            
            return response()->json( [
                "response" => 1,
                "request" => $request->all(),
                "ip" => $request->ip(),
                "path" => $request->path(),
                "url" => $request->url(),
                "getHost" => $request->getHost(),
                "getHttpHost" => $request->getHttpHost(),
                "fullUrl" => $request->fullUrl(),
                "routeName" => $request->route()->getName(),
                "method" => $request->method(),
                "userAgent" => $request->userAgent(),
                "getLanguages" => $request->getLanguages(),
            ] );
            
        } catch (\Throwable $th) {
            return response()->json( [
                "response" => -4,
                "message"  => 'Error al procesar la solicitud',
                "error"    => [
                    'file'    => $th->getFile(),
                    'line'    => $th->getLine(),
                    'message' => $th->getMessage(),
                ],
            ] );
        }
    }
}
