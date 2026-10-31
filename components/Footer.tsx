export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto p-4 text-center">
            <p>Copyright &copy; {new Date().getFullYear()} Daniel Paulino. All rights reserved.</p>
        </div>
    </footer>
  );
}