import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import posts from '@/routes/posts';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Post',
        href: posts.create(),
    },
];

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        content: ''
    });
    
    const handleSubmit = (e: React.SubmitEvent) =>{
        e.preventDefault();
        post(posts.store().url);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Post" />
            <div className="relative min-h-[70vh] overflow-auto flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
               <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    {/* Display Error / Success */}
                    {Object.keys(errors).length > 0 && 
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <ul>
                            {Object.entries(errors).map(([key, message])=> (
                                <li key={key}>{message as string}</li>
                            ))}
                        </ul>
                    </div>
                    }
                    <h6>Create a Post</h6>
                    <div className="form-floating">
                        <textarea className="form-control" id="floatingPost" placeholder="What's on your mind?" style={{height: '100px'}} onChange={(e)=> setData('content', e.target.value)} value={data.content}></textarea>
                        <label htmlFor="floatingPost">What's on your mind?</label>
                    </div>
                    <div className='flex flex-row gap-3 justify-end mt-3'>
                        <button onClick={()=>handleSubmit} className='btn btn-primary' disabled={processing}>Post</button>
                        <button type='button' onClick={()=>setData('content', '')} className='btn btn-secondary' disabled={processing}>Cancel</button>
                    </div>
               </form>
            </div>
        </AppLayout>
    );
}
