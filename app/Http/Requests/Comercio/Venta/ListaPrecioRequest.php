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
            'nombre'      => 'required|max:250|min:3',
            'tipocambio'  => 'required|numeric',
            'fechainicio' => 'required|date',
        ];
    }

    public function messages()
    {
        return [
            'abreviatura.max' => 'Campo :attribute permite máximo de 50 caracteres.',

            'nombre.required' => 'Campo :attribute es obligatorio.',
            'nombre.max'      => 'Campo :attribute permite máximo de 250 caracteres.',
            'nombre.min'      => 'Campo :attribute permite minimo de 3 caracteres.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'fechainicio.required' => 'El :attribute es obligatorio.',
            'fechainicio.date'     => 'El :attribute solo se permite fecha.',
        ];
    }

    public function attributes()
    {
        return [
            'abreviatura' => 'abreviatura',
            'nombre'      => 'nombre',
            'tipocambio'  => 'tipo de cambio',
            'fechainicio' => 'fecha inicio',
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
