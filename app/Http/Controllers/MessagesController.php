<?php

namespace App\Http\Controllers;

use App\Models\messages;
use Illuminate\Http\Request;
use App\Models\conversion;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetchConvs (){


        $data = conversion::where('Sender_id', Auth::user()->id ) ->orWhere('Receiver_id', Auth::user()->id)
        ->orderBy('id', 'desc')->get();

        return $data->toJson();
    }
 


//  protected $fillable  =['Sender_id', 'Receiver_id'];

    public function storeConvs(Request $request){
        $request->validate([
            'Sender_id' => 'required|numeric',
            'Receiver_id' => 'required|numeric',
           
        ]);

       

            conversion::create([
                'Sender_id' => $request->Sender_id,
                'Receiver_id' => $request->Receiver_id,
            'conType' => $request->conType

            ]);
    }
public function deleteConversion($id){
    $con = conversion::where('id', $id);
    $con->delete();
}
    public function index()
    {
     $data =   messages::orderby('id', 'asc')->get();

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
     * 
     *    
     */
    public function store(Request $request)
    {
        messages::create([
            'Text' => $request->text,
            'Sender_id'=> Auth::user()->id,
            "Conversion_id" => $request->Conversation_id

        ]);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function show(messages $messages)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = messages::where('Conversion_id', $id)->orderBy('id', 'desc')->get();
        return $data->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, messages $messages)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function destroy(messages $messages)
    {
        //
    }
}
