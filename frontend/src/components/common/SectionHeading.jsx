import slugify from "slugify";

export default function SectionHeading({ title, color, className }) {
	const colors = {
	  red: "bg-js-red ",
	  green: "bg-js-green ",
	  blue: " bg-js-blue",
	  yellow: "bg-js-yellow ",
	};
	return (
	  <div className={`flex flex-col ${className}`}>
		<h2 className="text-xl font-heading font-semibold" id={slugify(title)}>{title}</h2>
		<span className={`w-16 h-0.5 ${colors[color] || "bg-js-yellow"}`} />
	  </div>
	);
  }
  