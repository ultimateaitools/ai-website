import React from 'react';
import Link from 'next/link';
import { Segment } from '@/lib/data';

interface Props {
    segment: Segment;
}

export default function SegmentCard({ segment }: Props) {
    return (
        <Link href={`/category/${segment.slug}/`} className="block">
            <div className="glass-card p-5 group flex items-center justify-between hover:-translate-y-1 transition-transform duration-300">
                <h4 className="font-medium text-gray-200 group-hover:text-neon-blue group-hover:text-glow transition-colors">
                    {segment.name}
                </h4>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-neon-purple transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </Link>
    );
}
