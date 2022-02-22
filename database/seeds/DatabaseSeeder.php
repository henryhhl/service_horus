<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(UsuarioSeeder::class);
        $this->call(ConceptoInventarioSeeder::class);
        $this->call(ConceptoCompraSeeder::class);
        $this->call(ConceptoVentaSeeder::class);
        $this->call(ProveedorSeeder::class);
        $this->call(MonedaSeeder::class);
        $this->call(ListaPrecioSeeder::class);
        $this->call(CiudadClasificacionSeeder::class);
        $this->call(ProductoTipoSeeder::class);
        $this->call(UnidadMedidadSeeder::class);
        $this->call(ProductoMarcaSeeder::class);
        $this->call(CategoriaSeeder::class);
        $this->call(ProductoGrupoSeeder::class);
        $this->call(ProductoSubGrupoSeeder::class);
        $this->call(CiudadSeeder::class);
        $this->call(UnionSucursalSeeder::class);
        $this->call(SucursalSeeder::class);
        $this->call(AlmacenSeeder::class);
        $this->call(ProveedorGrupoSeeder::class);
        $this->call(ProveedorTipoSeeder::class);
        $this->call(SeccionInventarioSeeder::class);
        $this->call(ProveedorCargoSeeder::class);
        $this->call(ClienteTipoSeeder::class);
    }
}
