<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

$modulecomercio = '/comercio';
$submodulocomercioinventario    = $modulecomercio . '/inventario';
$submodulocomerciocompra        = $modulecomercio . '/compra';
$submodulocomercioventa         = $modulecomercio . '/venta';

$modulecontabilidad = '/contabilidad';

$moduleconfiguracion = '/configuracion';

Route::get($moduleconfiguracion  . '/moneda/index', 'Configuracion\MonedaController@index');
Route::get($moduleconfiguracion  . '/moneda/create', 'Configuracion\MonedaController@create');
Route::get($moduleconfiguracion  . '/moneda/editar/{idmoneda}', 'Configuracion\MonedaController@edit');
Route::post($moduleconfiguracion . '/moneda/store', 'Configuracion\MonedaController@store');
Route::post($moduleconfiguracion . '/moneda/update', 'Configuracion\MonedaController@update');
Route::get($moduleconfiguracion  . '/moneda/show/{idmoneda}', 'Configuracion\MonedaController@show');
Route::post($moduleconfiguracion . '/moneda/delete', 'Configuracion\MonedaController@delete');
Route::get($moduleconfiguracion  . '/moneda/searchByID', 'Configuracion\MonedaController@searchByID');
Route::post($moduleconfiguracion . '/moneda/reporte', 'Configuracion\MonedaController@reporte');

Route::get($submodulocomercioinventario  . '/ciudadclasificacion/index', 'Comercio\Inventario\CiudadClasificacionController@index');
Route::get($submodulocomercioinventario  . '/ciudadclasificacion/create', 'Comercio\Inventario\CiudadClasificacionController@create');
Route::get($submodulocomercioinventario  . '/ciudadclasificacion/editar/{id}', 'Comercio\Inventario\CiudadClasificacionController@edit');
Route::post($submodulocomercioinventario . '/ciudadclasificacion/store', 'Comercio\Inventario\CiudadClasificacionController@store');
Route::post($submodulocomercioinventario . '/ciudadclasificacion/update', 'Comercio\Inventario\CiudadClasificacionController@update');
Route::get($submodulocomercioinventario  . '/ciudadclasificacion/show/{id}', 'Comercio\Inventario\CiudadClasificacionController@show');
Route::post($submodulocomercioinventario . '/ciudadclasificacion/delete', 'Comercio\Inventario\CiudadClasificacionController@delete');
Route::get($submodulocomercioinventario  . '/ciudadclasificacion/searchByID', 'Comercio\Inventario\CiudadClasificacionController@searchByID');
Route::post($submodulocomercioinventario . '/ciudadclasificacion/reporte', 'Comercio\Inventario\CiudadClasificacionController@reporte');

Route::get($submodulocomercioinventario  . '/ciudad/index', 'Comercio\Inventario\CiudadController@index');
Route::get($submodulocomercioinventario  . '/ciudad/create', 'Comercio\Inventario\CiudadController@create');
Route::get($submodulocomercioinventario  . '/ciudad/editar/{idciudad}', 'Comercio\Inventario\CiudadController@edit');
Route::post($submodulocomercioinventario . '/ciudad/store', 'Comercio\Inventario\CiudadController@store');
Route::post($submodulocomercioinventario . '/ciudad/update', 'Comercio\Inventario\CiudadController@update');
Route::get($submodulocomercioinventario  . '/ciudad/show/{idciudad}', 'Comercio\Inventario\CiudadController@show');
Route::post($submodulocomercioinventario . '/ciudad/delete', 'Comercio\Inventario\CiudadController@delete');
Route::get($submodulocomercioinventario  . '/ciudad/searchByID', 'Comercio\Inventario\CiudadController@searchByID');
Route::post($submodulocomercioinventario . '/ciudad/reporte', 'Comercio\Inventario\CiudadController@reporte');

Route::get($submodulocomercioinventario  . '/seccioninventario/index', 'Comercio\Inventario\SeccionInventarioController@index');
Route::get($submodulocomercioinventario  . '/seccioninventario/create', 'Comercio\Inventario\SeccionInventarioController@create');
Route::get($submodulocomercioinventario  . '/seccioninventario/editar/{idseccioninventario}', 'Comercio\Inventario\SeccionInventarioController@edit');
Route::post($submodulocomercioinventario . '/seccioninventario/store', 'Comercio\Inventario\SeccionInventarioController@store');
Route::post($submodulocomercioinventario . '/seccioninventario/update', 'Comercio\Inventario\SeccionInventarioController@update');
Route::get($submodulocomercioinventario  . '/seccioninventario/show/{idseccioninventario}', 'Comercio\Inventario\SeccionInventarioController@show');
Route::post($submodulocomercioinventario . '/seccioninventario/delete', 'Comercio\Inventario\SeccionInventarioController@delete');
Route::get($submodulocomercioinventario  . '/seccioninventario/searchByID', 'Comercio\Inventario\SeccionInventarioController@searchByID');
Route::post($submodulocomercioinventario . '/seccioninventario/reporte', 'Comercio\Inventario\SeccionInventarioController@reporte');

