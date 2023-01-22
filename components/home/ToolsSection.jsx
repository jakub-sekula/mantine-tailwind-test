import Link from "next/link";
import { SectionHeading } from "components/common";

export default function ToolsSection({ title }) {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col items-center gap-12 py-12 ">
      <h2
        id="webdev"
        className="font-poppins text-4xl font-bold text-js-yellow"
      >
        {title}
      </h2>
      <div className="relative grid w-full grid-cols-12 gap-12  ">
        <div className="col-span-4 flex flex-col gap-4">
          <SectionHeading title="Frontend" color="red" />
          <div className="grid grid-cols-2 gap-2">
            <ToolCard name="CSS" img="Logos/css.svg" />
            <ToolCard name="HTML" img="Logos/html.svg" />
            <ToolCard name="JavaScript" img="Logos/js.svg" />
            <ToolCard name="React JS" img="Logos/react.svg" />
            <ToolCard name="Next.js" img="Logos/nextjs.svg" />
            <ToolCard name="Tailwind CSS" img="Logos/tailwind.svg" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <SectionHeading title="Backend" color="green" />
          <div className="grid grid-cols-2 gap-2">
            <ToolCard name="Node" img="Logos/nodejs.svg" />
            <ToolCard name="GraphQL" img="Logos/graphql.svg" />
            <ToolCard name="Python" img="Logos/python.svg" />
            <ToolCard name="Flask" img="Logos/flask.svg" />
            <ToolCard name="WordPress" img="Logos/wordpress.svg" />
            <ToolCard name="SQLite" img="Logos/sqlite.svg" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <SectionHeading title="General" color="blue" />
          <div className="grid grid-cols-2 gap-2">
            <ToolCard name="Git" img="Logos/git.svg" />
            <ToolCard name="Linux" img="Logos/linux.svg" />
            <ToolCard name="Arduino" img="Logos/arduino.svg" />
            <ToolCard name="Figma" img="Logos/figma.svg" />
            <ToolCard name="Docker" img="Logos/docker.svg" />
            <ToolCard name="Bash" img="Logos/bash.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ name, img }) {
  return (
    <div
      className="flex flex-col items-center  justify-center gap-4
    rounded-md border border-neutral-200 px-3 py-6 font-bold"
    >
      <img src={img} className=" w-16" />
      <h6 className=" text-sm">{name}</h6>
    </div>
  );
}
