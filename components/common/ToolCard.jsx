import Image from "next/image";

export default function ToolCard({ tool, ...props }) {
  return (
    <div
      className={`rounded-card flex flex-col items-center justify-center gap-4
	 px-3 py-6 font-bold dark:bg-darktext/[1%]  ${props.className}`}
    >
      <Image
        src={
          !!tool.attributes.icon_light.data
            ? `${process.env.NEXT_PUBLIC_API_URL}${tool.attributes.icon_light.data?.attributes.url}`
            : "/logos/css.svg"
        }
        alt={tool.attributes.name}
        width={48}
        height={48}
        className="w-16"
      />
      <h6 className=" text-sm">{tool.attributes.name}</h6>
    </div>
  );
}
