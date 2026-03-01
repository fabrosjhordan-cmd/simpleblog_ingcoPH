import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import posts, { content } from '@/routes/posts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: posts.index(),
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="grid grid-cols-2 space-x-4 h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="card h-25 shadow-sm  hover:cursor-pointer hover:scale-102 duration-300">
                <Link href={posts.content()} className='text-decoration-none text-reset'>
                    <div className="card-body">
                        <div className='text-xl font-bold'>
                            Author
                        </div>
                        <div className='text-xs text-foreground/70 mb-2'>
                            Date & time
                        </div>
                        <div>
                            Long Message
                        </div>
                    </div>
                </Link>
                </div>
            </div>
        </AppLayout>
    );
}
