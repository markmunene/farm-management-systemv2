<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class productComments extends Model
{
    use HasFactory;

    protected $table = 'product_Comments';

    protected $fillable = ['comment', 'Product_id', 'rating','userId'];
}
