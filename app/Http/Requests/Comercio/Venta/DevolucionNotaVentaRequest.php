<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class DevolucionNotaVentaRequest extends FormRequest
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

            'fkidnotaventa' => 'required|numeric',
            'fkidsucursal' => 'required|numeric',
            'fkidalmacen' => 'required|numeric',
            'fkidvendedor' => 'required|numeric',
            'fkidcliente' => 'required|numeric',
            'fkidlistaprecio' => 'required|numeric',
            'fkidconceptoventa' => 'required|numeric',
            'fkidmoneda' => 'required|numeric',
            'fkidtipotransaccion' => 'required|numeric',
            'fkidtipopago' => 'required|numeric',

            'tipocambio' => 'nullable|numeric|gte:0',
            'nrofactura' => 'nullable|numeric|gte:0',
            'fechadevolucionnotaventa' => 'required|date',
            'fechanotaventa' => 'required|date',

            'montosubtotal' => 'required|numeric|gte:0',
            'descuento' => 'required|numeric|gte:0',
            'montodescuento' => 'required|numeric|gte:0',
            'montototal' => 'required|numeric|gte:0',
            'cantidadtotal' => 'required|numeric|gte:0',

            'x_fecha' => 'required|date',
            'x_hora'  => "required|date_format:H:i:s",
            'estado' => 'nullable|in:A,N',
        ];
    }

    public function messages()
    {
        return [
            'codigo.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fkidnotaventa.required' => 'Campo :attribute es obligatorio.',
            'fkidnotaventa.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidsucursal.required' => 'Campo :attribute es obligatorio.',
            'fkidsucursal.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidalmacen.required' => 'Campo :attribute es obligatorio.',
            'fkidalmacen.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidvendedor.required' => 'Campo :attribute es obligatorio.',
            'fkidvendedor.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidcliente.required' => 'Campo :attribute es obligatorio.',
            'fkidcliente.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidlistaprecio.required' => 'Campo :attribute es obligatorio.',
            'fkidlistaprecio.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidconceptoventa.required' => 'Campo :attribute es obligatorio.',
            'fkidconceptoventa.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidmoneda.required' => 'Campo :attribute es obligatorio.',
            'fkidmoneda.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidtipotransaccion.required' => 'Campo :attribute es obligatorio.',
            'fkidtipotransaccion.numeric' => 'Campo :attribute es permitido tipo número.',

            'fkidtipopago.required' => 'Campo :attribute es obligatorio.',
            'fkidtipopago.numeric' => 'Campo :attribute es permitido tipo número.',

            'tipocambio.numeric' => 'Campo :attribute es permitido tipo número.',
            'tipocambio.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'nrofactura.numeric' => 'Campo :attribute es permitido tipo número.',
            'nrofactura.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montosubtotal.required' => 'Campo :attribute es obligatorio.',
            'montosubtotal.numeric' => 'Campo :attribute es permitido tipo número.',
            'montosubtotal.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'descuento.required' => 'Campo :attribute es obligatorio.',
            'descuento.numeric' => 'Campo :attribute es permitido tipo número.',
            'descuento.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montodescuento.required' => 'Campo :attribute es obligatorio.',
            'montodescuento.numeric' => 'Campo :attribute es permitido tipo número.',
            'montodescuento.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montototal.required' => 'Campo :attribute es obligatorio.',
            'montototal.numeric' => 'Campo :attribute es permitido tipo número.',
            'montototal.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'cantidadtotal.required' => 'Campo :attribute es obligatorio.',
            'cantidadtotal.numeric' => 'Campo :attribute es permitido tipo número.',
            'cantidadtotal.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'fechadevolucionnotaventa.required' => 'Campo :attribute es obligatorio.',
            'fechadevolucionnotaventa.date' => 'Campo :attribute permitido tipo fecha.',

            'fechanotaventa.required' => 'Campo :attribute es obligatorio.',
            'fechanotaventa.date' => 'Campo :attribute permitido tipo fecha.',

            'estado.in' => 'Campo :attribute es permitido ingresar A o N.',

            'x_fecha.required' => 'Campo :attribute es obligatorio.',
            'x_fecha.date' => 'Campo :attribute permitido tipo fecha.',

            'x_hora.required' => 'Campo :attribute es obligatorio.',
            'x_hora.date' => 'Campo :attribute permitido tipo hora.',
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