Route::get($submodulocomercioinventario  . '/productotipo/index', 'Comercio\Inventario\ProductoTipoController@index');
Route::get($submodulocomercioinventario  . '/productotipo/create', 'Comercio\Inventario\ProductoTipoController@create');
Route::get($submodulocomercioinventario  . '/productotipo/editar/{id}', 'Comercio\Inventario\ProductoTipoController@edit');
Route::post($submodulocomercioinventario . '/productotipo/store', 'Comercio\Inventario\ProductoTipoController@store');
Route::post($submodulocomercioinventario . '/productotipo/update', 'Comercio\Inventario\ProductoTipoController@update');
Route::get($submodulocomercioinventario  . '/productotipo/show/{id}', 'Comercio\Inventario\ProductoTipoController@show');
Route::post($submodulocomercioinventario . '/productotipo/delete', 'Comercio\Inventario\ProductoTipoController@delete');
Route::get($submodulocomercioinventario  . '/productotipo/searchByID', 'Comercio\Inventario\ProductoTipoController@searchByID');
Route::post($submodulocomercioinventario . '/productotipo/reporte', 'Comercio\Inventario\ProductoTipoController@reporte');

Route::get($submodulocomercioinventario  . '/productomarca/index', 'Comercio\Inventario\ProductoMarcaController@index');
Route::get($submodulocomercioinventario  . '/productomarca/create', 'Comercio\Inventario\ProductoMarcaController@create');
Route::get($submodulocomercioinventario  . '/productomarca/editar/{id}', 'Comercio\Inventario\ProductoMarcaController@edit');
Route::post($submodulocomercioinventario . '/productomarca/store', 'Comercio\Inventario\ProductoMarcaController@store');
Route::post($submodulocomercioinventario . '/productomarca/update', 'Comercio\Inventario\ProductoMarcaController@update');
Route::get($submodulocomercioinventario  . '/productomarca/show/{id}', 'Comercio\Inventario\ProductoMarcaController@show');
Route::post($submodulocomercioinventario . '/productomarca/delete', 'Comercio\Inventario\ProductoMarcaController@delete');
Route::get($submodulocomercioinventario  . '/productomarca/searchByID', 'Comercio\Inventario\ProductoMarcaController@searchByID');
Route::post($submodulocomercioinventario . '/productomarca/reporte', 'Comercio\Inventario\ProductoMarcaController@reporte');

Route::get($submodulocomercioinventario  . '/categoria/index', 'Comercio\Inventario\CategoriaController@index');
Route::get($submodulocomercioinventario  . '/categoria/create', 'Comercio\Inventario\CategoriaController@create');
Route::get($submodulocomercioinventario  . '/categoria/editar/{id}', 'Comercio\Inventario\CategoriaController@edit');
Route::post($submodulocomercioinventario . '/categoria/store', 'Comercio\Inventario\CategoriaController@store');
Route::post($submodulocomercioinventario . '/categoria/update', 'Comercio\Inventario\CategoriaController@update');
Route::get($submodulocomercioinventario  . '/categoria/show/{id}', 'Comercio\Inventario\CategoriaController@show');
Route::post($submodulocomercioinventario . '/categoria/delete', 'Comercio\Inventario\CategoriaController@delete');
Route::get($submodulocomercioinventario  . '/categoria/searchByID', 'Comercio\Inventario\CategoriaController@searchByID');
Route::post($submodulocomercioinventario . '/categoria/reporte', 'Comercio\Inventario\CategoriaController@reporte');

Route::get($submodulocomercioinventario  . '/unidadmedida/index', 'Comercio\Inventario\UnidadMedidaController@index');
Route::get($submodulocomercioinventario  . '/unidadmedida/create', 'Comercio\Inventario\UnidadMedidaController@create');
Route::get($submodulocomercioinventario  . '/unidadmedida/editar/{id}', 'Comercio\Inventario\UnidadMedidaController@edit');
Route::post($submodulocomercioinventario . '/unidadmedida/store', 'Comercio\Inventario\UnidadMedidaController@store');
Route::post($submodulocomercioinventario . '/unidadmedida/update', 'Comercio\Inventario\UnidadMedidaController@update');
Route::get($submodulocomercioinventario  . '/unidadmedida/show/{id}', 'Comercio\Inventario\UnidadMedidaController@show');
Route::post($submodulocomercioinventario . '/unidadmedida/delete', 'Comercio\Inventario\UnidadMedidaController@delete');
Route::get($submodulocomercioinventario  . '/unidadmedida/searchByID', 'Comercio\Inventario\UnidadMedidaController@searchByID');
Route::post($submodulocomercioinventario . '/unidadmedida/reporte', 'Comercio\Inventario\UnidadMedidaController@reporte');

Route::get($submodulocomercioinventario  . '/productogrupo/index', 'Comercio\Inventario\ProductoGrupoController@index');
Route::get($submodulocomercioinventario  . '/productogrupo/create', 'Comercio\Inventario\ProductoGrupoController@create');
Route::get($submodulocomercioinventario  . '/productogrupo/editar/{id}', 'Comercio\Inventario\ProductoGrupoController@edit');
Route::post($submodulocomercioinventario . '/productogrupo/store', 'Comercio\Inventario\ProductoGrupoController@store');
Route::post($submodulocomercioinventario . '/productogrupo/update', 'Comercio\Inventario\ProductoGrupoController@update');
Route::get($submodulocomercioinventario  . '/productogrupo/show/{id}', 'Comercio\Inventario\ProductoGrupoController@show');
Route::post($submodulocomercioinventario . '/productogrupo/delete', 'Comercio\Inventario\ProductoGrupoController@delete');
Route::get($submodulocomercioinventario  . '/productogrupo/searchByID', 'Comercio\Inventario\ProductoGrupoController@searchByID');
Route::post($submodulocomercioinventario . '/productogrupo/reporte', 'Comercio\Inventario\ProductoGrupoController@reporte');

