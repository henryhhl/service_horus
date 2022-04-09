<?php

namespace App\Http\Requests\Comercio\Venta;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class NotaVentaRequest extends FormRequest
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

            'fkidsucursal' => 'required|numeric',
            'fkidalmacen' => 'required|numeric',
            'fkidvendedor' => 'required|numeric',
            'fkidcliente' => 'required|numeric',
            'fkidlistaprecio' => 'required|numeric',
            'fkidconceptoventa' => 'required|numeric',
            'fkidmoneda' => 'required|numeric',
            'fkidtipotransaccion' => 'required|numeric',
            'fkidtipopago' => 'required|numeric',

            'nrodebito' => 'nullable|numeric|gte:0',
            'nroventa' => 'nullable|numeric|gte:0',
            'nrocotizacion' => 'nullable|numeric|gte:0',
            'tipocambio' => 'nullable|numeric|gte:0',

            'fechaventa' => 'required|date',
            'facturar' => 'nullable|in:S,N',
            'isdevolucionventa' => 'nullable|in:A,N',
            'nrofactura' => 'nullable|numeric|gte:0',

            'impuestoiva' => 'nullable|numeric|gte:0',
            'montototalcobrado' => 'nullable|numeric|gte:0',
            'montototaldeudamora' => 'nullable|numeric|gte:0',
            'montototaldeudaactual' => 'nullable|numeric|gte:0',
            'descuentoacumulado' => 'nullable|numeric|gte:0',
            'porcentajerangodescuentoinicial' => 'nullable|numeric|gte:0',
            'porcentajerangodescuentofinal' => 'nullable|numeric|gte:0',
            'montoanticipo' => 'nullable|numeric|gte:0',

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

            'nrodebito.numeric' => 'Campo :attribute es permitido tipo número.',
            'nrodebito.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'nroventa.numeric' => 'Campo :attribute es permitido tipo número.',
            'nroventa.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'nrocotizacion.numeric' => 'Campo :attribute es permitido tipo número.',
            'nrocotizacion.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'tipocambio.numeric' => 'Campo :attribute es permitido tipo número.',
            'tipocambio.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'nrofactura.numeric' => 'Campo :attribute es permitido tipo número.',
            'nrofactura.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'impuestoiva.numeric' => 'Campo :attribute es permitido tipo número.',
            'impuestoiva.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montototalcobrado.numeric' => 'Campo :attribute es permitido tipo número.',
            'montototalcobrado.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montototaldeudamora.numeric' => 'Campo :attribute es permitido tipo número.',
            'montototaldeudamora.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montototaldeudaactual.numeric' => 'Campo :attribute es permitido tipo número.',
            'montototaldeudaactual.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'descuentoacumulado.numeric' => 'Campo :attribute es permitido tipo número.',
            'descuentoacumulado.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'porcentajerangodescuentoinicial.numeric' => 'Campo :attribute es permitido tipo número.',
            'porcentajerangodescuentoinicial.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'porcentajerangodescuentofinal.numeric' => 'Campo :attribute es permitido tipo número.',
            'porcentajerangodescuentofinal.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

            'montoanticipo.numeric' => 'Campo :attribute es permitido tipo número.',
            'montoanticipo.gte' => 'Campo :attribute es permitido mayor o igual a 0.',

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

            'fechaventa.date' => 'Campo :attribute permitido tipo fecha.',
            'facturar.in' => 'Campo :attribute es permitido ingresar S o N.',
            'isdevolucionventa.in' => 'Campo :attribute es permitido ingresar A o N.',

            'estado.in' => 'Campo :attribute es permitido ingresar A o N.',

            'x_fecha.required' => 'Campo :attribute es obligatorio.',
            'x_fecha.date' => 'Campo :attribute permitido tipo fecha.',

            'x_hora.required' => 'Campo :attribute es obligatorio.',
            'x_hora.date' => 'Campo :attribute permitido tipo hora.',
        ];
    }

    public function attributes()
    {
        return [
            'codigo' => 'código',

            'fkidsucursal' => 'ID Sucursal',
            'fkidalmacen' => 'ID Álmacen',
            'fkidvendedor' => 'ID Vendedor',
            'fkidcliente' => 'ID Cliente',
            'fkidlistaprecio' => 'ID Lista Precio',
            'fkidconceptoventa' => 'ID concepto Venta',
            'fkidmoneda' => 'ID Moneda',
            'fkidtipotransaccion' => 'ID Tipo Transacción',
            'fkidtipopago' => 'ID Tipo Pago',

            'nrodebito' => 'nro débito',
            'nroventa' => 'nro venta',
            'nrocotizacion' => 'nro cotización',
            'nrofactura' => 'nro factura',
            'tipocambio' => 'tipo cambio',

            'impuestoiva' => 'impuesto iva',
            'montototalcobrado' => 'monto total cobrado',
            'montototaldeudamora' => 'monto total deuda mora',
            'montototaldeudaactual' => 'monto total deuda actual',
            'descuentoacumulado' => 'descuento acumulado',
            'porcentajerangodescuentoinicial' => 'procentaje rango descuento inicial',
            'porcentajerangodescuentofinal' => 'procentaje rango descuento final',

            'montoanticipo' => 'monto anticipo',
            'montosubtotal' => 'monto subtotal',
            'descuento' => 'descuento',
            'montodescuento' => 'monto descuento',
            'montototal' => 'monto total',
            'cantidadtotal' => 'cantidad total',

            'fechaventa' => 'fecha venta',
            'facturar' => 'facturar',
            'isdevolucionventa' => 'es devolución venta',
            'estado' => 'estado',
            'x_fecha' => 'fecha actual',
            'x_hora' => 'hora actual',
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
