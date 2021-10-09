<?php

namespace App\Http\Requests\Comercio\Inventario;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProductoRequest extends FormRequest
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
            'fkidciudadorigen'     => 'required|numeric',
            'fkidcategoria'        => 'required|numeric',
            'fkidproductomarca'    => 'required|numeric',
            'fkidproductotipo'     => 'required|numeric',
            'fkidproductogrupo'    => 'required|numeric',
            'fkidproductosubgrupo' => 'required|numeric',

            'nombre'      => 'required|max:250|min:3',
            'abreviatura' => 'max:50',
            'codigo'      => 'max:150',
        ];
    }

    public function messages()
    {
        return [
            'fkidciudadorigen.required' => 'El :attribute es obligatorio.',
            'fkidciudadorigen.numeric'  => 'El :attribute solo se permite numero.',

            'fkidcategoria.required' => 'El :attribute es obligatorio.',
            'fkidcategoria.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproductomarca.required' => 'El :attribute es obligatorio.',
            'fkidproductomarca.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproductotipo.required' => 'El :attribute es obligatorio.',
            'fkidproductotipo.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproductogrupo.required' => 'El :attribute es obligatorio.',
            'fkidproductogrupo.numeric'  => 'El :attribute solo se permite numero.',

            'fkidproductosubgrupo.required' => 'El :attribute es obligatorio.',
            'fkidproductosubgrupo.numeric'  => 'El :attribute solo se permite numero.',

            'nombre.required'  => 'Campo :attribute es obligatorio.',
            'nombre.max'       => 'Campo :attribute permite máximo de 250 caracteres.',
            'nombre.min'       => 'Campo :attribute permite minimo de 3 caracteres.',

            'abreviatura.max' => 'Campo :attribute permite máximo de 50 caracteres.',
            'codigo.max'      => 'Campo :attribute permite máximo de 150 caracteres.',
        ];
    }

    public function attributes()
    {
        return [

            'fkidciudadorigen'     => 'ID Ciudad Origen',
            'fkidcategoria'        => 'ID Categoria',
            'fkidproductomarca'    => 'ID Categoria',
            'fkidproductotipo'     => 'ID Tipo Producto',
            'fkidproductogrupo'    => 'ID Grupo Producto',
            'fkidproductosubgrupo' => 'ID Sub Grupo Producto',

            'nombre'      => 'nombre',
            'abreviatura' => 'abreviatura',
            'codigo'      => 'código',
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
