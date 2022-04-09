<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class VendedorRequest extends FormRequest
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
            'fkidciudadpais' => 'required|numeric',
            'fkidciudad' => 'required|numeric',
            'fkidcomisionventa' => 'required|numeric',

            'codigo' => 'max:150',
            'ci' => 'required|max:100',
            'nombre' => 'required|max:150',
            'apellido' => 'required|max:250',

            'email' => 'nullable|email',
            'fechanacimiento' => 'nullable|date',
            'genero' => 'required',
            'estadocivil' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'fkidciudadpais.required' => 'Campo :attribute es obligatorio.',
            'fkidciudadpais.numeric'  => 'Campo :attribute permite número.',

            'fkidciudad.required' => 'Campo :attribute es obligatorio.',
            'fkidciudad.numeric'  => 'Campo :attribute permite número.',

            'fkidcomisionventa.required' => 'Campo :attribute es obligatorio.',
            'fkidcomisionventa.numeric'  => 'Campo :attribute permite número.',

            'codigo.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'ci.required' => 'Campo :attribute es obligatorio.',
            'ci.max'      => 'Campo :attribute permite máximo de 100 caracteres.',

            'nombre.required' => 'Campo :attribute es obligatorio.',
            'nombre.max'      => 'Campo :attribute permite máximo de 150 caracteres.',

            'apellido.required' => 'Campo :attribute es obligatorio.',
            'apellido.max'      => 'Campo :attribute permite máximo de 250 caracteres.',

            'email.email'  => 'Campo :attribute permite email.',
            'fkidciudadpais.required' => 'Campo :attribute es obligatorio.',
            'genero.required'  => 'Campo :attribute permite fecha.',
            'estadocivil.required'  => 'Campo :attribute permite fecha.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidciudadpais' => 'ID ciudad pais',
            'fkidciudad' => 'ID ciudad',
            'fkidcomisionventa' => 'ID comisión venta',

            'codigo' => 'código',
            'ci' => 'ci',
            'nombre' => 'nombre',
            'apellido' => 'apellido',

            'email' => 'email',
            'fechanacimiento' => 'fecha nacimiento',
            'genero' => 'género',
            'estadocivil' => 'estado civil',
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
