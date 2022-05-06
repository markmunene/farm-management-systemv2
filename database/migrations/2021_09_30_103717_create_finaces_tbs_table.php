<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinacesTbsTable extends Migration
{
    /*
     * Run the migrations.
     * Expense_id
Expense_name
Expense_amount
Income_name
Income_amount
User_id

     *
     * @return void
     */
    public function up()
    {
        Schema::create('finances_tb', function (Blueprint $table) {
            $table->id();
            $table->string("Expense_name");
            $table->double("Expense_amount");
            $table->double("Income_amount");
            $table->string("Income_name");
            $table->integer("User_id");
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
        Schema::dropIfExists('finances_tb');
    }
}
