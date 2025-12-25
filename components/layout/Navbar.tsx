import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-[#fffdf9] px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
                    Porto<span className="text-[#FF90E8]">Folio</span>
                </Link>
                <div className="hidden space-x-8 md:flex font-bold">
                    <Link href="/projects" className="hover:underline decoration-4 underline-offset-4">Projects</Link>
                    <Link href="/blog" className="hover:underline decoration-4 underline-offset-4">Blog</Link>
                    <Link href="/about" className="hover:underline decoration-4 underline-offset-4">About</Link>
                </div>
                <Button variant="accent" size="sm" className="hidden md:flex">
                    Contact Me
                </Button>
            </div>
        </nav>
    );
}
