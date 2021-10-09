<?php

namespace App\Http\Requests\Comercio\Compra;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProveedorCargoRequest extends FormRequest
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
            'codigo' => 'max:150',
            'abreviatura' => 'max:50',
            'descripcion' => 'required|max:200|min:3',
        ];
    }

    public function messages()
    {
        return [
            'codigo.max'  => 'Campo :attribute permite máximo de 50 caracteres.',
            'abreviatura.max'      => 'Campo :attribute permite máximo de 50 caracteres.',
            'descripcion.required' => 'Campo :attribute es obligatorio.',
            'descripcion.max'      => 'Campo :attribute permite máximo de 200 caracteres.',
            'descripcion.min'      => 'Campo :attribute permite minimo de 3 caracteres.',
        ];
    }

    public function attributes()
    {
        return [
            'codigo' => 'código',
            'abreviatura' => 'abreviatura',
            'descripcion' => 'descripción',
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
