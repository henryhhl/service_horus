<?php

namespace App\Http\Requests\Comercio\Inventario;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class NotaTraspasoProductoRequest extends FormRequest
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
            'codigo'           => 'max:150',
            'fechanotatraspaso' => 'required|date',

            'fkidsucursalingreso'    => 'required|numeric',
            'fkidsucursalsalida'     => 'required|numeric',
            'fkidalmaceningreso'     => 'required|numeric',
            'fkidalmacensalida'      => 'required|numeric',
            'fkidconceptoinventario' => 'required|numeric',
            'fkidmoneda'             => 'required|numeric',
            'fkidtipotransaccion'    => 'required|numeric',

            'tipocambio'     => 'required|numeric',
            'cantidadtotal'  => 'required|numeric',
            'montototal'     => 'required|numeric',
            'pesototal'      => 'required|numeric',
            'volumentotal'   => 'required|numeric',
            'nrocajastotal'  => 'required|numeric',

            'estado' => 'nullable|in:A,N',
            'isdelete' => 'nullable|in:A,N',
        ];
    }

    public function messages()
    {
        return [

            'fkidsucursalingreso.required' => 'El :attribute es obligatorio.',
            'fkidsucursalingreso.numeric'  => 'El :attribute solo se permite numero.',

            'fkidsucursalsalida.required' => 'El :attribute es obligatorio.',
            'fkidsucursalsalida.numeric'  => 'El :attribute solo se permite numero.',

            'fkidalmaceningreso.required' => 'El :attribute es obligatorio.',
            'fkidalmaceningreso.numeric'  => 'El :attribute solo se permite numero.',

            'fkidalmacensalida.required' => 'El :attribute es obligatorio.',
            'fkidalmacensalida.numeric'  => 'El :attribute solo se permite numero.',

            'fkidconceptoinventario.required' => 'El :attribute es obligatorio.',
            'fkidconceptoinventario.numeric'  => 'El :attribute solo se permite numero.',

            'fkidmoneda.required' => 'El :attribute es obligatorio.',
            'fkidmoneda.numeric'  => 'El :attribute solo se permite numero.',

            'fkidtipotransaccion.required' => 'El :attribute es obligatorio.',
            'fkidtipotransaccion.numeric'  => 'El :attribute solo se permite numero.',

            'codigo.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fechanotatraspaso.required' => 'El :attribute es obligatorio.',
            'fechanotatraspaso.date'     => 'El :attribute solo se permite fecha.',

            'tipocambio.required' => 'El :attribute es obligatorio.',
            'tipocambio.numeric'  => 'El :attribute solo se permite numero.',

            'cantidadtotal.required' => 'El :attribute es obligatorio.',
            'cantidadtotal.numeric'  => 'El :attribute solo se permite numero.',

            'montototal.required' => 'El :attribute es obligatorio.',
            'montototal.numeric'  => 'El :attribute solo se permite numero.',

            'pesototal.required' => 'El :attribute es obligatorio.',
            'pesototal.numeric'  => 'El :attribute solo se permite numero.',

            'volumentotal.required' => 'El :attribute es obligatorio.',
            'volumentotal.numeric'  => 'El :attribute solo se permite numero.',

            'nrocajastotal.required' => 'El :attribute es obligatorio.',
            'nrocajastotal.numeric'  => 'El :attribute solo se permite numero.',

            'estado.in' => 'Campo :attribute es permitido ingresar A o N.',
            'isdelete.in' => 'Campo :attribute es permitido ingresar A o N.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidsucursalingreso'    => 'ID Sucursal Ingreso',
            'fkidsucursalsalida'     => 'ID Sucursal Salida',
            'fkidalmaceningreso'     => 'ID Álmacen Ingreso',
            'fkidalmacensalida'      => 'ID Álmacen Salida',
            'fkidconceptoinventario' => 'ID Concepto Inventario',
            'fkidmoneda'             => 'ID Moneda',
            'fkidtipotransaccion'    => 'ID',

            'codigo'           => 'código',
            'fechanotatraspaso' => 'fecha Nota',

            'tipocambio'    => 'Tipo Cambio',
            'cantidadtotal' => 'Cantidad Total',
            'montototal'    => 'Monto Total',
            'pesototal'     => 'Peso Total',
            'volumentotal'  => 'Volumen Total',
            'nrocajastotal' => 'Nro. Cajas Total',

            'estado' => '',
            'isdelete' => '',

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
