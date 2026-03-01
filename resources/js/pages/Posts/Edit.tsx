import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import posts from '@/routes/posts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Post{
    id: number,
    created_at: string,
    content: string,
    user: string,
    user_id: number
}

interface Props{
    post: Post
}

export default function Edit({post} : Props) {
    const {data, setData, put, processing, errors} = useForm({
        content: post.content
    });

    const handleSubmit = (e: React.SubmitEvent) =>{
        e.preventDefault();
        put(posts.store().url);
    }
    
    return (
        <AppLayout breadcrumbs={[{title:`Edit Post ${post.id}`, href: `/posts/${post.id}/edit`}]}>
            <Head title="Edit Post" />
            
            <div className="relative min-h-[70vh] overflow-auto flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className='flex flex-row justify-between'>
                        <h1>{post.user}</h1>
                        <div className='flex flex-row gap-2'>
                        </div>
                    </div>
                    <div className='flex flex-row gap-12 text-xs text-foreground/70 mb-2'>
                        {dayjs(post.created_at).format('MMM, DD, YYYY')}
                        <span>{dayjs(post.created_at).fromNow()}</span>
                    </div>
                </div>
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
                <div>
                    <h6>Edit a Post</h6>
                    <div className="form-floating">
                        <textarea className="form-control" id="floatingPost" placeholder="Edit Content" style={{height: '100px'}} onChange={(e)=> setData('content', e.target.value)} value={data.content}></textarea>
                        <label htmlFor="floatingPost">Edit Content</label>
                    </div>
                    <div className='flex flex-row gap-3 justify-end mt-3'>
                        <button onClick={()=>handleSubmit} className='btn btn-primary' disabled={processing}>Update</button>
                        <Link href={posts.content(post.id)}>
                            <button type='button' className='btn btn-secondary' disabled={processing}>Back</button>
                        </Link>
                    </div>
                </div>
                </form>
            </div>
        </AppLayout>
    );
}
