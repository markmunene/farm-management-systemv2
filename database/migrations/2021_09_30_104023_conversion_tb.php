<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ConversionTb extends Migration
{
    /**
     * Run the migrations.
     *
     * Conversation_id
Sender_id
Receiver_id

     * @return void
     */
    public function up()
    {
        Schema::create('conversion_tb', function (Blueprint $table) {
            $table->id();
            
            $table->integer("Sender_id");
            $table->integer("Receiver_id");
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
        Schema::dropIfExists('converion_tb');
    }
}
