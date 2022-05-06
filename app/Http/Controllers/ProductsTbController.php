<?php

namespace App\Http\Controllers;

use App\Models\products_tb;
use App\Models\ProductImages;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Console\Input\Input;

class ProductsTbController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data = products_tb::orderBy('id', 'desc')->get();
        return $data->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function StoreProductImages(Request $request, $id)
    {
        //

        $imagename = '';
        // foreach ($ as $key => $value) {
        //     # code...
        // }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *   fd.append("image", image);
     if($request->hasfile('filename'))
         {

            foreach($request->file('filename') as $image)
            {
                $name=$image->getClientOriginalName();
                $image->move(public_path().'/images/', $name);  
                $data[] = $name;  
            }
         }
     */
    public function store(Request $request)
    {

        //
        $request->validate([

            'productName' => 'required|min:3|string|',
            'Product_category' => 'numeric|required',
            'Price' => 'required|integer|digits_between:1,5',
            'ProductDesc' => 'required|min:5|string|unique:products_tbs,ProductDesc',

            'Quantity' => 'required|integer|digits_between:1,5',
            'Location' => 'string|required',

        ]);

        products_tb::create([
            'Product_name' => $request->productName,
            // 'Image_name' => $imagename,
            'Product_owner' => Auth::user()->id,
            'Price' => $request->Price,
            'ProductDesc' => $request->ProductDesc,
            'Quantity' => $request->Quantity,
            'Location' => $request->Location,
            'Product_category' => $request->Product_category
        ]);


        if ($request->hasFile('image')) {

            $Product = products_tb::where('Product_name', $request->productName)
                ->where('ProductDesc', $request->ProductDesc)->first();

            foreach ($request->file('image') as  $file) {
                $imagename = uniqid() . '_' . "ProductsImg" . '.' . $file->getClientOriginalExtension();
                $file->move(public_path("uploadedImages"), $imagename);
                ProductImages::create([
                    'ProductId' => $Product->id,
                    'ImageName' => $imagename,
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
        $data = ProductImages::OrderBy('id', 'asc')->get();
        return $data->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    $data = ProductImages::where('ProductId', $id)->get();
return $data->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([

            'productName' => 'required|min:3|string|',
            'Product_category' => 'numeric|required',
            'Price' => 'required|integer|digits_between:1,5',
            'ProductDesc' => 'required|min:5|string',
            'Quantity' => 'required|integer|digits_between:1,5',
            'Location' => 'string|required',

        ]);

        products_tb::where('id', $id)->update([
            'Product_name' => $request->productName,
            'Price' => $request->Price,
            'ProductDesc' => $request->ProductDesc,
            'Quantity' => $request->Quantity,
            'Location' => $request->Location,
            'Product_category' => $request->Product_category
        ]);
        if ($request->hasFile('image')) {

            $Product = products_tb::where('Product_name', $request->productName)
            ->where('ProductDesc', $request->ProductDesc)->first();

            foreach ($request->file('image') as  $file) {
                $imagename = uniqid() . '_' . "ProductsImg" . '.' . $file->getClientOriginalExtension();
                $file->move(public_path("uploadedImages"), $imagename);
                ProductImages::create([
                    'ProductId' => $Product->id,
                    'ImageName' => $imagename,
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = products_tb::where('id', $id);
        $data->delete();
    }
}
