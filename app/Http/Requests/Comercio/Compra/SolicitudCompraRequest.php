<?php

namespace App\Http\Requests\Comercio\Compra;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class SolicitudCompraRequest extends FormRequest
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
            'fechasolicitada' => 'required|date',

            'fkidsucursal'          => 'required|numeric',
            'fkidalmacen'           => 'required|numeric',
            'fkidconceptocompra'    => 'required|numeric',
            'fkidseccioninventario' => 'required|numeric',
            'fkidproveedor'         => 'required|numeric',
            'fkidmoneda'            => 'required|numeric',

            'tipocambio'     => 'required|numeric',
            'cantidadpendientetotal'  => 'required|numeric',
            'cantidadsolicitadatotal' => 'required|numeric',
            'montototal'     => 'required|numeric',

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

            'codigo.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fechasolicitada.required' => 'El :attribute es obligatorio.',
            'fechasolicitada.date'     => 'El :attribute solo se permite fecha.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'cantidadpendientetotal.required' => 'El :attribute es obligatorio.',
            'cantidadpendientetotal.numeric'  => 'El :attribute solo se permite numero.',

            'cantidadsolicitadatotal.required' => 'El :attribute es obligatorio.',
            'cantidadsolicitadatotal.numeric'  => 'El :attribute solo se permite numero.',

            'montototal.required' => 'El :attribute es obligatorio.',
            'montototal.numeric'  => 'El :attribute solo se permite numero.',

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
            'fechasolicitada' => 'fecha solicitada',

            'tipocambio'    => 'Tipo Cambio',
            'cantidadpendientetotal' => 'Cantidad Pendiente Total',
            'cantidadsolicitadatotal' => 'Cantidad Solicitada Total',
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
