import Image from "next/image";

import { SectionHeading } from "components/common";
import SectionContainer from "./SectionContainer";

export default function ToolsSection({ tools }) {
  return (
    <SectionContainer title="Tools">
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12">
        {tools.map((category) => (
          <div
            key={`${category.attributes.title}-section`}
            className="col-span-full flex flex-col gap-4 md:col-span-4"
          >
            <SectionHeading
              title={category.attributes.title}
              color={category.attributes.color}
            />
            <div className="grid grid-cols-2 gap-2 ">
              {category.attributes.tools.map((tool) => (
                <ToolCard
                  name={tool.name}
                  key={`${tool.name}-card`}
                  img={
                    !!tool.icon_light.data
                      ? `${process.env.NEXT_PUBLIC_API_URL}${tool.icon_light.data?.attributes.url}`
                      : "/logos/css.svg"
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

function ToolCard({ name, img }) {
  return (
    <div
      className="flex flex-col  items-center justify-center gap-4 rounded-md
    border border-text/10 px-3 py-6 font-bold dark:border-darktext/10 dark:bg-darktext/[1%]"
    >
      <Image src={img} alt={name} width={48} height={48} className="w-16" />
      <h6 className=" text-sm">{name}</h6>
    </div>
  );
}
