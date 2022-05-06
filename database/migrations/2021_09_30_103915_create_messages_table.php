<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * Message_id
Text
Sender_id
Conversation_id

     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string("Text");
            $table->integer("Sender_id");
            $table->unsignedBigInteger("Conversion_id");
            $table->timestamps();
            $table->foreign("Conversion_id")->references("id")
            ->on("conversion_tb")
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
