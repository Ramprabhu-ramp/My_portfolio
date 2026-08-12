interface SectionHeadingProps {
  number: string;
  title: string;
}

export function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-baseline gap-3">
      <span className="font-mono text-sm text-accent">{number}</span>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="ml-4 h-px flex-1 bg-border" />
    </div>
  );
}
