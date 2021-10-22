<?php

namespace App\Http\Requests\Comercio\Compra;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProveedorRequest extends FormRequest
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
            'fkidciudadpais'     => 'required|numeric',
            'fkidciudad'         => 'required|numeric',
            'fkidproveedortipo'  => 'required|numeric',
            'fkidproveedorgrupo' => 'required|numeric',

            'nombre' => 'required|max:250|min:3',

            'direccion' => 'max:250',
            'nit'       => 'max:200',
            'email'     => 'max:300',
        ];
    }

    public function messages()
    {
        return [
            'fkidciudadpais.required' => 'El :attribute es obligatorio.',
            'fkidciudadpais.numeric'  => 'El :attribute solo se permite numero.',

            'fkidciudad.required' => 'El :attribute es obligatorio.',
            'fkidciudad.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproveedortipo.required' => 'El :attribute es obligatorio.',
            'fkidproveedortipo.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproveedorgrupo.required' => 'El :attribute es obligatorio.',
            'fkidproveedorgrupo.numeric'  => 'El :attribute solo se permite numero.',

            'nombre.required'  => 'Campo :attribute es obligatorio.',
            'nombre.max'       => 'Campo :attribute permite máximo de 200 caracteres.',
            'nombre.min'       => 'Campo :attribute permite minimo de 3 caracteres.',

            'direccion.max' => 'Campo :attribute permite máximo de 250 caracteres.',
            'nit.max'       => 'Campo :attribute permite máximo de 200 caracteres.',
            'email.max'     => 'Campo :attribute permite máximo de 300 caracteres.',
        ];
    }

    public function attributes()
    {
        return [

            'fkidciudadpais'     => 'ID Ciudad Pais',
            'fkidciudad'         => 'ID Ciudad',
            'fkidproveedortipo'  => 'ID Tipo Proveedor',
            'fkidproveedorgrupo' => 'ID Grupo Proveedor',

            'nombre' => 'nombre',

            'direccion' => 'dirección',
            'nit'       => 'nit',
            'email'     => 'email',
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
