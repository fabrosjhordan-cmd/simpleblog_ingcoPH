<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\Comments;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function dashboard(){
        $posts = Posts::all();
        return Inertia::render('dashboard', compact('posts'));
    }
    public function index(){
        $posts = Posts::where('user_id', Auth::id())->get();
        return Inertia::render('Posts/Index', compact('posts'));
    }


    public function create(){
        return Inertia::render('Posts/Create', []);
    }
 
    public function contentByUser(Posts $post){
    $comments = $post->comments()->orderBy('created_at', 'asc')->get();

    return Inertia::render('Posts/Content', [
        'post' => $post,
        'comments' => $post->comments
    ]);
}


    public function edit(Posts $post){
       return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }


    public function comment(Request $request, Posts $post){
        $request->validate([
            'comment' => 'required|string',
        ]);

        Comments::create([
            'comment' => $request->comment,
            'post_id' => $post->id,
            'user_id' => Auth::id(),
            'user' => Auth::user()->name
        ]);

        return redirect()->back();
    }

    public function content(Request $request){
       $request->validate([
        'content' => 'required|string',
       ]);

       Posts::create([
        'content' => $request->content,
        'user_id' => Auth::id(),
        'user' => Auth::user()->name
       ]);
       
       return redirect()->route('posts.index');
    }

    public function destroy(Posts $post){
        $post->delete();
        return redirect()->route('posts.index');
    }
}
