<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ComisionVentaRequest extends FormRequest
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
            'codigo'      => 'max:150',
            'descripcion' => 'required|max:250',
            'valor'       => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'codigo.max'           => 'Campo :attribute permite máximo de 150 caracteres.',

            'descripcion.required' => 'Campo :attribute es obligatorio.',
            'descripcion.max'      => 'Campo :attribute permite máximo de 250 caracteres.',

            'valor.required' => 'Campo :attribute es obligatorio.',
            'valor.numeric'  => 'Campo :attribute permitido tipo número.',
        ];
    }

    public function attributes()
    {
        return [
            'codigo'      => 'código',
            'descripcion' => 'descripción',
            'valor'       => 'valor',
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
