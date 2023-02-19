export function ExperienceLine({ entry }) {
  return (
    <article className="flex flex-col">
      <div
        className="flex flex-col-reverse justify-between border-b
      border-neutral-200 pb-1 font-heading text-sm font-light
      dark:border-darktext/5 md:flex-row md:text-base"
      >
        <div className="flex flex-col">
          <h3>{entry.place}</h3>
          <h4 className="font-sans text-sm font-light">{entry.title}</h4>
        </div>
        <span>{entry.years}</span>
      </div>

      <CVBullets
        bullets={entry.bullets ? entry.bullets : null}
        type={entry.type}
      />
    </article>
  );
}

export function BulletsOnly({ entry }) {
  return (
    <article className="flex flex-col">
      <CVBullets bullets={entry.bullets ? entry.bullets : null} />
    </article>
  );
}

export function InlineList({ entry }) {
  return (
    <article className="flex flex-col">
      <div
        className="flex justify-between border-b border-neutral-200 pb-1
      font-heading font-light dark:border-darktext/5"
      >
        <div className="flex flex-col">
          <h3>{entry.title}</h3>
        </div>
      </div>
      <div className="font-light">{entry.bullets}</div>
    </article>
  );
}

import slugify from "slugify";

export function CVBullets({ bullets }) {
  if (!bullets) return;
  return (
    <ul className={`mt-2 flex flex-col font-light`}>
      {bullets.split("\n").map((bullet) => (
        <li key={`${slugify(bullet)}`}>∙ {bullet}</li>
      ))}
    </ul>
  );
}
