<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EvaluationHasQuestions extends Model
{
    protected $table = 'evaluation_questions';
    protected $fillable = ['id', 'fk_evaluation_id', 'fk_question_id', 'cancel'];
    protected $hidden = [];

    public function question(){
        return $this->belongsTo(Question::class, 'fk_question_id')
            ->with('course')
            ->with('questionItems')
            ->with('skill')
            ->with('profile')
            ->with('knowledgeObjects')
            ->with('keywords');
    }

    public function questionWithoutCorrect(){
        return $this->belongsTo(Question::class, 'fk_question_id')
            ->with('course')
            ->with('questionItemsWithoutCorrect')
            ->with('skill')
            ->with('profile')
            ->with('knowledgeObjects')
            ->with('keywords');
    }

}
