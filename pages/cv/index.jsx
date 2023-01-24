import { Layout } from "components/layout";
import { SectionHeading, ExperienceLine } from "components/common";
import { motion } from "framer-motion";

export default function Cv() {
  return (
    <Layout>
      <motion.section
        id="cv"
        className="relative mx-auto grid w-full max-w-page grid-cols-12 gap-8 py-16  "
      >
        <h1 className=" col-span-full row-start-1 mb-4 font-poppins text-4xl font-bold">
          Curriculum Vitae
        </h1>
        <aside className="col-span-3 col-start-10 row-[span_7_/_span_7] row-start-2 w-full text-right font-light text-sm ">
          <ul className="sticky top-36 flex flex-col gap-4 ">
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li className=" font-bold">
              <a href="#education">Education</a>
            </li>
            <li>
              <a href="#extracurriculars">Extracurriculars</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#certifications">Certifications</a>
            </li>
            <li>
              <a href="#interests">Interests</a>
            </li>
          </ul>
        </aside>
        <article
          id="experience"
          className="col-span-9 col-start-1 flex flex-col gap-2"
        >
          <SectionHeading
            color="green"
            title="Professional Experience"
            className="sticky top-20 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
          />
          <div className="flex flex-col gap-6">
            <ExperienceLine
              top="Crux Product Design"
              bottom={
                <>
                  <h3 className="text-base font-bold">Mechanical Engineer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Carried out material research and testing for a new type
                      of dry powder inhaler
                    </li>
                    <li>
                      Led the development of a packaging innovation and
                      standardisation project for a major pharma manufacturer
                    </li>
                    <li>
                      Built a new company intranet application using Next.js,
                      TailwindCSS, Strapi, and Mantine UI
                    </li>
                  </ul>
                </>
              }
              years="2022 - current"
            />
            <ExperienceLine
              top="Baba Ali"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Web Designer & Web Developer
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed and developed websites using WordPress and Figma
                    </li>
                    <li>
                      Customised client websites using PHP, CSS and JavaScript
                    </li>
                    <li>Created a custom Shopify theme for the company</li>
                    <li>
                      Created and managed a WooCommerce shop for a brownie
                      bakery
                    </li>
                  </ul>
                </>
              }
              years="2021 - 2022"
            />
            <ExperienceLine
              top="Aston Martin F1 Team"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Research & Development Engineer (Placement)
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed R&D test rig parts and assemblies using CATIA V6
                    </li>
                    <li>
                      Modified existing parts and submitted Engineering Change
                      Orders in the ENOVIA PLM system
                    </li>
                    <li>
                      Assisted in the development of a pit-stop simulator rig by
                      modelling parts and preparing manufacturing drawings
                    </li>
                    <li>
                      Produced engineering drawings incorporating GD&T and
                      tolerance stack analysis for complex assemblies
                    </li>
                    <li>
                      Worked with R&D and electronics engineers on developing
                      and implementing a new tyre temperature sensor
                    </li>
                    <li>
                      Streamlined the process for calibrating and testing the
                      tyre thermal cameras by writing custom VBA scripts
                    </li>
                    <li>
                      Carried out mechanical tests of parts in the R&D workshop
                      and reported the collected data to higher-ups
                    </li>
                    <li>
                      Developed a new torsion bar testing rig which was
                      successfully deployed and is currently used by the team
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="MOSU Poland"
              bottom={
                <>
                  <h3 className="text-base font-bold">Co-Founder</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Co-founded a company providing environmentally friendly
                      toothbrushes in a subscription model
                    </li>
                    <li>
                      Created all brand visuals and marketing materials, such as
                      social media adverts
                    </li>
                    <li>
                      Responsible for company strategy and growing customer base
                    </li>
                    <li>
                      Managed sales, customer relations and marketing analytics
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="University of Birmingham Guild of Students"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Created graphical assets for social media and print, such
                      as posters, flyers, and event branding
                    </li>
                    <li>
                      Designed a campus-wide poster campaign informing students
                      of the impact of their feedback
                    </li>
                  </ul>
                </>
              }
              years="2019 - 2020"
            />
            <ExperienceLine
              top="BRITAS Travel"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm"></ul>
                </>
              }
              years="2019 - 2020"
            />
          </div>
        </article>

        <article
          id="education"
          className="col-span-9 col-start-1 flex flex-col gap-2"
        >
          <SectionHeading
            color="yellow"
            title="Education"
            className="sticky top-20 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
          />
          <div className="flex flex-col gap-6">
            <ExperienceLine
              top="Crux Product Design"
              bottom={
                <>
                  <h3 className="text-base font-bold">Mechanical Engineer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Carried out material research and testing for a new type
                      of dry powder inhaler
                    </li>
                    <li>
                      Led the development of a packaging innovation and
                      standardisation project for a major pharma manufacturer
                    </li>
                    <li>
                      Built a new company intranet application using Next.js,
                      TailwindCSS, Strapi, and Mantine UI
                    </li>
                  </ul>
                </>
              }
              years="2022 - current"
            />
            <ExperienceLine
              top="Baba Ali"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Web Designer & Web Developer
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed and developed websites using WordPress and Figma
                    </li>
                    <li>
                      Customised client websites using PHP, CSS and JavaScript
                    </li>
                    <li>Created a custom Shopify theme for the company</li>
                    <li>
                      Created and managed a WooCommerce shop for a brownie
                      bakery
                    </li>
                  </ul>
                </>
              }
              years="2021 - 2022"
            />
            <ExperienceLine
              top="Aston Martin F1 Team"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Research & Development Engineer (Placement)
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed R&D test rig parts and assemblies using CATIA V6
                    </li>
                    <li>
                      Modified existing parts and submitted Engineering Change
                      Orders in the ENOVIA PLM system
                    </li>
                    <li>
                      Assisted in the development of a pit-stop simulator rig by
                      modelling parts and preparing manufacturing drawings
                    </li>
                    <li>
                      Produced engineering drawings incorporating GD&T and
                      tolerance stack analysis for complex assemblies
                    </li>
                    <li>
                      Worked with R&D and electronics engineers on developing
                      and implementing a new tyre temperature sensor
                    </li>
                    <li>
                      Streamlined the process for calibrating and testing the
                      tyre thermal cameras by writing custom VBA scripts
                    </li>
                    <li>
                      Carried out mechanical tests of parts in the R&D workshop
                      and reported the collected data to higher-ups
                    </li>
                    <li>
                      Developed a new torsion bar testing rig which was
                      successfully deployed and is currently used by the team
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="MOSU Poland"
              bottom={
                <>
                  <h3 className="text-base font-bold">Co-Founder</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Co-founded a company providing environmentally friendly
                      toothbrushes in a subscription model
                    </li>
                    <li>
                      Created all brand visuals and marketing materials, such as
                      social media adverts
                    </li>
                    <li>
                      Responsible for company strategy and growing customer base
                    </li>
                    <li>
                      Managed sales, customer relations and marketing analytics
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="University of Birmingham Guild of Students"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Created graphical assets for social media and print, such
                      as posters, flyers, and event branding
                    </li>
                    <li>
                      Designed a campus-wide poster campaign informing students
                      of the impact of their feedback
                    </li>
                  </ul>
                </>
              }
              years="2019 - 2020"
            />
            <ExperienceLine
              top="BRITAS Travel"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm"></ul>
                </>
              }
              years="2019 - 2020"
            />
          </div>
        </article>
        <article
          id="extracurriculars"
          className="col-span-9 col-start-1 flex flex-col gap-2"
        >
          <SectionHeading
            color="blue"
            title="Extracurriculars"
            className="sticky top-20 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
          />
          <div className="flex flex-col gap-6">
            <ExperienceLine
              top="Crux Product Design"
              bottom={
                <>
                  <h3 className="text-base font-bold">Mechanical Engineer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Carried out material research and testing for a new type
                      of dry powder inhaler
                    </li>
                    <li>
                      Led the development of a packaging innovation and
                      standardisation project for a major pharma manufacturer
                    </li>
                    <li>
                      Built a new company intranet application using Next.js,
                      TailwindCSS, Strapi, and Mantine UI
                    </li>
                  </ul>
                </>
              }
              years="2022 - current"
            />
            <ExperienceLine
              top="Baba Ali"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Web Designer & Web Developer
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed and developed websites using WordPress and Figma
                    </li>
                    <li>
                      Customised client websites using PHP, CSS and JavaScript
                    </li>
                    <li>Created a custom Shopify theme for the company</li>
                    <li>
                      Created and managed a WooCommerce shop for a brownie
                      bakery
                    </li>
                  </ul>
                </>
              }
              years="2021 - 2022"
            />
            <ExperienceLine
              top="Aston Martin F1 Team"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Research & Development Engineer (Placement)
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed R&D test rig parts and assemblies using CATIA V6
                    </li>
                    <li>
                      Modified existing parts and submitted Engineering Change
                      Orders in the ENOVIA PLM system
                    </li>
                    <li>
                      Assisted in the development of a pit-stop simulator rig by
                      modelling parts and preparing manufacturing drawings
                    </li>
                    <li>
                      Produced engineering drawings incorporating GD&T and
                      tolerance stack analysis for complex assemblies
                    </li>
                    <li>
                      Worked with R&D and electronics engineers on developing
                      and implementing a new tyre temperature sensor
                    </li>
                    <li>
                      Streamlined the process for calibrating and testing the
                      tyre thermal cameras by writing custom VBA scripts
                    </li>
                    <li>
                      Carried out mechanical tests of parts in the R&D workshop
                      and reported the collected data to higher-ups
                    </li>
                    <li>
                      Developed a new torsion bar testing rig which was
                      successfully deployed and is currently used by the team
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="MOSU Poland"
              bottom={
                <>
                  <h3 className="text-base font-bold">Co-Founder</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Co-founded a company providing environmentally friendly
                      toothbrushes in a subscription model
                    </li>
                    <li>
                      Created all brand visuals and marketing materials, such as
                      social media adverts
                    </li>
                    <li>
                      Responsible for company strategy and growing customer base
                    </li>
                    <li>
                      Managed sales, customer relations and marketing analytics
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="University of Birmingham Guild of Students"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Created graphical assets for social media and print, such
                      as posters, flyers, and event branding
                    </li>
                    <li>
                      Designed a campus-wide poster campaign informing students
                      of the impact of their feedback
                    </li>
                  </ul>
                </>
              }
              years="2019 - 2020"
            />
            <ExperienceLine
              top="BRITAS Travel"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm"></ul>
                </>
              }
              years="2019 - 2020"
            />
          </div>
        </article>
        <article
          id="skills"
          className="col-span-9 col-start-1 flex flex-col gap-2"
        >
          <SectionHeading
            color="red"
            title="Skills"
            className="sticky top-20 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
          />
          <div className="flex flex-col gap-6">
            <ExperienceLine
              top="Crux Product Design"
              bottom={
                <>
                  <h3 className="text-base font-bold">Mechanical Engineer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Carried out material research and testing for a new type
                      of dry powder inhaler
                    </li>
                    <li>
                      Led the development of a packaging innovation and
                      standardisation project for a major pharma manufacturer
                    </li>
                    <li>
                      Built a new company intranet application using Next.js,
                      TailwindCSS, Strapi, and Mantine UI
                    </li>
                  </ul>
                </>
              }
              years="2022 - current"
            />
            <ExperienceLine
              top="Baba Ali"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Web Designer & Web Developer
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed and developed websites using WordPress and Figma
                    </li>
                    <li>
                      Customised client websites using PHP, CSS and JavaScript
                    </li>
                    <li>Created a custom Shopify theme for the company</li>
                    <li>
                      Created and managed a WooCommerce shop for a brownie
                      bakery
                    </li>
                  </ul>
                </>
              }
              years="2021 - 2022"
            />
            <ExperienceLine
              top="Aston Martin F1 Team"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Research & Development Engineer (Placement)
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed R&D test rig parts and assemblies using CATIA V6
                    </li>
                    <li>
                      Modified existing parts and submitted Engineering Change
                      Orders in the ENOVIA PLM system
                    </li>
                    <li>
                      Assisted in the development of a pit-stop simulator rig by
                      modelling parts and preparing manufacturing drawings
                    </li>
                    <li>
                      Produced engineering drawings incorporating GD&T and
                      tolerance stack analysis for complex assemblies
                    </li>
                    <li>
                      Worked with R&D and electronics engineers on developing
                      and implementing a new tyre temperature sensor
                    </li>
                    <li>
                      Streamlined the process for calibrating and testing the
                      tyre thermal cameras by writing custom VBA scripts
                    </li>
                    <li>
                      Carried out mechanical tests of parts in the R&D workshop
                      and reported the collected data to higher-ups
                    </li>
                    <li>
                      Developed a new torsion bar testing rig which was
                      successfully deployed and is currently used by the team
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="MOSU Poland"
              bottom={
                <>
                  <h3 className="text-base font-bold">Co-Founder</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Co-founded a company providing environmentally friendly
                      toothbrushes in a subscription model
                    </li>
                    <li>
                      Created all brand visuals and marketing materials, such as
                      social media adverts
                    </li>
                    <li>
                      Responsible for company strategy and growing customer base
                    </li>
                    <li>
                      Managed sales, customer relations and marketing analytics
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="University of Birmingham Guild of Students"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Created graphical assets for social media and print, such
                      as posters, flyers, and event branding
                    </li>
                    <li>
                      Designed a campus-wide poster campaign informing students
                      of the impact of their feedback
                    </li>
                  </ul>
                </>
              }
              years="2019 - 2020"
            />
            <ExperienceLine
              top="BRITAS Travel"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm"></ul>
                </>
              }
              years="2019 - 2020"
            />
          </div>
        </article>
        <article
          id="certifications"
          className="col-span-9 col-start-1 flex flex-col gap-2"
        >
          <SectionHeading
            color="green"
            title="Certifications"
            className="sticky top-20 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
          />
          <div className="flex flex-col gap-6">
            <ExperienceLine
              top="Crux Product Design"
              bottom={
                <>
                  <h3 className="text-base font-bold">Mechanical Engineer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Carried out material research and testing for a new type
                      of dry powder inhaler
                    </li>
                    <li>
                      Led the development of a packaging innovation and
                      standardisation project for a major pharma manufacturer
                    </li>
                    <li>
                      Built a new company intranet application using Next.js,
                      TailwindCSS, Strapi, and Mantine UI
                    </li>
                  </ul>
                </>
              }
              years="2022 - current"
            />
            <ExperienceLine
              top="Baba Ali"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Web Designer & Web Developer
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed and developed websites using WordPress and Figma
                    </li>
                    <li>
                      Customised client websites using PHP, CSS and JavaScript
                    </li>
                    <li>Created a custom Shopify theme for the company</li>
                    <li>
                      Created and managed a WooCommerce shop for a brownie
                      bakery
                    </li>
                  </ul>
                </>
              }
              years="2021 - 2022"
            />
            <ExperienceLine
              top="Aston Martin F1 Team"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Research & Development Engineer (Placement)
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed R&D test rig parts and assemblies using CATIA V6
                    </li>
                    <li>
                      Modified existing parts and submitted Engineering Change
                      Orders in the ENOVIA PLM system
                    </li>
                    <li>
                      Assisted in the development of a pit-stop simulator rig by
                      modelling parts and preparing manufacturing drawings
                    </li>
                    <li>
                      Produced engineering drawings incorporating GD&T and
                      tolerance stack analysis for complex assemblies
                    </li>
                    <li>
                      Worked with R&D and electronics engineers on developing
                      and implementing a new tyre temperature sensor
                    </li>
                    <li>
                      Streamlined the process for calibrating and testing the
                      tyre thermal cameras by writing custom VBA scripts
                    </li>
                    <li>
                      Carried out mechanical tests of parts in the R&D workshop
                      and reported the collected data to higher-ups
                    </li>
                    <li>
                      Developed a new torsion bar testing rig which was
                      successfully deployed and is currently used by the team
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="MOSU Poland"
              bottom={
                <>
                  <h3 className="text-base font-bold">Co-Founder</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Co-founded a company providing environmentally friendly
                      toothbrushes in a subscription model
                    </li>
                    <li>
                      Created all brand visuals and marketing materials, such as
                      social media adverts
                    </li>
                    <li>
                      Responsible for company strategy and growing customer base
                    </li>
                    <li>
                      Managed sales, customer relations and marketing analytics
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="University of Birmingham Guild of Students"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Created graphical assets for social media and print, such
                      as posters, flyers, and event branding
                    </li>
                    <li>
                      Designed a campus-wide poster campaign informing students
                      of the impact of their feedback
                    </li>
                  </ul>
                </>
              }
              years="2019 - 2020"
            />
            <ExperienceLine
              top="BRITAS Travel"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm"></ul>
                </>
              }
              years="2019 - 2020"
            />
          </div>
        </article>
        <article
          id="interests"
          className="col-span-9 col-start-1 flex flex-col gap-2"
        >
          <SectionHeading
            color="yellow"
            title="Interests"
            className="sticky top-20 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
          />
          <div className="flex flex-col gap-6">
            <ExperienceLine
              top="Crux Product Design"
              bottom={
                <>
                  <h3 className="text-base font-bold">Mechanical Engineer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Carried out material research and testing for a new type
                      of dry powder inhaler
                    </li>
                    <li>
                      Led the development of a packaging innovation and
                      standardisation project for a major pharma manufacturer
                    </li>
                    <li>
                      Built a new company intranet application using Next.js,
                      TailwindCSS, Strapi, and Mantine UI
                    </li>
                  </ul>
                </>
              }
              years="2022 - current"
            />
            <ExperienceLine
              top="Baba Ali"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Web Designer & Web Developer
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed and developed websites using WordPress and Figma
                    </li>
                    <li>
                      Customised client websites using PHP, CSS and JavaScript
                    </li>
                    <li>Created a custom Shopify theme for the company</li>
                    <li>
                      Created and managed a WooCommerce shop for a brownie
                      bakery
                    </li>
                  </ul>
                </>
              }
              years="2021 - 2022"
            />
            <ExperienceLine
              top="Aston Martin F1 Team"
              bottom={
                <>
                  <h3 className="text-base font-bold">
                    Research & Development Engineer (Placement)
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Designed R&D test rig parts and assemblies using CATIA V6
                    </li>
                    <li>
                      Modified existing parts and submitted Engineering Change
                      Orders in the ENOVIA PLM system
                    </li>
                    <li>
                      Assisted in the development of a pit-stop simulator rig by
                      modelling parts and preparing manufacturing drawings
                    </li>
                    <li>
                      Produced engineering drawings incorporating GD&T and
                      tolerance stack analysis for complex assemblies
                    </li>
                    <li>
                      Worked with R&D and electronics engineers on developing
                      and implementing a new tyre temperature sensor
                    </li>
                    <li>
                      Streamlined the process for calibrating and testing the
                      tyre thermal cameras by writing custom VBA scripts
                    </li>
                    <li>
                      Carried out mechanical tests of parts in the R&D workshop
                      and reported the collected data to higher-ups
                    </li>
                    <li>
                      Developed a new torsion bar testing rig which was
                      successfully deployed and is currently used by the team
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="MOSU Poland"
              bottom={
                <>
                  <h3 className="text-base font-bold">Co-Founder</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Co-founded a company providing environmentally friendly
                      toothbrushes in a subscription model
                    </li>
                    <li>
                      Created all brand visuals and marketing materials, such as
                      social media adverts
                    </li>
                    <li>
                      Responsible for company strategy and growing customer base
                    </li>
                    <li>
                      Managed sales, customer relations and marketing analytics
                    </li>
                  </ul>
                </>
              }
              years="2020 - 2021"
            />
            <ExperienceLine
              top="University of Birmingham Guild of Students"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    <li>
                      Created graphical assets for social media and print, such
                      as posters, flyers, and event branding
                    </li>
                    <li>
                      Designed a campus-wide poster campaign informing students
                      of the impact of their feedback
                    </li>
                  </ul>
                </>
              }
              years="2019 - 2020"
            />
            <ExperienceLine
              top="BRITAS Travel"
              bottom={
                <>
                  <h3 className="text-base font-bold">Graphic Designer</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm"></ul>
                </>
              }
              years="2019 - 2020"
            />
          </div>
        </article>
      </motion.section>
    </Layout>
  );
}
