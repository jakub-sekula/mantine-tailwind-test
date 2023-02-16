export default function SectionHeading({ title, color, className }) {
	const colors = {
	  red: "bg-js-red ",
	  green: "bg-js-green ",
	  blue: " bg-js-blue",
	  yellow: "bg-js-yellow ",
	};
	return (
	  <div className={`flex flex-col ${className}`}>
		<h3 className=" text-xl font-heading font-semibold">{title}</h3>
		<span className={`w-16 h-1 ${colors[color] || "bg-js-yellow"}`} />
	  </div>
	);
  }
  