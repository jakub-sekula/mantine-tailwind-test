import { convertRelativeUrl } from "lib/utils";
import Image from "next/image";

export function ExperienceLine({ entry }) {
  return (
    <article className="flex items-start gap-4">
      {!!entry.image.data ? (
        <Image
          src={convertRelativeUrl(entry.image.data.attributes.url)}
          width={100}
          height={100}
          className="w-10 h-10 rounded-sm object-contain"
        />
      ) : (
        <div className="h-10 w-10 rounded-sm bg-neutral-500" />
      )}
      <div className="w-full">
        <div
          className="flex flex-col-reverse justify-between border-b
        border-neutral-200 pb-1 font-heading text-sm font-light
        dark:border-darktext/5 md:flex-row md:text-base"
        >
          <div className="flex flex-col">
            <h3>{entry.title}</h3>
            <h4 className="font-sans text-sm font-light">
            {entry.years} ∙ {entry.place} 
            </h4>
          </div>
        </div>

        <CVBullets
          bullets={entry.bullets ? entry.bullets : null}
          type={entry.type}
        />
      </div>
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
      <div className="mt-1 font-light text-sm 2xl:text-base leading-relaxed">{entry.bullets}</div>
    </article>
  );
}

import slugify from "slugify";

export function CVBullets({ bullets }) {
  if (!bullets) return;
  return (
    <ul className={`mt-2 flex flex-col font-light text-sm 2xl:text-base leading-relaxed`}>
      {bullets.split("\n").map((bullet) => (
        <li key={`${slugify(bullet)}`}>∙ {bullet}</li>
      ))}
    </ul>
  );
}
