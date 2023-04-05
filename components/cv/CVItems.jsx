import { convertRelativeUrl } from "lib/utils";
import Image from "next/image";

export function ExperienceLine({ entry, summaryView = false }) {
  return (
    <article className="flex items-start gap-4">
      {!!entry.image?.data ? (
        <Image
          src={convertRelativeUrl(entry.image.data.attributes.url)}
          width={100}
          height={100}
          className="h-10 w-10 rounded-sm object-contain"
        />
      ) : (
        <div className="h-10 w-10 rounded-sm bg-neutral-500" />
      )}
      <div className="w-full">
        <div
          className="flex flex-col-reverse justify-between border-b
         pb-1 font-heading text-sm font-light
         border-text/10 dark:border-darktext/10 md:flex-row md:text-base"
        >
          <div className="flex flex-col">
            <h3>{entry.title}</h3>
            <h4 className="font-sans text-sm font-light">
              {entry.years} ∙ {entry.place}
            </h4>
          </div>
        </div>

        {!summaryView ? (
          <CVBullets
            bullets={entry.bullets ? entry.bullets : null}
            type={entry.type}
          />
        ) : null}
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
      <div className="mt-1 text-sm font-light leading-relaxed 2xl:text-base">
        {entry.bullets}
      </div>
    </article>
  );
}

import slugify from "slugify";

export function CVBullets({ bullets }) {
  if (!bullets) return;
  return (
    <ul
      className={`mt-2 flex flex-col text-sm font-light leading-relaxed 2xl:text-base`}
    >
      {bullets.split("\n").map((bullet) => (
        <li key={`${slugify(bullet)}`}>∙ {bullet}</li>
      ))}
    </ul>
  );
}
