
import { C_Message } from "../../../../components";
import { Functions } from "../../../../utils/functions";
import { Strings } from "../../../constants";

const setInit = () => ( {
    type: Strings.informeVenta_setInit,
} );

const onChange = ( data ) => ( {
    type: Strings.informeVenta_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const setFechaInicio = (informeVenta, date) => {
    return ( dispatch ) => {
        let fechainicio = Functions.convertDMYToYMD(date);
        let fechafinal  = Functions.convertDMYToYMD(informeVenta.fechafinal);
        if ( fechainicio > fechafinal ) {
            dispatch( onChange(informeVenta) );
            C_Message("warning", "Fecha Inicio debe ser menor a Fecha Final");
            return;
        }
        informeVenta.fechainicio = date;
        dispatch( onChange(informeVenta) );
    };
};

const setFechaFinal = (informeVenta, date) => {
    return ( dispatch ) => {
        let fechainicio = Functions.convertDMYToYMD(informeVenta.fechainicio);
        let fechafinal  = Functions.convertDMYToYMD(date);
        if ( fechafinal < fechainicio ) {
            dispatch( onChange(informeVenta) );
            C_Message("warning", "Fecha Final debe ser mayor a Fecha Inicio");
            return;
        }
        informeVenta.fechafinal = date;
        dispatch( onChange(informeVenta) );
    };
};

const setTipoInforme = (informeVenta) => {
    return ( dispatch ) => {
        if ( informeVenta.tipoinforme == "N" ) {
            informeVenta.tipoinforme = "P";
        } else {
            informeVenta.tipoinforme = "N";
        }
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleSucursal = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_sucursal = !informeVenta.visible_sucursal;
        dispatch( onChange(informeVenta) );
    };
};

const setSucursal = (informeVenta, sucursal) => {
    return ( dispatch ) => {
        informeVenta.fkidsucursal = sucursal.idsucursal;
        informeVenta.sucursal = sucursal.descripcion;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleAlmacen = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_almacen = !informeVenta.visible_almacen;
        dispatch( onChange(informeVenta) );
    };
};

const setAlmacen = (informeVenta, almacen) => {
    return ( dispatch ) => {
        informeVenta.fkidalmacen = almacen.idalmacen;
        informeVenta.almacen = almacen.descripcion;
        informeVenta.visible_almacen = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleCliente = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_cliente = !informeVenta.visible_cliente;
        dispatch( onChange(informeVenta) );
    };
};

const setCliente = (informeVenta, cliente) => {
    return ( dispatch ) => {
        informeVenta.fkidcliente = cliente.idcliente;
        informeVenta.cliente = `${cliente.nombre} ${cliente.apellido}`;
        informeVenta.visible_cliente = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleConceptoVenta = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_conceptoventa = !informeVenta.visible_conceptoventa;
        dispatch( onChange(informeVenta) );
    };
};

const setConceptoVenta = (informeVenta, conceptoventa) => {
    return ( dispatch ) => {
        informeVenta.fkidconceptoventa = conceptoventa.idconceptoventa;
        informeVenta.conceptoventa = conceptoventa.descripcion;
        informeVenta.visible_conceptoventa = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleCiudad = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_ciudad = !informeVenta.visible_ciudad;
        dispatch( onChange(informeVenta) );
    };
};

const setCiudad = (informeVenta, ciudad) => {
    return ( dispatch ) => {
        informeVenta.fkidciudad = ciudad.idciudad;
        informeVenta.ciudad = ciudad.descripcion;
        informeVenta.visible_ciudad = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleVendedor = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_vendedor = !informeVenta.visible_vendedor;
        dispatch( onChange(informeVenta) );
    };
};

const setVendedor = (informeVenta, vendedor) => {
    return ( dispatch ) => {
        informeVenta.fkidvendedor = vendedor.idvendedor;
        informeVenta.vendedor = `${vendedor.nombre} ${vendedor.apellido}`;
        informeVenta.visible_vendedor = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleCategoria = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_categoria = !informeVenta.visible_categoria;
        dispatch( onChange(informeVenta) );
    };
};

const setCategoria = (informeVenta, categoria) => {
    return ( dispatch ) => {
        informeVenta.fkidcategoria = categoria.idcategoria;
        informeVenta.categoria = categoria.descripcion;
        informeVenta.visible_categoria = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleGrupo = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_grupo = !informeVenta.visible_grupo;
        dispatch( onChange(informeVenta) );
    };
};

const setGrupo = (informeVenta, grupo) => {
    return ( dispatch ) => {
        informeVenta.fkidgrupo = grupo.idproductogrupo;
        informeVenta.grupo = grupo.descripcion;
        informeVenta.visible_grupo = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleSubGrupo = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_subgrupo = !informeVenta.visible_subgrupo;
        dispatch( onChange(informeVenta) );
    };
};

const setSubGrupo = (informeVenta, subgrupo) => {
    return ( dispatch ) => {
        informeVenta.fkidsubgrupo = subgrupo.idproductosubgrupo;
        informeVenta.subgrupo = subgrupo.descripcion;
        informeVenta.visible_subgrupo = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleTipoProducto = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_tipoproducto = !informeVenta.visible_tipoproducto;
        dispatch( onChange(informeVenta) );
    };
};

const setTipoProducto = (informeVenta, tipoproducto) => {
    return ( dispatch ) => {
        informeVenta.fkidtipoproducto = tipoproducto.idproductotipo;
        informeVenta.tipoproducto = tipoproducto.descripcion;
        informeVenta.visible_tipoproducto = false;
        dispatch( onChange(informeVenta) );
    };
};

const setVisibleMarca = (informeVenta) => {
    return ( dispatch ) => {
        informeVenta.visible_marca = !informeVenta.visible_marca;
        dispatch( onChange(informeVenta) );
    };
};

const setMarca = (informeVenta, marca) => {
    return ( dispatch ) => {
        informeVenta.fkidmarca = marca.idproductomarca;
        informeVenta.marca = marca.descripcion;
        informeVenta.visible_marca = false;
        dispatch( onChange(informeVenta) );
    };
};

export const informeVentaActions = {
    initData,
    onChange,
    setVisibleAlmacen,
    setVisibleCategoria,
    setVisibleCliente,
    setVisibleCiudad,
    setVisibleConceptoVenta,
    setVisibleGrupo,
    setVisibleMarca,
    setVisibleSubGrupo,
    setVisibleSucursal,
    setVisibleTipoProducto,
    setVisibleVendedor,
    setAlmacen,
    setCategoria,
    setCliente,
    setCiudad,
    setConceptoVenta,
    setGrupo,
    setMarca,
    setSubGrupo,
    setSucursal,
    setTipoProducto,
    setVendedor,
    setFechaInicio,
    setFechaFinal,
    setTipoInforme,
};
