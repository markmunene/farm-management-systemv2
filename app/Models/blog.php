<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blog extends Model
{
    use HasFactory;

    /*
    $table->integer("User_id");
            $table->string("Image_name");
            $table->string("Title");
            $table->string("description");
            $table->string("slug");
    */
    protected $fillable =
    [
    'User_id',
    'Image_name',
    'Title', 
    'description',
    'slug',
  
    ];
}
