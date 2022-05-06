<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProductComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      
        Schema::create('product_Comments', function (Blueprint $table) {
            $table->id();
            $table->text("comment")->nullable(true);
            $table ->integer('userId');
            $table->integer('rating')->nullable(true)->default(0) ;

            $table->integer("Product_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::dropIfExists('product_Comments');
        //
    }
}
