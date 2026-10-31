interface SkillCardProps {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
}

export default function SkillCard({ name, level, description }: SkillCardProps) {
  return (
    <article className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{name}</h3>
      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
        {level}
      </span>
      {description && <p className="text-slate-700 mt-2">{description}</p>}
    </article>
  );
}
