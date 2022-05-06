<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseTracker extends Model
{

    use HasFactory;

    protected $fillable = [
        'Expense_name',
        'Expense_amount',
        'Income_name',
        'User_id',
        'Income_amount',
        'Description'
    ];
}