Route::get($submodulocomercioinventario  . '/productosubgrupo/index', 'Comercio\Inventario\ProductoSubGrupoController@index');
Route::get($submodulocomercioinventario  . '/productosubgrupo/create', 'Comercio\Inventario\ProductoSubGrupoController@create');
Route::get($submodulocomercioinventario  . '/productosubgrupo/editar/{id}', 'Comercio\Inventario\ProductoSubGrupoController@edit');
Route::post($submodulocomercioinventario . '/productosubgrupo/store', 'Comercio\Inventario\ProductoSubGrupoController@store');
Route::post($submodulocomercioinventario . '/productosubgrupo/update', 'Comercio\Inventario\ProductoSubGrupoController@update');
Route::get($submodulocomercioinventario  . '/productosubgrupo/show/{id}', 'Comercio\Inventario\ProductoSubGrupoController@show');
Route::post($submodulocomercioinventario . '/productosubgrupo/delete', 'Comercio\Inventario\ProductoSubGrupoController@delete');
Route::get($submodulocomercioinventario  . '/productosubgrupo/searchByID', 'Comercio\Inventario\ProductoSubGrupoController@searchByID');
Route::post($submodulocomercioinventario . '/productosubgrupo/reporte', 'Comercio\Inventario\ProductoSubGrupoController@reporte');

Route::get($submodulocomercioinventario  . '/conceptoinventario/index', 'Comercio\Inventario\ConceptoInventarioController@index');
Route::get($submodulocomercioinventario  . '/conceptoinventario/create', 'Comercio\Inventario\ConceptoInventarioController@create');
Route::get($submodulocomercioinventario  . '/conceptoinventario/editar/{idconceptoinventario}', 'Comercio\Inventario\ConceptoInventarioController@edit');
Route::post($submodulocomercioinventario . '/conceptoinventario/store', 'Comercio\Inventario\ConceptoInventarioController@store');
Route::post($submodulocomercioinventario . '/conceptoinventario/update', 'Comercio\Inventario\ConceptoInventarioController@update');
Route::get($submodulocomercioinventario  . '/conceptoinventario/show/{idconceptoinventario}', 'Comercio\Inventario\ConceptoInventarioController@show');
Route::post($submodulocomercioinventario . '/conceptoinventario/delete', 'Comercio\Inventario\ConceptoInventarioController@delete');
Route::get($submodulocomercioinventario  . '/conceptoinventario/searchByID', 'Comercio\Inventario\ConceptoInventarioController@searchByID');
Route::post($submodulocomercioinventario . '/conceptoinventario/reporte', 'Comercio\Inventario\ConceptoInventarioController@reporte');

Route::get($submodulocomercioinventario  . '/almacen/index', 'Comercio\Inventario\AlmacenController@index');
Route::get($submodulocomercioinventario  . '/almacen/create', 'Comercio\Inventario\AlmacenController@create');
Route::get($submodulocomercioinventario  . '/almacen/editar/{idalmacen}', 'Comercio\Inventario\AlmacenController@edit');
Route::post($submodulocomercioinventario . '/almacen/store', 'Comercio\Inventario\AlmacenController@store');
Route::post($submodulocomercioinventario . '/almacen/update', 'Comercio\Inventario\AlmacenController@update');
Route::get($submodulocomercioinventario  . '/almacen/show/{idalmacen}', 'Comercio\Inventario\AlmacenController@show');
Route::post($submodulocomercioinventario . '/almacen/delete', 'Comercio\Inventario\AlmacenController@delete');
Route::get($submodulocomercioinventario  . '/almacen/searchByID', 'Comercio\Inventario\AlmacenController@searchByID');
Route::post($submodulocomercioinventario . '/almacen/reporte', 'Comercio\Inventario\AlmacenController@reporte');

Route::get($submodulocomercioinventario  . '/producto/index', 'Comercio\Inventario\ProductoController@index');
Route::get($submodulocomercioinventario  . '/producto/create', 'Comercio\Inventario\ProductoController@create');
Route::get($submodulocomercioinventario  . '/producto/editar/{idproducto}', 'Comercio\Inventario\ProductoController@edit');
Route::post($submodulocomercioinventario . '/producto/store', 'Comercio\Inventario\ProductoController@store');
Route::post($submodulocomercioinventario . '/producto/update', 'Comercio\Inventario\ProductoController@update');
Route::get($submodulocomercioinventario  . '/producto/show/{idproducto}', 'Comercio\Inventario\ProductoController@show');
Route::post($submodulocomercioinventario . '/producto/delete', 'Comercio\Inventario\ProductoController@delete');
Route::get($submodulocomercioinventario  . '/producto/searchByID', 'Comercio\Inventario\ProductoController@searchByID');
Route::post($submodulocomercioinventario . '/producto/reporte', 'Comercio\Inventario\ProductoController@reporte');

Route::get($submodulocomercioinventario  . '/unidadmedidaproducto/index', 'Comercio\Inventario\UnidadMedidaProductoController@index');
Route::get($submodulocomercioinventario  . '/almacenunidadmedidaproducto/index', 'Comercio\Inventario\AlmacenUnidadMedidaProductoController@index');
Route::get($submodulocomercioinventario  . '/almacenproductodetalle/index', 'Comercio\Inventario\AlmacenProductoDetalleController@index');

