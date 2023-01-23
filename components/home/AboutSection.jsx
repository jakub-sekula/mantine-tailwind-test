import Link from "next/link";
import { SectionHeading, ExperienceLine } from "components/common";

export default function AboutSection({ title }) {
  return (
    <section 
    id="about-section"
    className="mx-auto flex w-full max-w-page flex-col items-center gap-12">
      <h2 id="webdev" className="font-poppins text-4xl font-bold text-js-red">
        {title}
      </h2>
      <div className="relative grid w-full grid-cols-12 gap-12  ">
        <p className="col-span-full text-center  font-light leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="col-span-5 flex flex-col gap-4">
          <SectionHeading title="Education" color="yellow" />
          <div className="flex flex-col gap-2">
            <img src="UoB.svg" alt="University of Birmingham logo" className=" w-36 select-none" />
            <div className="flex justify-between border-b border-neutral-200 pb-1">
              <h5>University of Birmingham</h5>
              <h6>2017 - 2022</h6>
            </div>
            <div className="  text-sm">
              <p>Master of Engineering, First Class Honours</p>
              <p className="font-light">
                Mechanical Engineering with Industrial Year
              </p>
            </div>
            <div className="text-sm  font-light">
              <p>
                <strong>Dissertation title:</strong> Development of a low-cost
                PIV/PTV software system for in-process tracking of graphene
                production
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-7 flex flex-col gap-4 ">
          <SectionHeading title="Professional Experience" color="green" />
          <ExperienceLine
            top="Crux Product Design"
            bottom="Mechanical Engineer"
            years="2022 - current"
          />
          <ExperienceLine
            top="Baba Ali"
            bottom="Web Designer & Web Developer"
            years="2021 - 2022"
          />
          <ExperienceLine
            top="Aston Martin F1 Team"
            bottom="Research & Development Engineer (Placement)"
            years="2020 - 2021"
          />
        </div>
      </div>
    </section>
  );
}

