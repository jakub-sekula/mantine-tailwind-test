import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "components/common";
import { useAnimationContext } from "components/contexts";
import SectionContainer from "./SectionContainer";


export default function ToolsSection({ title }) {
  const { sectionEntryAnimation } = useAnimationContext()
  return (
    <SectionContainer title="Tools">
      <div className="relative grid w-full grid-cols-12 gap-12  ">
        <div className="col-span-4 flex flex-col gap-4">
          <SectionHeading title="Frontend" color="red" />
          <div className="grid grid-cols-2 gap-2">
            <ToolCard name="CSS" img="/logos/css.svg" />
            <ToolCard name="HTML" img="/logos/html.svg" />
            <ToolCard name="JavaScript" img="/logos/js.svg" />
            <ToolCard name="React JS" img="/logos/react.svg" />
            <ToolCard name="Next.js" img="/logos/nextjs.svg" />
            <ToolCard name="Tailwind CSS" img="/logos/tailwind.svg" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <SectionHeading title="Backend" color="green" />
          <div className="grid grid-cols-2 gap-2">
            <ToolCard name="Node" img="/logos/nodejs.svg" />
            <ToolCard name="GraphQL" img="/logos/graphql.svg" />
            <ToolCard name="Python" img="/logos/python.svg" />
            <ToolCard name="Flask" img="/logos/flask.svg" />
            <ToolCard name="WordPress" img="/logos/wordpress.svg" />
            <ToolCard name="SQLite" img="/logos/sqlite.svg" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <SectionHeading title="General" color="blue" />
          <div className="grid grid-cols-2 gap-2">
            <ToolCard name="Git" img="/logos/git.svg" />
            <ToolCard name="Linux" img="/logos/linux.svg" />
            <ToolCard name="Arduino" img="/logos/arduino.svg" />
            <ToolCard name="Figma" img="/logos/figma.svg" />
            <ToolCard name="Docker" img="/logos/docker.svg" />
            <ToolCard name="Bash" img="/logos/bash.svg" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function ToolCard({ name, img }) {
  return (
    <div
      className="flex flex-col items-center  justify-center gap-4
    rounded-md border border-neutral-200 px-3 py-6 font-bold"
    >
      <Image src={img} alt={name} width={48} height={48} className="w-16" />
      <h6 className=" text-sm">{name}</h6>
    </div>
  );
}
