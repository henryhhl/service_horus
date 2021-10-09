<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class SucursalRequest extends FormRequest
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
            'direccion'   => 'required|max:250',
            'descripcion' => 'required|max:200|min:3',
            'fkidciudad'  => 'required|numeric',
            'fkidunionsucursal' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'abreviatura.max'       => 'Campo :attribute permite máximo de 50 caracteres.',
            'direccion.required'    => 'Campo :attribute es obligatorio.',
            'direccion.max'         => 'Campo :attribute permite máximo de 250 caracteres.',

            'descripcion.required'  => 'Campo :attribute es obligatorio.',
            'descripcion.max'       => 'Campo :attribute permite máximo de 200 caracteres.',
            'descripcion.min'       => 'Campo :attribute permite minimo de 3 caracteres.',

            'fkidciudad.required' => 'El :attribute es obligatorio.',
            'fkidciudad.numeric'  => 'El :attribute solo se permite numero.',

            'fkidunionsucursal.required' => 'El :attribute es obligatorio.',
            'fkidunionsucursal.numeric'  => 'El :attribute solo se permite numero.',
        ];
    }

    public function attributes()
    {
        return [
            'abreviatura' => 'abreviatura',
            'descripcion' => 'descripción',
            'direccion'   => 'dirección',
            'fkidciudad' => 'ID Ciudad',
            'fkidunionsucursal' => 'ID Unión Sucursal',
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
