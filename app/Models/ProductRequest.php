<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductRequest extends Model
{
    use HasFactory;

    protected $fillable =['ProductName', 'Description', 'ApproxPrice', 'Status', 'RequestCreator'];
}
