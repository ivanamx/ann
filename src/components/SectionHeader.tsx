type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  titleId?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  titleId,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${align} ${className}`.trim()}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </header>
  );
}
