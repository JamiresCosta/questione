<?php

namespace App\Http\Controllers\Adm;

use App\Course;
use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\Controller;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware(['jwt.auth', 'checkAdm']);
    }

    private $rules = [
        'initials' => 'required|max:8|min:3',
        'description' => 'required|max:50|min:4',

    ];

    private $messages = [
        'initials.required' => 'A SILGA é obrigatória.',
        'initials.max' => 'O máximo de caracteres aceitáveis para a SIGLA é 08.',
        'initials.min' => 'O minímo de caracteres aceitáveis para a SIGLA é 03.',

        'description.required' => 'A DESCRIÇÃO é obrigatório.',
        'description.max' => 'O máximo de alfanuméricos aceitáveis para a DESCRIÇÃO é 50.',
        'description.min' => 'O minímo de alfanuméricos aceitáveis para a DESCRIÇÃO é 04.',

    ];

    public function index()
    {
        $course = Course::orderBy('id')->paginate(10);
        return response()->json($course);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),$this->rules, $this->messages);

        if($validation->fails()){
            return $validation->errors()->toJson();
        }

        $course = new Course();
        $course->initials = $request->initials;
        $course->description = $request->description;
        $course->save();

        return response()->json($course, 201);
    }

    public function show(int $id)
    {
        $course = Course::find($id);

        $this->verifyRecord($course);

        return response()->json($course);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), $this->rules, $this->messages);

        if($validation->fails()){
            return $validation->errors()->toJson();
        }

        $course = Course::find($id);

        $this->verifyRecord($course);

        $course->initials = $request->initials;
        $course->description = $request->description;
        $course->save();


        return response()->json($course);

    }

    public function destroy($id)
    {
        $course = Course::find($id);

        $this->verifyRecord($course);

        $course->delete();

        return response()->json([
            'message' => 'Curso '.$course->description.' excluído!'
        ], 202);
    }

    public function search(Request $request)
    {

        $courses = Course::where('description', 'like', '%'.$request->description.'%')->paginate(10);


        $this->verifyRecord($courses);

        return response()->json($courses, 200);

    }

    public function verifyRecord($record){
        if(!$record || $record == '[]'){
            return response()->json([
                'message' => 'Registro não encontrado.'
            ], 404);
        }
    }
}