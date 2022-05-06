<?php

namespace App\Http\Controllers;

use App\Models\productComments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductCommentsController extends Controller
{
    public function index($id)
    {
        //
        $data = productComments::where('Product_id', $id)->orderByDesc('id')->get();
        return $data->toJson();
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
    // protected $fillable = ['comment', 'Product_id'];
        //
        productComments::create([
        'comment'=> $request->comment,
        'rating'=>$request->rating,
        'userId' => Auth::user()->id,
        'Product_id' => $request->Product_id
        ]);
    }

   
    public function show(productComments $productComments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\productComments  $productComments
     * @return \Illuminate\Http\Response
     */
    public function edit(productComments $productComments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\productComments  $productComments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, productComments $productComments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\productComments  $productComments
     * @return \Illuminate\Http\Response
     */
    public function destroy(productComments $productComments)
    {
        //
    }
}
