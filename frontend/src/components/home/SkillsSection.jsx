import { ToolCard } from "@components/common";
import { SectionHeading } from "@components/common";
import SectionContainer from "./SectionContainer";

const colors = ["red", "green", "blue", "yellow"];

export default function SkillsSection({ skills }) {
  return (
    <SectionContainer title="Skills">
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12">
        {skills
          .filter((item) => {
            return item.enabled;
          })
          .map((group, index) => (
            <div
              key={`${group.category}-section`}
              className="reveal fade-bottom col-span-full flex flex-col
            gap-4 md:col-span-4 "
              style={{
                animationDelay: `${200 * index}ms`,
                transitionDelay: `${200 * index}ms`,
              }}
            >
              <SectionHeading
                title={group.category}
                color={colors[index % 4]}
              />
              <div className="grid grid-cols-2 gap-2 ">
                {group.tools.data.map((tool) => (
                  <ToolCard tool={tool} key={`${tool.attributes.name}-card`} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </SectionContainer>
  );
}
