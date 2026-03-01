import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {  } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { ArrowDown } from 'lucide-react';
import posts, { content } from '@/routes/posts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: content(),
    },
];

export default function Content() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Content" />
            
            <div className="relative min-h-[70vh] overflow-auto flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1>Author's Name</h1>
                    <p className='text-foreground/65'>Time & Date</p>
                </div>
                <div>
                    <p>
                        Long Message That is Posted by the author.
                    </p>
                </div>
                <div className='relative flex flex-row gap-3 items-center'>
                    <h5>Comments</h5>
                    <p>25</p>
                    <button className='flex flex-row fixed right-0 items-center gap-2'><span><ArrowDown size={15} /></span> Newest</button>
                </div>
                <div className='bg-white border px-4 py-2 rounded-xs mb-4'>
                    <div className='flex flex-row justify-between items-center text-center'>
                        <p className='font-semibold'>Commenter's name</p>
                        <p className='text-xs text-foreground/65'>12:00 PM - 2 hours ago</p>
                    </div>
                    <p className='text-sm ml-4'>Commenter's message</p>
                </div>
                <div className='relative flex flex-col  rounded-md w-full'>
                    <textarea className='bg-foreground/10 p-2 resize-none w-full focus:outline-hidden' placeholder='Send a comment...' />
                    <button className='fixed right-0 bottom-0 py-1 px-3'>Comment</button>
                </div>
            </div>
        </AppLayout>
    );
}
