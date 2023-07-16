import { ToolCard } from "@components/common";
import { SectionHeading } from "@components/common";
import SectionContainer from "./SectionContainer";
import { groupByType } from "@/lib/groupByType";

const colors = ["red", "green", "blue", "yellow"];

export default function ToolsSection({ tools }) {
  const grouped = groupByType(tools);

  return (
    <SectionContainer title="Skills">
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12">
        {Object.keys(grouped).map((type, index) => (
          <div
            key={`${type}-section`}
            className="reveal fade-bottom col-span-full flex flex-col
            gap-4 md:col-span-4 "
            style={{
              animationDelay: `${200 * index}ms`,
              transitionDelay: `${200 * index}ms`,
            }}
          >
            <SectionHeading title={type} color={colors[index % 4]} />
            <div className="grid grid-cols-2 gap-2 ">
              {grouped[type].map((tool) => (
                <ToolCard tool={tool} key={`${tool.attributes.name}-card`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
