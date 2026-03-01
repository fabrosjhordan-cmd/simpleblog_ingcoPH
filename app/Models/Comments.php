<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = ['comment', 'post_id', 'user_id', 'user'];


     public function post()
    {
        return $this->belongsTo(\App\Models\Posts::class, 'post_id');
    }
   
}
