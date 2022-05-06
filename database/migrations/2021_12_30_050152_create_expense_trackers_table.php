<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpenseTrackersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expense_trackers', function (Blueprint $table) {
            $table->id();
            $table->string("Expense_name")->nullable();
            $table->double("Expense_amount")->nullable();
            $table->double("Income_amount")->nullable();
            $table->string("Income_name")->nullable();
            $table->text("Description")->nullable();
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
        Schema::dropIfExists('expense_trackers');
    }
}
