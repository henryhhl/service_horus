<?php

namespace App\Http\Requests\Comercio\Compra;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class OrdenCompraRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    protected $forceJsonResponse = true;

    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'codigo'          => 'max:150',
            'nrofactura'      => 'max:150',

            'fechasolicitada' => 'required|date',
            
            'fkidsucursal'          => 'required|numeric',
            'fkidalmacen'           => 'required|numeric',
            'fkidconceptocompra'    => 'required|numeric',
            'fkidseccioninventario' => 'required|numeric',
            'fkidproveedor'         => 'required|numeric',
            'fkidmoneda'            => 'required|numeric',
            
            'tipocambio'     => 'required|numeric',
            'cantidadtotal'  => 'required|numeric',
            'montosubtotal'  => 'required|numeric',
            'montototal'     => 'required|numeric',
            
            'diasplazo'   => 'required|numeric',
            'fletes'      => 'required|numeric',
            'internacion' => 'required|numeric',
            'otrosgastos' => 'required|numeric',

            'tiposolicitud' => 'required',
        ];
    }

    public function messages()
    {
        return [

            'fkidsucursal.required' => 'El :attribute es obligatorio.',
            'fkidsucursal.numeric'  => 'El :attribute solo se permite numero.',

            'fkidalmacen.required' => 'El :attribute es obligatorio.',
            'fkidalmacen.numeric'  => 'El :attribute solo se permite numero.',

            'fkidconceptocompra.required' => 'El :attribute es obligatorio.',
            'fkidconceptocompra.numeric'  => 'El :attribute solo se permite numero.',

            'fkidseccioninventario.required' => 'El :attribute es obligatorio.',
            'fkidseccioninventario.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproveedor.required' => 'El :attribute es obligatorio.',
            'fkidproveedor.numeric'  => 'El :attribute solo se permite numero.',

            'fkidmoneda.required' => 'El :attribute es obligatorio.',
            'fkidmoneda.numeric'  => 'El :attribute solo se permite numero.',

            'codigo.max'     => 'Campo :attribute permite máximo de 150 caracteres.',
            'nrofactura.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fechasolicitada.required' => 'El :attribute es obligatorio.',
            'fechasolicitada.date'     => 'El :attribute solo se permite fecha.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'cantidadtotal.required' => 'El :attribute es obligatorio.',
            'cantidadtotal.numeric'  => 'El :attribute solo se permite numero.',

            'montosubtotal.required' => 'El :attribute es obligatorio.',
            'montosubtotal.numeric'  => 'El :attribute solo se permite numero.',

            'montototal.required' => 'El :attribute es obligatorio.',
            'montototal.numeric'  => 'El :attribute solo se permite numero.',

            'diasplazo.required' => 'El :attribute es obligatorio.',
            'diasplazo.numeric'  => 'El :attribute solo se permite numero.',

            'fletes.required' => 'El :attribute es obligatorio.',
            'fletes.numeric'  => 'El :attribute solo se permite numero.',

            'internacion.required' => 'El :attribute es obligatorio.',
            'internacion.numeric'  => 'El :attribute solo se permite numero.',

            'otrosgastos.required' => 'El :attribute es obligatorio.',
            'otrosgastos.numeric'  => 'El :attribute solo se permite numero.',

            'tiposolicitud.required' => 'El :attribute es obligatorio.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidsucursal' => 'ID Sucursal',
            'fkidalmacen' => 'ID Álmacen',
            'fkidconceptocompra' => 'ID Concepto Compra',
            'fkidseccioninventario' => 'ID Seccion Inventario',
            'fkidproveedor' => 'ID Proveedor',
            'fkidmoneda' => 'ID Moneda',

            'codigo' => 'código',
            'nrofactura' => 'Nro factura',
            'fechasolicitada' => 'fecha solicitada',

            'diasplazo'    => 'dias plazo',
            'tipocambio'    => 'Tipo Cambio',
            'cantidadtotal' => 'Cantidad Total',
            'montosubtotal' => 'Monto Sub Total',
            'fletes'    => 'fletes',
            'internacion'   => 'internación',
            'otrosgastos'   => 'otros gastos',
            'montototal'    => 'Monto Total',
            'tiposolicitud' => 'Tipo Solicitud',
        ];
    }

    protected function failedValidation( Validator $validator )
    {
        $errors = ( new ValidationException( $validator ) )->errors();

        throw new HttpResponseException(
            response()->json( [
                'errors'    => $errors,
                'response'  => 0,
                'message'   => "Conflictos al solicitar el servicio.",
            ], JsonResponse::HTTP_OK )
        );
    }

}
