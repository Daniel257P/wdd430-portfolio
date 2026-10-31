import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
        <nav className="flex justify-between items-center max-w-4xl mx-auto p-4">
            <Link className="text-xl font-bold" href="/">
                Daniel Paulino
            </Link>
            <ul className="flex gap-6">
                <li><Link className="hover:underline" href="/">Home</Link></li>
                <li><Link className="hover:underline" href="/about">About</Link></li>
            </ul>
        </nav>
    </header>
  );
}