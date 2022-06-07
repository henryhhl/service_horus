
export const treeMenu = [
    {
        key: "COMERCIO", title: "COMERCIO", visible: false,
        children: [
            {
                key: "INVENTARIO", title: "INVENTARIO", visible: false,
                children: [
                    {
                        key: "NOTAS", title: "NOTAS",
                        children: [
                            {
                                key: "notaingreso", title: "NOTA DE INGRESO",
                                children: [],
                            },
                            {
                                key: "notasalida", title: "NOTA DE SALIDA",
                                children: [],
                            },
                            {
                                key: "notatraspaso", title: "NOTA DE TRASPASO",
                                children: [],
                            },
                        ],
                    },
                    {
                        key: "DATO_GENERAL", title: "DATO GENERAL",
                        children: [
                            {
                                key: "almacen", title: "ÁLMACEN",
                                children: [],
                            },
                            {
                                key: "seccioninventario", title: "SECCIÓN INVENTARIO",
                                children: [],
                            },
                            {
                                key: "producto", title: "PRODUCTO",
                                children: [],
                            },
                            {
                                key: "conceptoinventario", title: "CONCEPTO INVENTARIO",
                                children: [],
                            },
                            {
                                key: "categoria", title: "CATEGORÍA",
                                children: [],
                            },
                            {
                                key: "marca", title: "MARCA",
                                children: [],
                            },
                            {
                                key: "productotipo", title: "TIPO PRODUCTO",
                                children: [],
                            },
                            {
                                key: "unidadmedida", title: "UNIDAD MEDIDA",
                                children: [],
                            },
                            {
                                key: "productogrupo", title: "GRUPO PRODUCTO",
                                children: [],
                            },
                            {
                                key: "productosubgrupo", title: "SUB GRUPO PRODUCTO",
                                children: [],
                            },
                            {
                                key: "ciudad", title: "CIUDAD",
                                children: [],
                            },
                            {
                                key: "ciudadclasificacion", title: "CIUDAD CLASIFICACIÓN",
                                children: [],
                            },
                        ],
                    },
                    {
                        key: "INFORMES", title: "INFORMES",
                        children: [

                        ],
                    },
                ],
            },
            {
                key: "COMPRA", title: "COMPRA", visible: false,
                children: [
                    {
                        key: "NOTAS", title: "NOTAS",
                        children: [
                            {
                                key: "notacompra", title: "NOTA DE COMPRA",
                                children: [],
                            },
                            {
                                key: "ordencompra", title: "ORDEN DE COMPRA",
                                children: [],
                            },
                            {
                                key: "solicitudcompra", title: "SOLICITUD DE COMPRA",
                                children: [],
                            },
                            {
                                key: "devolucioncompra", title: "DEVOLUCIÓN COMPRA",
                                children: [],
                            },
                        ],
                    },
                    {
                        key: "DATO_GENERAL", title: "DATO GENERAL",
                        children: [
                            {
                                key: "proveedor", title: "PROVEEDOR",
                                children: [],
                            },
                            {
                                key: "conceptocompra", title: "CONCEPTO COMPRA",
                                children: [],
                            },
                            {
                                key: "proveedortipo", title: "TIPO PROVEEDOR",
                                children: [],
                            },
                            {
                                key: "proveedorgrupo", title: "GRUPO PROVEEDOR",
                                children: [],
                            },
                            {
                                key: "proveedorcargo", title: "CARGO PROVEEDOR",
                                children: [],
                            },
                        ],
                    },
                    {
                        key: "INFORMES", title: "INFORMES",
                        children: [
                            {
                                key: "informegeneralnotacompra", title: "INFORME GENERAL DE NOTA COMPRA",
                                children: [],
                            },
                            {
                                key: "planillaordenesnotacompra", title: "PLANILLA DE ORDEN DE COMPRA",
                                children: [],
                            },
                            {
                                key: "planillasolicitudcompra", title: "PLANILLA DE SOLICITUD COMPRA",
                                children: [],
                            },
                            {
                                key: "informecompraespecial", title: "INFORME COMPRA ESPECIAL",
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                key: "VENTA", title: "VENTA", visible: false,
                children: [
                    {
                        key: "NOTAS", title: "NOTAS",
                        children: [
                            {
                                key: "notaventa", title: "NOTA VENTA",
                                children: [],
                            },
                            {
                                key: "devolucionnotaventa", title: "DEVOLUCIÓN NOTA VENTA",
                                children: [],
                            },
                        ],
                    },
                    {
                        key: "DATO_GENERAL", title: "DATO GENERAL",
                        children: [
                            {
                                key: "listaprecio", title: "LISTA PRECIO",
                                children: [],
                            },
                            {
                                key: "conceptoventa", title: "CONCEPTO VENTA",
                                children: [],
                            },
                            {
                                key: "cliente", title: "CLIENTE",
                                children: [],
                            },
                            {
                                key: "clientetipo", title: "TIPO CLIENTE",
                                children: [],
                            },
                            {
                                key: "vendedor", title: "VENDEDOR",
                                children: [],
                            },
                            {
                                key: "comisionventa", title: "COMISIÓN VENTA",
                                children: [],
                            },
                            {
                                key: "sucursal", title: "SUCURSAL",
                                children: [],
                            },
                            {
                                key: "unionsucursal", title: "UNIÓN SUCURSAL",
                                children: [],
                            },
                            {
                                key: "dosificacion", title: "DOSIFICACIÓN",
                                children: [],
                            },
                            {
                                key: "actividadeconomica", title: "ACTIVIDAD ECONÓMICA",
                                children: [],
                            },
                        ],
                    },
                    {
                        key: "INFORMES", title: "INFORMES",
                        children: [],
                    },
                ],
            },
            {
                key: "PRODUCCION", title: "PRODUCCIÓN", visible: false,
                children: [],
            },
            {
                key: "CONFIGURACION", title: "CONFIGURACIÓN", visible: false,
                children: [],
            },
        ],
    },
    {
        key: "CONTABILIDAD", title: "CONTABILIDAD", visible: false,
        children: [],
    },
];
