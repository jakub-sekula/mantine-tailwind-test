import { ToolCard } from "@components/common";
import { SectionHeading } from "@components/common";
import SectionContainer from "./SectionContainer";

export default function ToolsSection({ toolCollections }) {
  return (
    <SectionContainer title="Skills">
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12">
        {toolCollections.map((collection, index) => (
          <div
            key={`${collection.attributes.title}-section`}
            className="reveal fade-bottom col-span-full flex flex-col
            gap-4 md:col-span-4 "
            style={{
              animationDelay: `${200 * index}ms`,
              transitionDelay: `${200 * index}ms`,
            }}
          >
            <SectionHeading
              title={collection.attributes.title}
              color={collection.attributes.color}
            />
            <div className="grid grid-cols-2 gap-2 ">
              {collection.attributes.tools.data.map((tool) => (
                <ToolCard tool={tool} key={`${tool.attributes.name}-card`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
