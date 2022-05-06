<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SalesTb extends Migration
{
    /**
     * Run the migrations.
     *
     * Product id
Buyer_id
Farmer_Id

     * @return void
     */
    public function up()
    {
        //
        Schema::create('sales_tb', function (Blueprint $table) {
            $table->id();
            $table->integer("Buyer_id");
            $table->integer("Farmer_Id");
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
        Schema::dropIfExists('sales_tb');
    }
}
