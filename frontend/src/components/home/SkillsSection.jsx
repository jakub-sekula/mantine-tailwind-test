import { ToolCard } from "@components/common";
import { SectionHeading } from "@components/common";
import SectionContainer from "./SectionContainer";

const colors = ["red", "green", "blue", "yellow"];

export default function SkillsSection({ skills }) {
  return (
    <SectionContainer title="Skills">
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12">
        <div className=" absolute left-1/2  top-1/2 -z-50 h-full max-h-[500px]  w-full max-w-[500px] -translate-y-[125%] rounded-full bg-gradient-to-t  from-blue-500   to-blue-500 opacity-0 blur-[150px] dark:opacity-20 md:-translate-x-full md:-translate-y-1/4" />
        <div className="absolute left-1/2  top-1/2 -z-50 h-full max-h-[600px] w-full max-w-[600px] -translate-x-full rounded-full bg-gradient-to-t from-blue-400  to-blue-700 opacity-0 blur-[150px] dark:opacity-40 md:-translate-y-1/2 md:translate-x-1/4" />
        {skills
          .filter((item) => {
            return item.enabled;
          })
          .map((group, index) => (
            <div
              key={`${group.category}-section`}
              className="reveal fade-bottom relative col-span-full flex flex-col
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
