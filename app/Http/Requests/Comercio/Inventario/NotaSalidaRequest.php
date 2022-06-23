<?php

namespace App\Http\Requests\Comercio\Inventario;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class NotaSalidaRequest extends FormRequest
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
            'fechanotasalida' => 'required|date',

            'fkidsucursal'           => 'required|numeric',
            'fkidalmacen'            => 'required|numeric',
            'fkidconceptoinventario' => 'required|numeric',
            'fkidmoneda'             => 'required|numeric',
            'fkidtipotransaccion'    => 'required|numeric',

            'tipocambio'     => 'required|numeric',
            'cantidadtotal'  => 'required|numeric',
            'montototal'     => 'required|numeric',
            'pesototal'      => 'required|numeric',
            'volumentotal'   => 'required|numeric',
            'nrocajastotal'  => 'required|numeric',

            'esnotasalida' => 'nullable|in:A,N',
            'esingresado' => 'nullable|in:A,N',
            'estado' => 'nullable|in:A,N',
            'isdelete' => 'nullable|in:A,N',
        ];
    }

    public function messages()
    {
        return [

            'fkidsucursal.required' => 'El :attribute es obligatorio.',
            'fkidsucursal.numeric'  => 'El :attribute solo se permite numero.',

            'fkidalmacen.required' => 'El :attribute es obligatorio.',
            'fkidalmacen.numeric'  => 'El :attribute solo se permite numero.',

            'fkidconceptoinventario.required' => 'El :attribute es obligatorio.',
            'fkidconceptoinventario.numeric'  => 'El :attribute solo se permite numero.',

            'fkidmoneda.required' => 'El :attribute es obligatorio.',
            'fkidmoneda.numeric'  => 'El :attribute solo se permite numero.',

            'fkidtipotransaccion.required' => 'El :attribute es obligatorio.',
            'fkidtipotransaccion.numeric'  => 'El :attribute solo se permite numero.',

            'codigo.max' => 'Campo :attribute permite máximo de 150 caracteres.',

            'fechanotasalida.required' => 'El :attribute es obligatorio.',
            'fechanotasalida.date'     => 'El :attribute solo se permite fecha.',

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

            'esnotasalida.in' => 'Campo :attribute es permitido ingresar A o N.',
            'esingresado.in' => 'Campo :attribute es permitido ingresar A o N.',
            'estado.in' => 'Campo :attribute es permitido ingresar A o N.',
            'isdelete.in' => 'Campo :attribute es permitido ingresar A o N.',
        ];
    }

    public function attributes()
    {
        return [
            'fkidsucursal'           => 'ID Sucursal',
            'fkidalmacen'            => 'ID Álmacen',
            'fkidconceptoinventario' => 'ID Concepto Inventario',
            'fkidmoneda'             => 'ID Moneda',
            'fkidtipotransaccion'    => 'ID',

            'codigo'           => 'código',
            'fechanotasalida' => 'fecha Nota',

            'tipocambio'    => 'Tipo Cambio',
            'cantidadtotal' => 'Cantidad Total',
            'montototal'    => 'Monto Total',
            'pesototal'     => 'Peso Total',
            'volumentotal'  => 'Volumen Total',
            'nrocajastotal' => 'Nro. Cajas Total',

            'esnotasalida' => '',
            'esingresado' => '',
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
