<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class conversion extends Model
{
    use HasFactory;
   


    protected $fillable  =['Sender_id', 'Receiver_id','conType'];

    public function messages (){
        return $this->hasMany(messages::class);
    }
}
