import SkillCard from "@/components/SkillCard";

export default function About() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-slate-700 dark:text-slate-300">
        I&apos;m Daniel Paulino, a BYU-Pathway student studying web development.
        I enjoy building full-stack applications with JavaScript, and I&apos;m
        currently learning Next.js, React, and Tailwind CSS in WDD 430.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Skills</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <SkillCard
          name="HTML & CSS"
          level="Intermediate"
          description="Semantic, accessible, and responsive page layouts."
        />
        <SkillCard
          name="JavaScript"
          level="Intermediate"
          description="DOM manipulation, data fetching, and Node.js with EJS."
        />
        <SkillCard
          name="React & Next.js"
          level="Beginner"
          description="Server Components, file-based routing, and Tailwind CSS."
        />
      </div>
    </section>
  );
}