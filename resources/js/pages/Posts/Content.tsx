import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash } from 'lucide-react';
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


interface Comment {
    id: number,
    comment: string,
    post_id: number,
    user: string,
    user_id: number,
    created_at: string
}

interface Props{
    post: Post,
    comments: Comment[]
}

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
        } | null;
    };
}



export default function Content({post, comments} : Props) {
    const { auth } = usePage().props as PageProps;
    const {processing, delete: destroy} =useForm();
    const {data, setData, processing: loading, post: commenting, errors} = useForm({
        post_id: post.id,
        comment: ''
    });

    const handleDelete = (id: number) =>{
    if(confirm(`Do you want to delete this post?`)){
        destroy(`/content/${id}`);
    }
    }

    const handleComment = (e: React.SubmitEvent)=> {
        e.preventDefault();
        commenting(posts.comment(post.id).url);
    }
    
    return (
        <AppLayout breadcrumbs={[{title:`Content Post ${post.id}`, href: `/posts/${post.id}`}]}>
            <Head title="Content" />
            
            <div className="relative min-h-[70vh] overflow-auto flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className='flex flex-row justify-between'>
                        <h1>{post.user}</h1>
                        {auth.user?.id === post.user_id && (
                    <div className='flex flex-row gap-2 items-center'>
                            <Link disabled={processing} className='' href={posts.edit({post: post.id})}>
                            <button disabled={processing} className='btn'><Pencil size={20} /></button>
                            </Link>
                            <button disabled={processing} onClick={()=>handleDelete(post.id)} className='btn'><Trash size={20} /></button>
                    </div>)}
                    </div>
                    <div className='flex flex-row gap-12 text-xs text-foreground/70 mb-2'>
                        {dayjs(post.created_at).format('MMM, DD, YYYY')}
                        <span>{dayjs(post.created_at).fromNow()}</span>
                    </div>
                </div>
                <div>
                    <p>
                        {post.content}
                    </p>
                </div>
                <div className='relative flex flex-row gap-3 items-center'>
                    <h5>Comments</h5>
                    {<p>{comments?.length ?? 0}</p>}
                    {/* <button className='flex flex-row fixed right-0 items-center gap-2'><span><ArrowDown size={15} /></span> Newest</button> */}
                </div>
                <form onSubmit={handleComment}>
                    <div className=' max-w-[173vh] mb-12 flex flex-col gap-2 rounded-md w-full'>
                        <textarea className="form-control" placeholder="Comment..." style={{height: '100px'}} onChange={(e)=>setData('comment', e.target.value)} value={data.comment}></textarea>
                        <button className='py-1 px-3 btn btn-primary'>Comment</button>
                    </div>
                </form>
                {comments.map((comment, index)=>(
                    <div key={index} className='bg-white border px-4 py-2 rounded-xs mb-4'>
                    <div className='flex flex-row justify-between items-center text-center'>
                        <div className='flex flex-col items-start'>
                            <p className='font-semibold'>{comment.user}</p>
                            <p className='text-xs text-foreground/65'>{dayjs(comment.created_at).format('MMM, DD YYYY')}</p>
                        </div>

                        <p className='text-xs text-foreground/65'>{dayjs(comment.created_at).fromNow()}</p>
                    </div>
                    <p className='text-sm ml-4'>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
