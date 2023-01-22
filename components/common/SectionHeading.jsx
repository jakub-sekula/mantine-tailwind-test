export default function SectionHeading({ title, color }) {
	const colors = {
	  red: "bg-js-red ",
	  green: "bg-js-green ",
	  blue: " bg-js-blue",
	  yellow: "bg-js-yellow ",
	};
	return (
	  <div className="flex flex-col mb-5">
		<h3 className=" text-2xl font-poppins font-bold">{title}</h3>
		<span className={`w-16 h-1 ${colors[color] || "bg-js-yellow"}`} />
	  </div>
	);
  }
  