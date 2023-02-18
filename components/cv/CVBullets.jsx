import slugify from "slugify";

export function CVBullets({ bullets, type }) {
	if (!bullets) return;
	if (type !== "inline") {
	  return (
		<ul className={`mt-2 flex flex-col font-light`}>
		  {bullets.map((bullet) => (
			<li key={`${slugify(bullet)}`}>∙ {bullet}</li>
		  ))}
		</ul>
	  );
	}
	return <div className="font-light">{bullets.join(", ")}</div>;
  }
  