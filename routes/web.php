<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\PostController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard', [PostController::class, 'dashboard'])->name('dashboard');
    // Route::inertia('posts', 'Posts/Index')->name('posts.index');
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('content/{post}', [PostController::class, 'contentByUser'])->name('posts.content');
    Route::get('content/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::post('content', [PostController::class, 'content'])->name('posts.store');
    Route::post('content/{post}/comment', [PostController::class, 'comment'])->name('posts.comment');
    Route::delete('content/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::inertia('create', 'Posts/Create')->name('posts.create');
});

require __DIR__.'/settings.php';
