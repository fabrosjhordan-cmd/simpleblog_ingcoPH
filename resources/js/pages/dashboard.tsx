import { Head, Link, usePage } from '@inertiajs/react';
import postsRoute from '@/routes/posts';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: dashboard(),
    },
];

interface Posts  {
    id: number,
    created_at: string,
    content: string,
    user: string,
    user_id: number
}

interface PageProps {
    posts: Posts[]
}

export default function Dashboard() {
    const { posts } = usePage().props as PageProps;
    const postList = posts ?? []
    console.log(posts);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Home" />
            {postList.length > 0 ? (
            <div className="grid grid-cols-2 min-h-[70vh] space-x-4 flex-1 flex-col gap-4 rounded-xl p-4">
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
                </div>
            ) : (<div>No Post</div>)}
        </AppLayout>
    );
}



 {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
    </div>
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    </div> */}