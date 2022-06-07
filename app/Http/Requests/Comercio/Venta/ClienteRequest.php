<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ClienteRequest extends FormRequest
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
            'fkidciudadpais'  => 'required|numeric',
            'fkidciudad'      => 'required|numeric',
            'fkidclientetipo' => 'required|numeric',
            'fkidlistaprecio' => 'nullable|numeric',
            'fkidconceptoventa' => 'nullable|numeric',
            'fkidsucursal' => 'nullable|numeric',

            'nombre'      => 'required|max:150',
            'apellido'    => 'required|max:250',
            'razonsocial' => 'nullable|max:300',

            'diascredito' => 'required|numeric',
            'limitecredito' => 'required|numeric',
            'descuento' => 'required|numeric',
            'cantidaditems' => 'required|numeric',
            'descuentoxcantidaditems' => 'required|numeric',
            'descuentoinicial' => 'required|numeric',
            'descuentofinal' => 'required|numeric',

            'montototaladeudado' => 'required|numeric',
            'fechaultimopago' => 'nullable|date',
            'montototaladeudadoultimopago' => 'required|numeric',
            'fechaultimaventa' => 'nullable|date',
            'montototalultimaventa' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'fkidciudadpais.required' => 'Campo :attribute es obligatorio.',
            'fkidciudadpais.numeric'  => 'El :attribute solo se permite numero.',

            'fkidciudad.required' => 'Campo :attribute es obligatorio.',
            'fkidciudad.numeric'  => 'El :attribute solo se permite numero.',

            'fkidclientetipo.required' => 'Campo :attribute es obligatorio.',
            'fkidclientetipo.numeric'  => 'El :attribute solo se permite numero.',

            'fkidlistaprecio.numeric'  => 'El :attribute solo se permite numero.',
            'fkidconceptoventa.numeric'  => 'El :attribute solo se permite numero.',
            'fkidsucursal.numeric'  => 'El :attribute solo se permite numero.',

            'nombre.required' => 'Campo :attribute es obligatorio.',
            'nombre.max'      => 'Campo :attribute permite máximo de 150 caracteres.',

            'apellido.required' => 'Campo :attribute es obligatorio.',
            'apellido.max'      => 'Campo :attribute permite máximo de 250 caracteres.',

            'razonsocial.max'      => 'Campo :attribute permite máximo de 300 caracteres.',

            'diascredito.required' => 'Campo :attribute es obligatorio.',
            'diascredito.numeric'  => 'El :attribute solo se permite numero.',

            'limitecredito.required' => 'Campo :attribute es obligatorio.',
            'limitecredito.numeric'  => 'El :attribute solo se permite numero.',

            'descuento.required' => 'Campo :attribute es obligatorio.',
            'descuento.numeric'  => 'El :attribute solo se permite numero.',

            'cantidaditems.required' => 'Campo :attribute es obligatorio.',
            'cantidaditems.numeric'  => 'El :attribute solo se permite numero.',

            'descuentoxcantidaditems.required' => 'Campo :attribute es obligatorio.',
            'descuentoxcantidaditems.numeric'  => 'El :attribute solo se permite numero.',

            'descuentoinicial.required' => 'Campo :attribute es obligatorio.',
            'descuentoinicial.numeric'  => 'El :attribute solo se permite numero.',

            'descuentofinal.required' => 'Campo :attribute es obligatorio.',
            'descuentofinal.numeric'  => 'El :attribute solo se permite numero.',

            'montototaladeudado.required' => 'Campo :attribute es obligatorio.',
            'montototaladeudado.numeric'  => 'El :attribute solo se permite numero.',

            'montototaladeudadoultimopago.required' => 'Campo :attribute es obligatorio.',
            'montototaladeudadoultimopago.numeric'  => 'El :attribute solo se permite numero.',

            'montototalultimaventa.required' => 'Campo :attribute es obligatorio.',
            'montototalultimaventa.numeric'  => 'El :attribute solo se permite numero.',

            'fechaultimopago.date'  => 'El :attribute solo se permite fecha.',
            'fechaultimaventa.date'  => 'El :attribute solo se permite fecha.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidciudadpais' => 'ID ciudad Pais',
            'fkidciudad' => 'ID ciudad',
            'fkidclientetipo'   => 'ID tipo cliente',
            'fkidlistaprecio' => 'ID lista precio',
            'fkidconceptoventa' => 'ID concepto venta',
            'fkidsucursal' => 'ID sucursal',

            'nombre'      => 'nombre',
            'apellido'    => 'apellido',
            'razonsocial' => 'razon social',

            'diascredito' => 'dias crédito',
            'limitecredito' => 'limite crédito',
            'descuento' => 'descuento',
            'cantidaditems' => 'cantidad items',
            'descuentoxcantidaditems' => 'descuento x cantidad items',
            'descuentoinicial' => 'descuento inicial',
            'descuentofinal' => 'descuento final',

            'montototaladeudado' => 'monto adeudado',
            'fechaultimopago' => 'fecha último pago',
            'montototaladeudadoultimopago' => 'monto adeudado último pago',
            'fechaultimaventa' => 'fecha última venta',
            'montototalultimaventa' => 'monto última venta',
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
