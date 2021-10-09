<?php

namespace App\Http\Requests\Comercio\Compra;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class NotaCompraRequest extends FormRequest
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
            'codigo'     => 'max:150',
            'nrorefprov' => 'max:150',

            'fechanotacompra' => 'required|date',
            
            'fkidsucursal'          => 'required|numeric',
            'fkidalmacen'           => 'required|numeric',
            'fkidconceptocompra'    => 'required|numeric',
            'fkidproveedor'         => 'required|numeric',
            'fkidmoneda'            => 'required|numeric',
            
            'tipocambio'     => 'required|numeric',
            'cantidadtotal'  => 'required|numeric',
            'montosubtotal'  => 'required|numeric',
            'descuento'      => 'required|numeric',
            'montodescuento' => 'required|numeric',
            'montototal'     => 'required|numeric',
            'nrocajastotal'  => 'required|numeric',
            
            'diascredito' => 'required|numeric',
            'fletes'      => 'required|numeric',
            'internacion' => 'required|numeric',
            'otrosgastos' => 'required|numeric',

            'tipocompra' => 'required',
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

            'fkidproveedor.required' => 'El :attribute es obligatorio.',
            'fkidproveedor.numeric'  => 'El :attribute solo se permite numero.',

            'fkidmoneda.required' => 'El :attribute es obligatorio.',
            'fkidmoneda.numeric'  => 'El :attribute solo se permite numero.',

            'codigo.max'     => 'Campo :attribute permite máximo de 150 caracteres.',
            'nrorefprov.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fechanotacompra.required' => 'El :attribute es obligatorio.',
            'fechanotacompra.date'     => 'El :attribute solo se permite fecha.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'cantidadtotal.required' => 'El :attribute es obligatorio.',
            'cantidadtotal.numeric'  => 'El :attribute solo se permite numero.',

            'montosubtotal.required' => 'El :attribute es obligatorio.',
            'montosubtotal.numeric'  => 'El :attribute solo se permite numero.',

            'descuento.required' => 'El :attribute es obligatorio.',
            'descuento.numeric'  => 'El :attribute solo se permite numero.',

            'montodescuento.required' => 'El :attribute es obligatorio.',
            'montodescuento.numeric'  => 'El :attribute solo se permite numero.',

            'montototal.required' => 'El :attribute es obligatorio.',
            'montototal.numeric'  => 'El :attribute solo se permite numero.',

            'nrocajastotal.required' => 'El :attribute es obligatorio.',
            'nrocajastotal.numeric'  => 'El :attribute solo se permite numero.',

            'diascredito.required' => 'El :attribute es obligatorio.',
            'diascredito.numeric'  => 'El :attribute solo se permite numero.',

            'fletes.required' => 'El :attribute es obligatorio.',
            'fletes.numeric'  => 'El :attribute solo se permite numero.',

            'internacion.required' => 'El :attribute es obligatorio.',
            'internacion.numeric'  => 'El :attribute solo se permite numero.',

            'otrosgastos.required' => 'El :attribute es obligatorio.',
            'otrosgastos.numeric'  => 'El :attribute solo se permite numero.',

            'tipocompra.required' => 'El :attribute es obligatorio.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidsucursal' => 'ID Sucursal',
            'fkidalmacen' => 'ID Álmacen',
            'fkidconceptocompra' => 'ID Concepto Compra',
            'fkidproveedor' => 'ID Proveedor',
            'fkidmoneda' => 'ID Moneda',

            'codigo' => 'código',
            'nrorefprov' => 'Nro ref. prov.',
            'fechanotacompra' => 'fecha',

            'diascredito'   => 'dias credito',
            'tipocambio'    => 'Tipo Cambio',
            'cantidadtotal' => 'Cantidad Total',
            'montosubtotal' => 'Monto Sub Total',
            'descuento' => 'descuento',
            'montodescuento' => 'monto descuento',
            'fletes'    => 'fletes',
            'internacion'   => 'internación',
            'otrosgastos'   => 'otros gastos',
            'montototal'    => 'Monto Total',
            'nrocajastotal' => 'Nro. cajas Total',
            'tipocompra' => 'Tipo compra',
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