Route::get($submodulocomercioinventario  . '/notaingreso/index', 'Comercio\Inventario\NotaIngresoController@index');
Route::get($submodulocomercioinventario  . '/notaingreso/create', 'Comercio\Inventario\NotaIngresoController@create');
Route::get($submodulocomercioinventario  . '/notaingreso/editar/{idnotaingreso}', 'Comercio\Inventario\NotaIngresoController@edit');
Route::post($submodulocomercioinventario . '/notaingreso/store', 'Comercio\Inventario\NotaIngresoController@store');
Route::post($submodulocomercioinventario . '/notaingreso/update', 'Comercio\Inventario\NotaIngresoController@update');
Route::get($submodulocomercioinventario  . '/notaingreso/show/{idnotaingreso}', 'Comercio\Inventario\NotaIngresoController@show');
Route::post($submodulocomercioinventario . '/notaingreso/delete', 'Comercio\Inventario\NotaIngresoController@delete');
Route::get($submodulocomercioinventario  . '/notaingreso/searchByID', 'Comercio\Inventario\NotaIngresoController@searchByID');
Route::post($submodulocomercioinventario . '/notaingreso/reporte', 'Comercio\Inventario\NotaIngresoController@reporte');



Route::get($submodulocomercioventa  . '/unionsucursal/index', 'Comercio\Venta\UnionSucursalController@index');
Route::get($submodulocomercioventa  . '/unionsucursal/create', 'Comercio\Venta\UnionSucursalController@create');
Route::get($submodulocomercioventa  . '/unionsucursal/editar/{idunionsucursal}', 'Comercio\Venta\UnionSucursalController@edit');
Route::post($submodulocomercioventa . '/unionsucursal/store', 'Comercio\Venta\UnionSucursalController@store');
Route::post($submodulocomercioventa . '/unionsucursal/update', 'Comercio\Venta\UnionSucursalController@update');
Route::get($submodulocomercioventa  . '/unionsucursal/show/{idunionsucursal}', 'Comercio\Venta\UnionSucursalController@show');
Route::post($submodulocomercioventa . '/unionsucursal/delete', 'Comercio\Venta\UnionSucursalController@delete');
Route::get($submodulocomercioventa  . '/unionsucursal/searchByID', 'Comercio\Venta\UnionSucursalController@searchByID');
Route::post($submodulocomercioventa . '/unionsucursal/reporte', 'Comercio\Venta\UnionSucursalController@reporte');

Route::get($submodulocomercioventa  . '/sucursal/index', 'Comercio\Venta\SucursalController@index');
Route::get($submodulocomercioventa  . '/sucursal/create', 'Comercio\Venta\SucursalController@create');
Route::get($submodulocomercioventa  . '/sucursal/editar/{idsucursal}', 'Comercio\Venta\SucursalController@edit');
Route::post($submodulocomercioventa . '/sucursal/store', 'Comercio\Venta\SucursalController@store');
Route::post($submodulocomercioventa . '/sucursal/update', 'Comercio\Venta\SucursalController@update');
Route::get($submodulocomercioventa  . '/sucursal/show/{idsucursal}', 'Comercio\Venta\SucursalController@show');
Route::post($submodulocomercioventa . '/sucursal/delete', 'Comercio\Venta\SucursalController@delete');
Route::get($submodulocomercioventa  . '/sucursal/searchByID', 'Comercio\Venta\SucursalController@searchByID');
Route::post($submodulocomercioventa . '/sucursal/reporte', 'Comercio\Venta\SucursalController@reporte');

Route::get($submodulocomercioventa  . '/listaprecio/index', 'Comercio\Venta\ListaPrecioController@index');
Route::get($submodulocomercioventa  . '/listaprecio/create', 'Comercio\Venta\ListaPrecioController@create');
Route::get($submodulocomercioventa  . '/listaprecio/editar/{idlistaprecio}', 'Comercio\Venta\ListaPrecioController@edit');
Route::post($submodulocomercioventa . '/listaprecio/store', 'Comercio\Venta\ListaPrecioController@store');
Route::post($submodulocomercioventa . '/listaprecio/update', 'Comercio\Venta\ListaPrecioController@update');
Route::get($submodulocomercioventa  . '/listaprecio/show/{idlistaprecio}', 'Comercio\Venta\ListaPrecioController@show');
Route::post($submodulocomercioventa . '/listaprecio/delete', 'Comercio\Venta\ListaPrecioController@delete');
Route::get($submodulocomercioventa  . '/listaprecio/searchByID', 'Comercio\Venta\ListaPrecioController@searchByID');
Route::post($submodulocomercioventa . '/listaprecio/reporte', 'Comercio\Venta\ListaPrecioController@reporte');

