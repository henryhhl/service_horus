<?php

namespace App\Http\Requests\Comercio\Inventario;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class NotaIngresoRequest extends FormRequest
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
            'codigo'           => 'max:150',
            'fechanotaingreso' => 'required|date',

            'fkidsucursal'           => 'required|numeric',
            'fkidalmacen'            => 'required|numeric',
            'fkidconceptoinventario' => 'required|numeric',
            'fkidmoneda'             => 'required|numeric',

            'tipocambio'     => 'required|numeric',
            'cantidadtotal'  => 'required|numeric',
            'montototal'     => 'required|numeric',
            'pesototal'      => 'required|numeric',
            'volumentotal'   => 'required|numeric',
            'nrocajastotal'  => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [

            'fkidsucursal.required' => 'El :attribute es obligatorio.',
            'fkidsucursal.numeric'  => 'El :attribute solo se permite numero.',

            'fkidalmacen.required' => 'El :attribute es obligatorio.',
            'fkidalmacen.numeric'  => 'El :attribute solo se permite numero.',

            'fkidconceptoinventario.required' => 'El :attribute es obligatorio.',
            'fkidconceptoinventario.numeric'  => 'El :attribute solo se permite numero.',

            'fkidmoneda.required' => 'El :attribute es obligatorio.',
            'fkidmoneda.numeric'  => 'El :attribute solo se permite numero.',

            'codigo.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fechanotaingreso.required' => 'El :attribute es obligatorio.',
            'fechanotaingreso.date'     => 'El :attribute solo se permite fecha.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'cantidadtotal.required' => 'El :attribute es obligatorio.',
            'cantidadtotal.numeric'  => 'El :attribute solo se permite numero.',

            'montototal.required' => 'El :attribute es obligatorio.',
            'montototal.numeric'  => 'El :attribute solo se permite numero.',

            'pesototal.required' => 'El :attribute es obligatorio.',
            'pesototal.numeric'  => 'El :attribute solo se permite numero.',

            'volumentotal.required' => 'El :attribute es obligatorio.',
            'volumentotal.numeric'  => 'El :attribute solo se permite numero.',

            'nrocajastotal.required' => 'El :attribute es obligatorio.',
            'nrocajastotal.numeric'  => 'El :attribute solo se permite numero.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidsucursal'           => 'ID Sucursal',
            'fkidalmacen'            => 'ID Álmacen',
            'fkidconceptoinventario' => 'ID Concepto Inventario',
            'fkidmoneda'             => 'ID Moneda',

            'codigo'           => 'código',
            'fechanotaingreso' => 'fecha Nota Ingreso',

            'tipocambio'    => 'Tipo Cambio',
            'cantidadtotal' => 'Cantidad Total',
            'montototal'    => 'Monto Total',
            'pesototal'     => 'Peso Total',
            'volumentotal'  => 'Volumen Total',
            'nrocajastotal' => 'Nro. Cajas Total',
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
