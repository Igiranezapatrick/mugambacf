type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionIntro({ eyebrow, title, body, align = "left" }: SectionIntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-base font-bold uppercase tracking-[0.25em] text-roast">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-5xl leading-tight text-espresso sm:text-6xl">{title}</h2>
      {body ? <p className="mt-6 text-lg leading-relaxed text-espresso/80">{body}</p> : null}
    </div>
  );
}