Route::get($submodulocomercioventa  . '/clientetipo/index', 'Comercio\Venta\ClienteTipoController@index');
Route::get($submodulocomercioventa  . '/clientetipo/create', 'Comercio\Venta\ClienteTipoController@create');
Route::get($submodulocomercioventa  . '/clientetipo/editar/{idclientetipo}', 'Comercio\Venta\ClienteTipoController@edit');
Route::post($submodulocomercioventa . '/clientetipo/store', 'Comercio\Venta\ClienteTipoController@store');
Route::post($submodulocomercioventa . '/clientetipo/update', 'Comercio\Venta\ClienteTipoController@update');
Route::get($submodulocomercioventa  . '/clientetipo/show/{idclientetipo}', 'Comercio\Venta\ClienteTipoController@show');
Route::post($submodulocomercioventa . '/clientetipo/delete', 'Comercio\Venta\ClienteTipoController@delete');
Route::get($submodulocomercioventa  . '/clientetipo/searchByID', 'Comercio\Venta\ClienteTipoController@searchByID');
Route::post($submodulocomercioventa . '/clientetipo/reporte', 'Comercio\Venta\ClienteTipoController@reporte');

Route::get($submodulocomercioventa  . '/cliente/index', 'Comercio\Venta\ClienteController@index');
Route::get($submodulocomercioventa  . '/cliente/create', 'Comercio\Venta\ClienteController@create');
Route::get($submodulocomercioventa  . '/cliente/editar/{idcliente}', 'Comercio\Venta\ClienteController@edit');
Route::post($submodulocomercioventa . '/cliente/store', 'Comercio\Venta\ClienteController@store');
Route::post($submodulocomercioventa . '/cliente/update', 'Comercio\Venta\ClienteController@update');
Route::get($submodulocomercioventa  . '/cliente/show/{idcliente}', 'Comercio\Venta\ClienteController@show');
Route::post($submodulocomercioventa . '/cliente/delete', 'Comercio\Venta\ClienteController@delete');
Route::get($submodulocomercioventa  . '/cliente/searchByID', 'Comercio\Venta\ClienteController@searchByID');
Route::post($submodulocomercioventa . '/cliente/reporte', 'Comercio\Venta\ClienteController@reporte');
Route::post($submodulocomercioventa  . '/cliente/searchByNit', 'Comercio\Venta\ClienteController@searchByNit');

Route::get($submodulocomercioventa  . '/conceptoventa/index', 'Comercio\Venta\ConceptoVentaController@index');
Route::get($submodulocomercioventa  . '/conceptoventa/create', 'Comercio\Venta\ConceptoVentaController@create');
Route::get($submodulocomercioventa  . '/conceptoventa/editar/{idconceptoventa}', 'Comercio\Venta\ConceptoVentaController@edit');
Route::post($submodulocomercioventa . '/conceptoventa/store', 'Comercio\Venta\ConceptoVentaController@store');
Route::post($submodulocomercioventa . '/conceptoventa/update', 'Comercio\Venta\ConceptoVentaController@update');
Route::get($submodulocomercioventa  . '/conceptoventa/show/{idconceptoventa}', 'Comercio\Venta\ConceptoVentaController@show');
Route::post($submodulocomercioventa . '/conceptoventa/delete', 'Comercio\Venta\ConceptoVentaController@delete');
Route::get($submodulocomercioventa  . '/conceptoventa/searchByID', 'Comercio\Venta\ConceptoVentaController@searchByID');
Route::post($submodulocomercioventa . '/conceptoventa/reporte', 'Comercio\Venta\ConceptoVentaController@reporte');

Route::get($submodulocomercioventa  . '/comisionventa/index', 'Comercio\Venta\ComisionVentaController@index');
Route::get($submodulocomercioventa  . '/comisionventa/create', 'Comercio\Venta\ComisionVentaController@create');
Route::get($submodulocomercioventa  . '/comisionventa/editar/{idcomisionventa}', 'Comercio\Venta\ComisionVentaController@edit');
Route::post($submodulocomercioventa . '/comisionventa/store', 'Comercio\Venta\ComisionVentaController@store');
Route::post($submodulocomercioventa . '/comisionventa/update', 'Comercio\Venta\ComisionVentaController@update');
Route::get($submodulocomercioventa  . '/comisionventa/show/{idcomisionventa}', 'Comercio\Venta\ComisionVentaController@show');
Route::post($submodulocomercioventa . '/comisionventa/delete', 'Comercio\Venta\ComisionVentaController@delete');
Route::get($submodulocomercioventa  . '/comisionventa/searchByID', 'Comercio\Venta\ComisionVentaController@searchByID');
Route::post($submodulocomercioventa . '/comisionventa/reporte', 'Comercio\Venta\ComisionVentaController@reporte');

Route::get($submodulocomercioventa  . '/vendedor/index', 'Comercio\Venta\VendedorController@index');
Route::get($submodulocomercioventa  . '/vendedor/create', 'Comercio\Venta\VendedorController@create');
Route::get($submodulocomercioventa  . '/vendedor/editar/{idvendedor}', 'Comercio\Venta\VendedorController@edit');
Route::post($submodulocomercioventa . '/vendedor/store', 'Comercio\Venta\VendedorController@store');
Route::post($submodulocomercioventa . '/vendedor/update', 'Comercio\Venta\VendedorController@update');
Route::get($submodulocomercioventa  . '/vendedor/show/{idvendedor}', 'Comercio\Venta\VendedorController@show');
Route::post($submodulocomercioventa . '/vendedor/delete', 'Comercio\Venta\VendedorController@delete');
Route::get($submodulocomercioventa  . '/vendedor/searchByID', 'Comercio\Venta\VendedorController@searchByID');
Route::post($submodulocomercioventa . '/vendedor/reporte', 'Comercio\Venta\VendedorController@reporte');

