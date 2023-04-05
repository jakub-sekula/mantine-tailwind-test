import Link from "next/link";

import { ColorSchemeToggle, DotsLogo } from "components/common";
import { useRouter } from "next/router";
import { useLayoutContext } from "components/contexts";
import { useScrollDirection } from ".";

export default function Header({ fixed, transparent, dark }) {
  const { menuLinks } = useLayoutContext();
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`${fixed === true ? "sticky lg:fixed" : "sticky"}
      ${
        transparent === true
          ? "border-transparent bg-gradient-to-b from-darkbg/40 pb-px"
          : "border-b border-neutral-100 bg-lightbg/60 px-4 backdrop-blur-lg dark:border-darktext/5 dark:bg-darkbg/90"
      }
      ${dark === true ? "text-darktext" : ""}
       ${ scrollDirection === "down" ? "-top-16" : "top-0"} z-50 flex h-16 w-full
      items-center justify-center px-6 transition-all duration-200 xl:px-4 2xl:px-0 `}
    >
      <div className="flex w-screen max-w-page">
        <Link
          
          href="/"
          className="mx-auto flex flex-col items-center gap-2 font-mono md:mx-0 md:mr-auto md:flex-row"
        >
          {/* <DotsLogo /> */}
          <span className="font-bold">
            <span className="text-js-yellow">
              jakubsekula<span className="text-js-blue">@personal</span>:
            </span>
            <span className="text-white">~</span>
            <span className="text-js-blue">$</span>
          </span>
        </Link>
        <nav className="hidden flex-row items-center gap-14 md:flex ">
          {!!menuLinks ? (
            menuLinks.map((link) => {
              return (
                <NavLink
                  key={link.title}
                  label={link.title}
                  href={link.url}
                  color={link?.color}
                />
              );
            })
          ) : (
            <>
              <NavLink label="My work" href="/projects" color="blue" />
              <NavLink label="About" href="/about" color="green" />
              <NavLink label="CV" href="/cv" color="yellow" />
              <NavLink label="Blog" href="/blog" color="red" />
            </>
          )}
          <ColorSchemeToggle />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ label, href, color = "red", ...props }) {
  const router = useRouter();
  const selected = router.pathname === href;
  return (
    <Link
      {...props}
      
      className={`relative font-headings text-sm  after:absolute after:left-0 after:-bottom-1
            after:-z-10 after:h-[2px] after:w-full
           after:opacity-0 after:transition-all after:duration-300
           hover:after:opacity-100 ${selected ? "after:opacity-100" : null} ${
        COLORS?.[color]
      }`}
      href={href}
    >
      {label}
    </Link>
  );
}

const COLORS = {
  red: "after:bg-js-red",
  green: "after:bg-js-green",
  blue: "after:bg-js-blue",
  yellow: "after:bg-js-yellow",
};
