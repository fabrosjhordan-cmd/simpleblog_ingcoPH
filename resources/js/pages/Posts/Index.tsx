import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import postsRoute from '@/routes/posts';
import { Plus } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: postsRoute.index(),
    },
];

interface PostsProps {
    id: number,
    created_at: string,
    content: string,
    user: string,
    user_id: number
}

interface PageProps {
    posts: PostsProps[]
}

export default function index() {
    const { posts } = usePage().props as PageProps;
    const postList = posts ?? []
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className='pt-4 pl-4'>
            <Link href={postsRoute.create()} className='text-decoration-none text-reset'>
                <button type="button" className="btn btn-primary d-flex align-items-center gap-2"><span><Plus size={17} /></span> Create</button>
            </Link>
            </div>
            {postList.length > 0 ? (
            <div className="grid grid-cols-2 space-x-4 h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                {postList.map((item, index)=>(
                <Link href={postsRoute.content({post: item.id})} className='text-decoration-none text-reset'>
                    <div key={index} className="card max-h-30 shadow-m hover:scale-102 duration-300 hover:cursor-pointer">
                    <div className="card-body">
                        <div className='text-xl font-bold'>
                            {item.user ? item.user : 'Anonym'}
                        </div>
                        <div className='flex flex-row gap-3 text-xs text-foreground/70 mb-2'>
                            {dayjs(item.created_at).format('MMM, DD, YYYY')}
                            <span>{dayjs(item.created_at).fromNow()}</span>
                        </div>
                        <p className='max-h-5 overflow-hidden text-sm'>
                            {item.content}
                        </p>
                    </div>
                    </div>
                </Link>
                ))}
                </div>) : (<div>No Post</div>)}
        </AppLayout>
    );
}
