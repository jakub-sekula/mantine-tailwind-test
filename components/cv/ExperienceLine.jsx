import { CVBullets } from ".";

export function ExperienceLine({ item = {} }) {
  return (
    <article className="flex flex-col">
      {!item.bulletsOnly ? (
        <div className="flex justify-between border-b border-neutral-200 pb-1 font-heading font-light dark:border-darktext/5">
          <div className="flex flex-col">
            <h3>{item.place}</h3>
            <h4 className="font-sans text-sm font-light">{item.title}</h4>
          </div>
          <span>{item.years}</span>
        </div>
      ) : null}

      <CVBullets
        bullets={item.bullets ? item.bullets : null}
        type={item.type}
      />
    </article>
  );
}
