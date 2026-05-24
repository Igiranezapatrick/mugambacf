type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionIntro({ eyebrow, title, body, align = "left" }: SectionIntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-roast">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-espresso sm:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-8 text-espresso/70">{body}</p> : null}
    </div>
  );
}
