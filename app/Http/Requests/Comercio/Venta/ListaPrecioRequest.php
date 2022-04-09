<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ListaPrecioRequest extends FormRequest
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
            'abreviatura' => 'max:50',
            'descripcion'      => 'required|max:250|min:3',
            'tipocambio'  => 'required|numeric',
            'fechalistaprecio' => 'required|date',
            'valor' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'abreviatura.max' => 'Campo :attribute permite máximo de 50 caracteres.',

            'descripcion.required' => 'Campo :attribute es obligatorio.',
            'descripcion.max'      => 'Campo :attribute permite máximo de 250 caracteres.',
            'descripcion.min'      => 'Campo :attribute permite minimo de 3 caracteres.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'fechalistaprecio.required' => 'El :attribute es obligatorio.',
            'fechalistaprecio.date'     => 'El :attribute solo se permite fecha.',

            'valor.required' => 'El :attribute es obligatorio.',
            'valor.numeric'  => 'El :attribute solo se permite numero.',
        ];
    }

    public function attributes()
    {
        return [
            'abreviatura' => 'abreviatura',
            'descripcion'      => 'descripción',
            'tipocambio'  => 'tipo de cambio',
            'fechalistaprecio' => 'fecha',
            'valor' => 'valor',
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
