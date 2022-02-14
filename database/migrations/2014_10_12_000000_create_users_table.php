<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('idusers');

            $table->integer('x_idusuario')->unsigned()->nullable();
            $table->integer('fkidgrupousuario')->unsigned()->nullable();

            $table->string('nombre', 150);
            $table->string('apellido', 250);

            $table->string('email', 350)->unique();
            $table->timestamp('email_verified_at')->nullable();

            $table->string('login', 350);
            $table->string('password', 250);
            $table->longText('imagen')->nullable();

            $table->text('ip')->nullable();

            $table->integer('intentos')->default(0);
            $table->integer('timewait')->default(0);

            $table->dateTime('lastlogin')->nullable();
            $table->dateTime('lastlogout')->nullable();

            $table->longText('webtoken')->nullable();
            $table->longText('apitoken')->nullable();

            $table->date("x_fecha")->nullable();
            $table->time("x_hora")->nullable();
            $table->enum("isdelete", ["A", "N"])->default("A");
            $table->enum("estado", ["A", "N"])->default("A");

            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
