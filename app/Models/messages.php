<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
    use HasFactory;

    protected $fillable =[
    'Text', 
    'Sender_id',
        'Conversion_id'
];

public function conversions (){
    return $this->belongsTo(conversion::class);
}
}
