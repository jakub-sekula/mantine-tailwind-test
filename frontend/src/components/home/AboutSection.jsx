"use client";
import { SectionHeading } from "@components/common";
import { ExperienceLine } from "@components/cv";
import SectionContainer from "./SectionContainer";

export default function AboutSection({ cv, about }) {
  const {
    attributes: { sections },
  } = cv;

  return (
    <SectionContainer>
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12  ">
        <div className="reveal fade-bottom col-span-full flex flex-col gap-4 font-light md:col-span-4">
          <SectionHeading title="About" color="red" />
          {about.bio}
        </div>
        <div
          className="reveal fade-bottom col-span-full flex flex-col  gap-4 md:col-span-4"
          style={{
            animationDelay: `250ms`,
            transitionDelay: `250ms`,
          }}
        >
          <SectionHeading title="Professional Experience" color="green" />
          {sections
            .filter((section) => section.title === "Professional Experience")[0]
            .entries.filter((entry) => entry.show_on_website)
            .slice(0, 3)
            .map((entry) => {
              return (
                <ExperienceLine
                  summaryView={true}
                  key={entry.title}
                  entry={entry}
                />
              );
            })}
        </div>
        <div
          className="reveal fade-bottom col-span-full flex flex-col gap-4 md:col-span-4"
          style={{
            animationDelay: `450ms`,
            transitionDelay: `450ms`,
          }}
        >
          <SectionHeading title="Education" color="yellow" />
          <ExperienceLine
            key={"education"}
            entry={
              sections.filter((section) => section.title === "Education")[0]
                .entries[0]
            }
          />
        </div>
      </div>
    </SectionContainer>
  );
}
