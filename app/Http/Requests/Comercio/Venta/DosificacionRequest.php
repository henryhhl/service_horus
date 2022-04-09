<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class DosificacionRequest extends FormRequest
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
            'abreviatura' => 'max:50',

            'fkidsucursal' => 'required|numeric',
            'fkidactividadeconomica' => 'required|numeric',

            'descripcion' => 'required',

            'tiposucursal' => 'nullable|in:M,S',
            'tipodosificacion' => 'nullable|in:A,M',
            'tipoempresa' => 'nullable|in:N,J',

            'nit' => 'required',
            'nroautorizacion' => 'required',
            'llave' => 'required',
            'lugaremision' => 'required',

            'numerocorrelativo' => 'nullable|numeric|gte:0',

            'direccionfiscal' => 'required',
            'telefonofiscal' => 'required',

            'numfacturainicial' => 'nullable|numeric|gte:0',
            'numfacturasiguiente' => 'nullable|numeric|gte:0',

            'fechaactivacion' => 'required|date',
            'fechalimiteemision' => 'required|date',

            'rangofacturainicial' => 'nullable|numeric|gte:0',
            'rangofacturafinal' => 'nullable|numeric|gte:0',

            'x_fecha' => 'required|date',
            'x_hora' => "required|date_format:H:i:s",

            'estado' => 'nullable|in:A,N',
        ];
    }

    public function messages()
    {
        return [
            'codigo.max'           => 'Campo :attribute permite máximo de 150 caracteres.',
            'abreviatura.max'      => 'Campo :attribute permite máximo de 50 caracteres.',

            'fkidsucursal.required' => 'Campo :attribute es obligatorio.',
            'fkidsucursal.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidactividadeconomica.required' => 'Campo :attribute es obligatorio.',
            'fkidactividadeconomica.numeric' => 'Campo :attribute es permitido tipo número.',

            'numerocorrelativo.numeric' => 'Campo :attribute es permitido tipo número.',
            'numerocorrelativo.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'numfacturainicial.numeric' => 'Campo :attribute es permitido tipo número.',
            'numfacturainicial.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'numfacturasiguiente.numeric' => 'Campo :attribute es permitido tipo número.',
            'numfacturasiguiente.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'rangofacturainicial.numeric' => 'Campo :attribute es permitido tipo número.',
            'rangofacturainicial.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'rangofacturafinal.numeric' => 'Campo :attribute es permitido tipo número.',
            'rangofacturafinal.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'descripcion.required' => 'Campo :attribute es obligatorio.',
            'nit.required' => 'Campo :attribute es obligatorio.',
            'nroautorizacion.required' => 'Campo :attribute es obligatorio.',
            'llave.required' => 'Campo :attribute es obligatorio.',
            'lugaremision.required' => 'Campo :attribute es obligatorio.',
            'direccionfiscal.required' => 'Campo :attribute es obligatorio.',
            'telefonofiscal.required' => 'Campo :attribute es obligatorio.',

            'fechaactivacion.required' => 'Campo :attribute es obligatorio.',
            'fechaactivacion.date' => 'Campo :attribute permitido tipo fecha.',

            'fechalimiteemision.required' => 'Campo :attribute es obligatorio.',
            'fechalimiteemision.date' => 'Campo :attribute permitido tipo fecha.',

            'estado.in' => 'Campo :attribute es permitido ingresar A o N.',
            'tiposucursal.in' => 'Campo :attribute es permitido ingresar M o S.',
            'tipodosificacion.in' => 'Campo :attribute es permitido ingresar A o M.',
            'tipoempresa.in' => 'Campo :attribute es permitido ingresar J o N.',

            'x_fecha.required' => 'Campo :attribute es obligatorio.',
            'x_fecha.date' => 'Campo :attribute permitido tipo fecha.',

            'x_hora.required' => 'Campo :attribute es obligatorio.',
            'x_hora.date' => 'Campo :attribute permitido tipo hora.',
        ];
    }

    public function attributes()
    {
        return [
            'codigo'      => 'código',
            'abreviatura' => 'abreviatura',

            'fkidsucursal' => 'ID Sucursal',
            'fkidactividadeconomica' => 'ID Actividad Económica',

            'descripcion' => 'descripción',

            'tiposucursal' => 'tipo sucursal',
            'tipodosificacion' => 'tipo dosificación',
            'tipoempresa' => 'tipo empresa',

            'nit' => 'nit',
            'nroautorizacion' => 'número autorización',
            'llave' => 'llave',
            'lugaremision' => 'lugar emisión',

            'numerocorrelativo' => 'número correlativo',

            'direccionfiscal' => 'dirección fiscal',
            'telefonofiscal' => 'teléfono fiscal',

            'numfacturainicial' => 'número factura inicial',
            'numfacturasiguiente' => 'número factura siguiente',

            'fechaactivacion' => 'fecha activicación',
            'fechalimiteemision' => 'fecha limite emisión',

            'rangofacturainicial' => 'rango factura inicial',
            'rangofacturafinal' => 'rango factura final',

            'x_fecha' => 'fecha',
            'x_hora' => "hora",

            'estado' => 'estado',
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
