export default function ExperienceLine({ top, bottom, years }) {
	return (
	  <article className="flex flex-col gap-2">
		<div className="flex justify-between border-b border-neutral-200 pb-1">
		  <h5>{top}</h5>
		  <h6>{years}</h6>
		</div>
		<span className="text-sm font-light">{bottom}</span>
	  </article>
	);
  }
  