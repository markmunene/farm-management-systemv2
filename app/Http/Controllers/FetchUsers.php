<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\user;

class FetchUsers extends Controller
{
     public function index (){
        $data = user::orderBy('id', 'desc')->get();
        return $data->toJson();
     }
   public function destroy($id)
   {
      $data =   user::where('id', $id)->first();

       $data->delete();
   }

   public function update(Request $request, $id){
$request->validate(['name'=>'required|string',
'email'=>'required|email',
'Location'=>'required',
'phoneNumber' =>'required|',
'IdNumber'=>'required',
'role' =>'required|'
]);

user::where('id',$id)->update([
   'name' => $request->name,
   'email' => $request->email,
   'location' => $request->Location,
   'ID_Number' => $request->IdNumber,
   'Phone_Number' =>$request->phoneNumber,
   'User_Role' => $request->role,
]);
   }


}
