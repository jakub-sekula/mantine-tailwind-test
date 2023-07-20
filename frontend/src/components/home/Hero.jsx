import { convertRelativeUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero({ data }) {
  const { avatar, socials, headline, subtitle } = data;
  return (
    <section
      id="hero-section"
      key="hero-section"
      className="relative -mt-16 mb-16 grid w-full grid-cols-12 gap-4 overflow-hidden bg-gradient-to-tl from-slate-950 to-slate-800 px-10 py-24 pt-40 md:px-8 xl:min-h-[70vh]"
    >
      <div className="patterned absolute inset-0" />
      <div
        className="z-10 col-span-full flex flex-col items-center justify-center text-center text-xl font-light
          md:flex-row md:gap-16 md:text-left"
      >
        <Image
          priority
          src={convertRelativeUrl(
            avatar.data.attributes?.formats?.large?.url || "me.png"
          )}
          width={avatar.data.attributes?.formats?.large?.width || 300}
          height={avatar.data.attributes?.formats?.large?.height || 300}
          alt={avatar.data.attributes?.alternativeText || "Hero image"}
          className="mb-8 h-48 w-48 shrink-0 rounded-full bg-gradient-to-tr from-amber-200 to-amber-600 shadow-xl shadow-slate-950 md:mb-0 md:h-72 md:w-72"
        />
        <div className="flex max-w-2xl flex-col text-white md:block">
          <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl lg:text-6xl">
            {headline}
          </h1>
          <h2 className="mb-4 text-lg font-light md:mb-0 md:text-xl md:leading-snug lg:text-2xl">
            I am a{" "}
            <span className="font-semibold text-js-blue">web developer</span>,
            <span className="font-semibold text-js-green">
              {" "}
              mechanical engineer
            </span>
            , <br/>and a
            <span className="font-semibold text-js-red">
              {" "}
              photography enthusiast
            </span>
            .
            {/* {subtitle} */}
          </h2>
          <div className="col-span-full mx-auto mb-6 mt-3 flex gap-4 text-base">
            {socials.data.map((social) => {
              return (
                <Link
                  href={social.attributes.url}
                  className="group flex w-max items-center gap-2 hover:underline"
                >
                  <Image
                    src={convertRelativeUrl(
                      social.attributes.icon.data.attributes.url
                    )}
                    width={18}
                    height={18}
                    alt={`${social.attributes.name}-icon`}
                  />
                  {social.attributes.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
