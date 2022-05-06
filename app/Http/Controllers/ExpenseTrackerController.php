<?php

namespace App\Http\Controllers;

use App\Models\ExpenseTracker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ExpenseTrackerController extends Controller
{

    public function index()
    {
        // fetching logged user records
        $data = ExpenseTracker::where('User_id', Auth::user()->id)->orderBy('id', 'desc')->get();
        return $data->toJson();
    }


    public function ExpenseAll()
    {
        //fetching all records
        $data = ExpenseTracker::orderBy('id', 'desc')->get();
        return $data->toJson();
    }
    public function store(Request $request)
    {
        // storing income
        $request->validate([
            'IncomeName' => 'string',
            'Income' =>'required|integer|digits_between:1,10'
        ]);
ExpenseTracker::create([
            'User_id' => Auth::user()->id,
            'Income_name' =>$request->IncomeName,
            'Income_amount' => $request->Income,
            'Description' => $request->Description,
]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ExpenseTracker  $expenseTracker
     * @return \Illuminate\Http\Response
     */
    public function expenseStore( Request  $request)
    {
        //creating expenses
        $request->validate([
            'ExpenseAmount'=>'required|integer|digits_between:1,10',
        ]);
        ExpenseTracker::create([
            'User_id' => Auth::user()->id,
            'Description' => $request->Description,
            'Expense_name' => $request->ExpenseName,
            'Expense_amount' => $request->ExpenseAmount,
]);

    }
    
    public function update(Request $request, ExpenseTracker $expenseTracker)
    {
        //
    }
    public function destroy($id)
    {
        $data = ExpenseTracker::where('id', $id)->first();

        $data->delete();
    }
}