Route::get($submodulocomercioventa  . '/actividadeconomica/index', 'Comercio\Venta\ActividadEconomicaController@index');
Route::get($submodulocomercioventa  . '/actividadeconomica/create', 'Comercio\Venta\ActividadEconomicaController@create');
Route::get($submodulocomercioventa  . '/actividadeconomica/editar/{idactividadeconomica}', 'Comercio\Venta\ActividadEconomicaController@edit');
Route::post($submodulocomercioventa . '/actividadeconomica/store', 'Comercio\Venta\ActividadEconomicaController@store');
Route::post($submodulocomercioventa . '/actividadeconomica/update', 'Comercio\Venta\ActividadEconomicaController@update');
Route::get($submodulocomercioventa  . '/actividadeconomica/show/{idactividadeconomica}', 'Comercio\Venta\ActividadEconomicaController@show');
Route::post($submodulocomercioventa . '/actividadeconomica/delete', 'Comercio\Venta\ActividadEconomicaController@delete');
Route::get($submodulocomercioventa  . '/actividadeconomica/searchByID', 'Comercio\Venta\ActividadEconomicaController@searchByID');
Route::post($submodulocomercioventa . '/actividadeconomica/reporte', 'Comercio\Venta\ActividadEconomicaController@reporte');

Route::get($submodulocomercioventa  . '/dosificacion/index', 'Comercio\Venta\DosificacionController@index');
Route::get($submodulocomercioventa  . '/dosificacion/create', 'Comercio\Venta\DosificacionController@create');
Route::get($submodulocomercioventa  . '/dosificacion/editar/{iddosificacion}', 'Comercio\Venta\DosificacionController@edit');
Route::post($submodulocomercioventa . '/dosificacion/store', 'Comercio\Venta\DosificacionController@store');
Route::post($submodulocomercioventa . '/dosificacion/update', 'Comercio\Venta\DosificacionController@update');
Route::get($submodulocomercioventa  . '/dosificacion/show/{iddosificacion}', 'Comercio\Venta\DosificacionController@show');
Route::post($submodulocomercioventa . '/dosificacion/delete', 'Comercio\Venta\DosificacionController@delete');
Route::get($submodulocomercioventa  . '/dosificacion/searchByID', 'Comercio\Venta\DosificacionController@searchByID');
Route::post($submodulocomercioventa . '/dosificacion/reporte', 'Comercio\Venta\DosificacionController@reporte');

Route::get($submodulocomercioventa  . '/notaventa/index', 'Comercio\Venta\NotaVentaController@index');
Route::get($submodulocomercioventa  . '/notaventa/create', 'Comercio\Venta\NotaVentaController@create');
Route::get($submodulocomercioventa  . '/notaventa/editar/{idnotaventa}', 'Comercio\Venta\NotaVentaController@edit');
Route::post($submodulocomercioventa . '/notaventa/store', 'Comercio\Venta\NotaVentaController@store');
Route::post($submodulocomercioventa . '/notaventa/update', 'Comercio\Venta\NotaVentaController@update');
Route::get($submodulocomercioventa  . '/notaventa/show/{idnotaventa}', 'Comercio\Venta\NotaVentaController@show');
Route::post($submodulocomercioventa . '/notaventa/delete', 'Comercio\Venta\NotaVentaController@delete');
Route::get($submodulocomercioventa  . '/notaventa/searchByID', 'Comercio\Venta\NotaVentaController@searchByID');
Route::post($submodulocomercioventa . '/notaventa/reporte', 'Comercio\Venta\NotaVentaController@reporte');

Route::get($submodulocomercioventa  . '/devolucionnotaventa/index', 'Comercio\Venta\DevolucionNotaVentaController@index');
Route::get($submodulocomercioventa  . '/devolucionnotaventa/create', 'Comercio\Venta\DevolucionNotaVentaController@create');
Route::get($submodulocomercioventa  . '/devolucionnotaventa/editar/{iddevolucionnotaventa}', 'Comercio\Venta\DevolucionNotaVentaController@edit');
Route::post($submodulocomercioventa . '/devolucionnotaventa/store', 'Comercio\Venta\DevolucionNotaVentaController@store');
Route::post($submodulocomercioventa . '/devolucionnotaventa/update', 'Comercio\Venta\DevolucionNotaVentaController@update');
Route::get($submodulocomercioventa  . '/devolucionnotaventa/show/{iddevolucionnotaventa}', 'Comercio\Venta\DevolucionNotaVentaController@show');
Route::post($submodulocomercioventa . '/devolucionnotaventa/delete', 'Comercio\Venta\DevolucionNotaVentaController@delete');
Route::get($submodulocomercioventa  . '/devolucionnotaventa/searchByID', 'Comercio\Venta\DevolucionNotaVentaController@searchByID');
Route::post($submodulocomercioventa . '/devolucionnotaventa/reporte', 'Comercio\Venta\DevolucionNotaVentaController@reporte');



