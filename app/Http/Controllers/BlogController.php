<?php

namespace App\Http\Controllers;

use App\Models\blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = blog::orderBy('id', 'desc')->get();

        return $data->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $file = $request->file('FarmBlogImage');
        $imagename = uniqid() . '_' . $request->title . '.' . $file->getClientOriginalExtension();

        $file->move(public_path("uploadedImages"), $imagename);

    

        blog::create([
            'User_id'=> Auth::user()->id,
           
            'Title' => $request->title,
            'description' => $request->description,
            'Image_name' => $imagename,
        
        ]);

        return response()->json($imagename);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = blog::find($id);

        return $post->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        blog::where("id", $id)
            ->update(['Title' => $request->title,
            'description' => $request->description,
            
            ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        $post = blog::where('id', $id)->first();
        // unlink('/uploadedImages/ '.$post->Image_name);
        $post->delete();

       
    }
}
