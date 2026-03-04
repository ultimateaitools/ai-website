import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">404 - Not Found</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
                We couldn&apos;t find the page you were looking for. It might have been removed, renamed, or didn&apos;t exist in the first place.
            </p>
            <Link
                href="/"
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-sm"
            >
                Return Home
            </Link>
        </div>
    );
}