Route::get($submodulocomerciocompra  . '/proveedortipo/index', 'Comercio\Compra\ProveedorTipoController@index');
Route::get($submodulocomerciocompra  . '/proveedortipo/create', 'Comercio\Compra\ProveedorTipoController@create');
Route::get($submodulocomerciocompra  . '/proveedortipo/editar/{idproveedortipo}', 'Comercio\Compra\ProveedorTipoController@edit');
Route::post($submodulocomerciocompra . '/proveedortipo/store', 'Comercio\Compra\ProveedorTipoController@store');
Route::post($submodulocomerciocompra . '/proveedortipo/update', 'Comercio\Compra\ProveedorTipoController@update');
Route::get($submodulocomerciocompra  . '/proveedortipo/show/{idproveedortipo}', 'Comercio\Compra\ProveedorTipoController@show');
Route::post($submodulocomerciocompra . '/proveedortipo/delete', 'Comercio\Compra\ProveedorTipoController@delete');
Route::get($submodulocomerciocompra  . '/proveedortipo/searchByID', 'Comercio\Compra\ProveedorTipoController@searchByID');
Route::post($submodulocomerciocompra . '/proveedortipo/reporte', 'Comercio\Compra\ProveedorTipoController@reporte');

Route::get($submodulocomerciocompra  . '/proveedorgrupo/index', 'Comercio\Compra\ProveedorGrupoController@index');
Route::get($submodulocomerciocompra  . '/proveedorgrupo/create', 'Comercio\Compra\ProveedorGrupoController@create');
Route::get($submodulocomerciocompra  . '/proveedorgrupo/editar/{idproveedorgrupo}', 'Comercio\Compra\ProveedorGrupoController@edit');
Route::post($submodulocomerciocompra . '/proveedorgrupo/store', 'Comercio\Compra\ProveedorGrupoController@store');
Route::post($submodulocomerciocompra . '/proveedorgrupo/update', 'Comercio\Compra\ProveedorGrupoController@update');
Route::get($submodulocomerciocompra  . '/proveedorgrupo/show/{idproveedorgrupo}', 'Comercio\Compra\ProveedorGrupoController@show');
Route::post($submodulocomerciocompra . '/proveedorgrupo/delete', 'Comercio\Compra\ProveedorGrupoController@delete');
Route::get($submodulocomerciocompra  . '/proveedorgrupo/searchByID', 'Comercio\Compra\ProveedorGrupoController@searchByID');
Route::post($submodulocomerciocompra . '/proveedorgrupo/reporte', 'Comercio\Compra\ProveedorGrupoController@reporte');

Route::get($submodulocomerciocompra  . '/proveedorcargo/index', 'Comercio\Compra\ProveedorCargoController@index');
Route::get($submodulocomerciocompra  . '/proveedorcargo/create', 'Comercio\Compra\ProveedorCargoController@create');
Route::get($submodulocomerciocompra  . '/proveedorcargo/editar/{idproveedorcargo}', 'Comercio\Compra\ProveedorCargoController@edit');
Route::post($submodulocomerciocompra . '/proveedorcargo/store', 'Comercio\Compra\ProveedorCargoController@store');
Route::post($submodulocomerciocompra . '/proveedorcargo/update', 'Comercio\Compra\ProveedorCargoController@update');
Route::get($submodulocomerciocompra  . '/proveedorcargo/show/{idproveedorcargo}', 'Comercio\Compra\ProveedorCargoController@show');
Route::post($submodulocomerciocompra . '/proveedorcargo/delete', 'Comercio\Compra\ProveedorCargoController@delete');
Route::get($submodulocomerciocompra  . '/proveedorcargo/searchByID', 'Comercio\Compra\ProveedorCargoController@searchByID');
Route::post($submodulocomerciocompra . '/proveedorcargo/reporte', 'Comercio\Compra\ProveedorCargoController@reporte');

Route::get($submodulocomerciocompra  . '/proveedor/index', 'Comercio\Compra\ProveedorController@index');
Route::get($submodulocomerciocompra  . '/proveedor/create', 'Comercio\Compra\ProveedorController@create');
Route::get($submodulocomerciocompra  . '/proveedor/editar/{idproveedor}', 'Comercio\Compra\ProveedorController@edit');
Route::post($submodulocomerciocompra . '/proveedor/store', 'Comercio\Compra\ProveedorController@store');
Route::post($submodulocomerciocompra . '/proveedor/update', 'Comercio\Compra\ProveedorController@update');
Route::get($submodulocomerciocompra  . '/proveedor/show/{idproveedor}', 'Comercio\Compra\ProveedorController@show');
Route::post($submodulocomerciocompra . '/proveedor/delete', 'Comercio\Compra\ProveedorController@delete');
Route::get($submodulocomerciocompra  . '/proveedor/searchByID', 'Comercio\Compra\ProveedorController@searchByID');
Route::post($submodulocomerciocompra . '/proveedor/reporte', 'Comercio\Compra\ProveedorController@reporte');

Route::get($submodulocomerciocompra  . '/conceptocompra/index', 'Comercio\Compra\ConceptoCompraController@index');
Route::get($submodulocomerciocompra  . '/conceptocompra/create', 'Comercio\Compra\ConceptoCompraController@create');
Route::get($submodulocomerciocompra  . '/conceptocompra/editar/{idconceptocompra}', 'Comercio\Compra\ConceptoCompraController@edit');
Route::post($submodulocomerciocompra . '/conceptocompra/store', 'Comercio\Compra\ConceptoCompraController@store');
Route::post($submodulocomerciocompra . '/conceptocompra/update', 'Comercio\Compra\ConceptoCompraController@update');
Route::get($submodulocomerciocompra  . '/conceptocompra/show/{idconceptocompra}', 'Comercio\Compra\ConceptoCompraController@show');
Route::post($submodulocomerciocompra . '/conceptocompra/delete', 'Comercio\Compra\ConceptoCompraController@delete');
Route::get($submodulocomerciocompra  . '/conceptocompra/searchByID', 'Comercio\Compra\ConceptoCompraController@searchByID');
Route::post($submodulocomerciocompra . '/conceptocompra/reporte', 'Comercio\Compra\ConceptoCompraController@reporte');

