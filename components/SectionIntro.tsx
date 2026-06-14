type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionIntro({ eyebrow, title, body, align = "left" }: SectionIntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <p className="text-sm sm:text-base font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-roast border-b-2 border-brass inline-block pb-1">{eyebrow}</p>
      <h2 className="mt-4 sm:mt-8 font-serif text-3xl sm:text-7xl leading-[1.2] text-espresso tracking-tight">{title}</h2>
      {body ? <p className="mt-4 sm:mt-8 text-base sm:text-xl leading-relaxed text-espresso/75 border-l-4 border-brass pl-4 sm:pl-6">{body}</p> : null}
    </div>
  );
}
