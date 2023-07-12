import Image from "next/image";

import { SectionHeading } from "@components/common";
import { ExperienceLine } from "@components/cv";
import SectionContainer from "./SectionContainer";

export default function AboutSection({ cv }) {
  const {
    attributes: { sections },
  } = cv;

  return (
    <SectionContainer>
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12  ">
      <div
          className="reveal fade-bottom col-span-full flex flex-col gap-4 font-light md:col-span-4"
        >
          <SectionHeading title="About" color="red" />
          Well I am someone for sure, the only problem is that I don&apos;t exactly
          know who that is yet. Someday something more exciting will be here but
          for now I&apos;m just filling it up with some filler text. It&apos;s not like
          anyone is ever going to read this, so I could actually probably write
          some stupid shit here. I&apos;m not going to do that though, because if on
          the off chance one of my friends stumbles across this page they might
          think I&apos;m stupid or whatever. Having three squared meals a day is very
          important for your health. Alas, I am not healthy because my meals are
          garbage. The oven has been preheated to 230 degrees Centigrade and the
          test specimen was inserted using a pair of tweezers.
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
            .entries.slice(0, 3)
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
