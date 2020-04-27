<?php

namespace App\Http\Controllers\Adm;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['jwt.auth', 'checkAdm']);
    }

    public function index()
    {
        $users = User::where('acess_level', '=', 0)
            ->orderBy('id')->paginate(10);
        return response()->json($users);
    }

    public function show(int $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'message' => 'Registro não encontrado.'
            ], 404);
        }
        return response()->json($user);
    }

    public function search(Request $request)
    {

        $users = User::where('name', 'like', '%'.$request->name.'%')->paginate(10);


        if ($users == '[]') {
            return response()->json([
                'message' => 'Registro não encontrado.'
            ], 404);
        }
        return response()->json($users, 200);

    }

    public function isProfessor(Request $request, $id)
    {
        //Ativa ou desativa o usuário como professor
        $user = User::find($id);

        if($user->is_professor == 0) {
            $user->is_professor = 1;
        } else {
            $user->is_professor = 0;
        }

        $user->save();

        return response()->json($user);

    }
}