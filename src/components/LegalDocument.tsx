import type { LegalDocument as LegalDoc } from "../content/legal/types";

type Props = {
  doc: LegalDoc;
  tocLabel: string;
};

export function LegalDocument({ doc, tocLabel }: Props) {
  return (
    <article className="legal-doc">
      <header className="legal-doc__header">
        <h1 className="legal-doc__title">{doc.title}</h1>
        <p className="legal-doc__subtitle">{doc.subtitle}</p>
        <p className="legal-doc__date">{doc.effectiveDate}</p>
        <p className="legal-doc__intro">{doc.intro}</p>
      </header>

      <nav className="legal-doc__toc" aria-label="Table of contents">
        <p className="legal-doc__toc-label">{tocLabel}</p>
        <ol>
          {doc.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="legal-doc__body">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="legal-doc__section">
            <h2>{section.title}</h2>
            {section.blocks.map((block, i) => {
              if (block.type === "p") {
                return <p key={i}>{block.text}</p>;
              }
              if (block.type === "ul") {
                return (
                  <ul key={i}>
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <ol key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ol>
              );
            })}
          </section>
        ))}
      </div>
    </article>
  );
}
