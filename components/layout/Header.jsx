import Link from "next/link";
import { motion } from "framer-motion";
import { ColorSchemeToggle, DotsLogo } from "components/common";
import { useRouter } from "next/router";

export default function Header({fixed,transparent,dark}) {

  return (
    <motion.header
      className={`${fixed === true ? "fixed" : "absolute"}
      ${transparent === true ? "bg-gradient-to-b from-darkbg/40 pb-px border-transparent" : "border-b border-neutral-100 bg-lightbg/90 px-4 backdrop-blur-lg dark:border-darktext/5 dark:bg-darkbg/90"}
      ${dark === true ?"text-darktext" : ""}
      top-0 z-50 flex h-24 w-full items-center justify-center
      transition-colors duration-200 `}
    >
      <div className="flex w-screen  max-w-[1400px]">
        <Link
          scroll={false}
          href="/"
          className="mx-auto flex flex-col items-center gap-2 font-mono text-lg md:mx-0 md:mr-auto md:flex-row md:text-lg"
          >
          <DotsLogo />
          <span className="font-bold">
            <span className="text-js-yellow">
              jakubsekula<span className="text-js-blue">@personal</span>:
            </span>
            <span className="text-white">~</span>
            <span className="text-js-blue">$</span>
          </span>
        </Link>
        <nav className="hidden flex-row items-center gap-14 md:flex ">
          <NavLink label="My work" href="/work" color="blue" />
          <NavLink label="About" href="/about" color="green" />
          <NavLink label="CV" href="/cv" color="yellow" />
          <NavLink label="Blog" href="/blog" color="red" />
          <ColorSchemeToggle />
        </nav>
      </div>
    </motion.header>
  );
}

function NavLink({ label, href, color, ...props }) {
  const router = useRouter();
  const selected = router.pathname === href;
  return (
    <Link
      {...props}
      scroll={false}
      className={`relative font-sans  after:absolute after:left-0 after:-bottom-1 after:-z-10 after:h-[3px] after:w-full
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
