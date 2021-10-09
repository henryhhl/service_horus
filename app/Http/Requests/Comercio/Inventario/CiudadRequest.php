<?php

namespace App\Http\Requests\Comercio\Inventario;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class CiudadRequest extends FormRequest
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
            'descripcion' => 'required|max:200|min:3',
            'fkidciudadclasificacion' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'abreviatura.max'       => 'Campo :attribute permite máximo de 50 caracteres.',
            'fkidciudadclasificacion.required' => 'El :attribute es obligatorio.',
            'fkidciudadclasificacion.numeric'  => 'El :attribute solo se permite numero.',
            'descripcion.required'  => 'Campo :attribute es obligatorio.',
            'descripcion.max'       => 'Campo :attribute permite máximo de 200 caracteres.',
            'descripcion.min'       => 'Campo :attribute permite minimo de 3 caracteres.',
        ];
    }

    public function attributes()
    {
        return [
            'abreviatura' => 'abreviatura',
            'descripcion' => 'descripción',
            'fkidciudadclasificacion' => 'ID Ciudad Clasificación',
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
