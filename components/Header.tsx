import Link from 'next/link';
import NavLinks from '@/components/NavLinks';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
        <nav className="flex justify-between items-center max-w-4xl mx-auto p-4">
            <Link className="text-xl font-bold" href="/">
                Daniel Paulino
            </Link>
            <NavLinks />
        </nav>
    </header>
  );
}