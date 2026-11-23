import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    // A <section>, not <main>: the root layout already provides <main>.
    <section className="flex flex-col items-center gap-6 py-12">
      <h1 className="text-3xl font-bold">Sign In</h1>
      {/* LoginForm uses useSearchParams, which needs a Suspense boundary. */}
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
