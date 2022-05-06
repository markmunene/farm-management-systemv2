<?php

namespace App\Http\Controllers;

use App\Models\contactUsInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactUsInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = contactUsInfo::orderByDesc('id')->get();
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
        //

        $request->validate([
            
            'subject' => 'required|string|min:5',
            'message' => 'required|string|min:5'

        ]);

        contactUsInfo::create([
            'Name' =>Auth::user()->name,

            'Email' => Auth::user()->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\contactUsInfo  $contactUsInfo
     * @return \Illuminate\Http\Response
     */
    public function show(contactUsInfo $contactUsInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\contactUsInfo  $contactUsInfo
     * @return \Illuminate\Http\Response
     */
    public function edit(contactUsInfo $contactUsInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\contactUsInfo  $contactUsInfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, contactUsInfo $contactUsInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\contactUsInfo  $contactUsInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy(contactUsInfo $contactUsInfo)
    {
        //
        
    }
}
