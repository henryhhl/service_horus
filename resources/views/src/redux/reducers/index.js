
import { combineReducers } from 'redux';

import { CategoriaReducer } from './comercio/inventario/categoriaReducers';
import { CiudadClasificacionReducer } from './comercio/inventario/ciudadClasificacionReducers';
import { CiudadReducer } from './comercio/inventario/ciudadReducers';
import { ProductoGrupoReducer } from './comercio/inventario/productoGrupoReducers';
import { ProductoMarcaReducer } from './comercio/inventario/productoMarcaReducers';
import { ProductoSubGrupoReducer } from './comercio/inventario/productoSubGrupoReducers';
import { ProductoTipoReducer } from './comercio/inventario/productoTipoReducers';
import { UnidadMedidaReducer } from './comercio/inventario/unidadMedidaReducers';
import { ConceptoInventarioReducer } from './comercio/inventario/conceptoInventarioReducers';
import { SeccionInventarioReducer } from './comercio/inventario/seccionInventarioReducers';

import { ArhivoOptionReducer } from './config/archivoOptionReducers';
import { DisabledReducer } from './config/disabledReducers';
import { LoadingReducer } from './config/loadingReducers';
import { PaginationReducers } from './config/paginationReducers';
import { PrintOptionReducer } from './config/printOptionReducers';
import { VisibleReducer } from './config/visibleReducers';

import { UnionSucursalReducer } from './comercio/venta/unionSucursalReducers';

import { ListadoModuleReducer } from './listado';
import { SucursalReducer } from './comercio/venta/sucursalReducers';
import { AlmacenReducer } from './comercio/inventario/almacenReducers';
import { ProveedorTipoReducer } from './comercio/compra/proveedorTipoReducers';
import { ProveedorGrupoReducer } from './comercio/compra/proveedorGrupoReducers';
import { ProveedorCargoReducer } from './comercio/compra/proveedorCargoReducers';
import { ConceptoCompraReducer } from './comercio/compra/conceptoCompraReducers';
import { ProveedorReducer } from './comercio/compra/proveedorReducers';
import { ListaPrecioReducer } from './comercio/venta/listaPrecioReducers';
import { ProductoReducer } from './comercio/inventario/productoReducers';
import { NotaIngresoReducer } from './comercio/inventario/notaIngresoReducers';
import { SolicitudCompraCompraReducer } from './comercio/compra/solicitudCompraReducers';
import { OrdenCompraCompraReducer } from './comercio/compra/ordenCompraReducers';
import { NotaCompraCompraReducer } from './comercio/compra/notaCompraReducers';
import { DevolucionCompraCompraReducer } from './comercio/compra/devolucionCompraReducers';

import { InformeCompraReducer } from './comercio/compra/informeCompraReducers';
import { ClienteTipoReducer } from './comercio/venta/clienteTipoReducers';
import { ConceptoVentaReducer } from './comercio/venta/conceptoVentaReducers';
import { ClienteReducer } from './comercio/venta/clienteReducers';
import { ComisionVentaReducer } from './comercio/venta/comisionVentaReducers';
import { VendedorReducer } from './comercio/venta/vendedorReducers';
import { ActividadEconomicaReducer } from './comercio/venta/actividadEconomicaReducers';
import { DosificacionReducer } from './comercio/venta/dosificacionReducers';
import { NotaVentaReducer } from './comercio/venta/notaVentaReducers';
import { DevolucionNotaVentaReducer } from './comercio/venta/devolucionNotaVentaReducers';

const rootReducer = combineReducers( {
    visible:     VisibleReducer,
    disabled:    DisabledReducer,
    loading:     LoadingReducer,
    paginations: PaginationReducers,

    printOption:   PrintOptionReducer,
    archivoOption: ArhivoOptionReducer,

    ciudadClasificacion: CiudadClasificacionReducer,
    productoTipo:        ProductoTipoReducer,
    ciudad:              CiudadReducer,
    productoGrupo:       ProductoGrupoReducer,
    productoSubGrupo:    ProductoSubGrupoReducer,
    productoMarca:       ProductoMarcaReducer,
    unidadMedida:        UnidadMedidaReducer,
    categoria:           CategoriaReducer,
    almacen:             AlmacenReducer,
    conceptoInventario:  ConceptoInventarioReducer,
    seccionInventario:   SeccionInventarioReducer,
    producto:            ProductoReducer,
    notaIngreso:         NotaIngresoReducer,

    unionSucursal: UnionSucursalReducer,
    sucursal:      SucursalReducer,
    listaPrecio:   ListaPrecioReducer,
    clienteTipo:   ClienteTipoReducer,
    cliente:   ClienteReducer,
    conceptoVenta: ConceptoVentaReducer,
    comisionVenta: ComisionVentaReducer,
    vendedor: VendedorReducer,
    actividadEconomica: ActividadEconomicaReducer,
    dosificacion: DosificacionReducer,

    notaVenta: NotaVentaReducer,
    devolucionNotaVenta: DevolucionNotaVentaReducer,

    proveedorTipo:    ProveedorTipoReducer,
    proveedorGrupo:   ProveedorGrupoReducer,
    proveedorCargo:   ProveedorCargoReducer,
    conceptoCompra:   ConceptoCompraReducer,
    proveedor:        ProveedorReducer,
    solicitudCompra:  SolicitudCompraCompraReducer,
    ordenCompra:      OrdenCompraCompraReducer,
    notaCompra:       NotaCompraCompraReducer,
    devolucionCompra: DevolucionCompraCompraReducer,

    informeCompra: InformeCompraReducer,

    array: ListadoModuleReducer,
} );

export default rootReducer;