Route::get($submodulocomerciocompra  . '/solicitudcompra/index', 'Comercio\Compra\SolicitudCompraController@index');
Route::get($submodulocomerciocompra  . '/solicitudcompra/create', 'Comercio\Compra\SolicitudCompraController@create');
Route::get($submodulocomerciocompra  . '/solicitudcompra/editar/{idsolicitudcompra}', 'Comercio\Compra\SolicitudCompraController@edit');
Route::post($submodulocomerciocompra . '/solicitudcompra/store', 'Comercio\Compra\SolicitudCompraController@store');
Route::post($submodulocomerciocompra . '/solicitudcompra/update', 'Comercio\Compra\SolicitudCompraController@update');
Route::get($submodulocomerciocompra  . '/solicitudcompra/show/{idsolicitudcompra}', 'Comercio\Compra\SolicitudCompraController@show');
Route::post($submodulocomerciocompra . '/solicitudcompra/delete', 'Comercio\Compra\SolicitudCompraController@delete');
Route::get($submodulocomerciocompra  . '/solicitudcompra/searchByID', 'Comercio\Compra\SolicitudCompraController@searchByID');
Route::post($submodulocomerciocompra . '/solicitudcompra/reporte', 'Comercio\Compra\SolicitudCompraController@reporte');

Route::get($submodulocomerciocompra  . '/ordencompra/index', 'Comercio\Compra\OrdenCompraController@index');
Route::get($submodulocomerciocompra  . '/ordencompra/create', 'Comercio\Compra\OrdenCompraController@create');
Route::get($submodulocomerciocompra  . '/ordencompra/editar/{idordencompra}', 'Comercio\Compra\OrdenCompraController@edit');
Route::post($submodulocomerciocompra . '/ordencompra/store', 'Comercio\Compra\OrdenCompraController@store');
Route::post($submodulocomerciocompra . '/ordencompra/update', 'Comercio\Compra\OrdenCompraController@update');
Route::get($submodulocomerciocompra  . '/ordencompra/show/{idordencompra}', 'Comercio\Compra\OrdenCompraController@show');
Route::post($submodulocomerciocompra . '/ordencompra/delete', 'Comercio\Compra\OrdenCompraController@delete');
Route::get($submodulocomerciocompra  . '/ordencompra/searchByID', 'Comercio\Compra\OrdenCompraController@searchByID');
Route::post($submodulocomerciocompra . '/ordencompra/reporte', 'Comercio\Compra\OrdenCompraController@reporte');

Route::get($submodulocomerciocompra  . '/notacompra/index', 'Comercio\Compra\NotaCompraController@index');
Route::get($submodulocomerciocompra  . '/notacompra/create', 'Comercio\Compra\NotaCompraController@create');
Route::get($submodulocomerciocompra  . '/notacompra/editar/{idnotacompra}', 'Comercio\Compra\NotaCompraController@edit');
Route::post($submodulocomerciocompra . '/notacompra/store', 'Comercio\Compra\NotaCompraController@store');
Route::post($submodulocomerciocompra . '/notacompra/update', 'Comercio\Compra\NotaCompraController@update');
Route::get($submodulocomerciocompra  . '/notacompra/show/{idnotacompra}', 'Comercio\Compra\NotaCompraController@show');
Route::post($submodulocomerciocompra . '/notacompra/delete', 'Comercio\Compra\NotaCompraController@delete');
Route::get($submodulocomerciocompra  . '/notacompra/searchByID', 'Comercio\Compra\NotaCompraController@searchByID');
Route::post($submodulocomerciocompra . '/notacompra/reporte', 'Comercio\Compra\NotaCompraController@reporte');

Route::get($submodulocomerciocompra  . '/devolucioncompra/index', 'Comercio\Compra\DevolucionCompraController@index');
Route::get($submodulocomerciocompra  . '/devolucioncompra/create', 'Comercio\Compra\DevolucionCompraController@create');
Route::get($submodulocomerciocompra  . '/devolucioncompra/editar/{iddevolucioncompra}', 'Comercio\Compra\DevolucionCompraController@edit');
Route::post($submodulocomerciocompra . '/devolucioncompra/store', 'Comercio\Compra\DevolucionCompraController@store');
Route::post($submodulocomerciocompra . '/devolucioncompra/update', 'Comercio\Compra\DevolucionCompraController@update');
Route::get($submodulocomerciocompra  . '/devolucioncompra/show/{iddevolucioncompra}', 'Comercio\Compra\DevolucionCompraController@show');
Route::post($submodulocomerciocompra . '/devolucioncompra/delete', 'Comercio\Compra\DevolucionCompraController@delete');
Route::get($submodulocomerciocompra  . '/devolucioncompra/searchByID', 'Comercio\Compra\DevolucionCompraController@searchByID');
Route::post($submodulocomerciocompra . '/devolucioncompra/reporte', 'Comercio\Compra\DevolucionCompraController@reporte');

Route::post($submodulocomerciocompra . '/informecompra/notacomprageneral', 'Comercio\Compra\InformeCompraController@notacomprageneral');
