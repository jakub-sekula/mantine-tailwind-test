import Link from "next/link";
import { motion } from "framer-motion";
import { ColorSchemeToggle, DotsLogo } from "components/common";
import { useAnimationContext } from "components/contexts";

export default function Header() {
  const { headerAnimation } = useAnimationContext();

  return (
    <motion.header
      {...headerAnimation}
      className="fixed top-0 z-50 flex h-20 w-full items-center justify-center border-b border-zinc-300 bg-white/90 
    px-4 backdrop-blur-lg dark:border-0 dark:bg-[#111111]/90"
    >
      <div className="flex w-screen  max-w-[1400px]">
        <Link
          scroll={false}
          href="/"
          className="mr-auto flex items-center gap-2 font-mono text-xl"
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
          <Link
            scroll={false}
            className="relative font-sans font-bold uppercase after:absolute after:left-0 after:-bottom-1 after:-z-10 after:h-[3px] after:w-full
                after:bg-js-blue after:opacity-0 after:transition-all after:duration-300
                 hover:after:opacity-100"
            href="/work"
          >
            My work
          </Link>
          <Link
            scroll={false}
            className="relative font-sans font-bold uppercase after:absolute after:left-0 after:-bottom-1 after:-z-10 after:h-[3px] after:w-full
          after:bg-js-green after:opacity-0 after:transition-all after:duration-300
           hover:after:opacity-100"
            href="/about"
          >
            About me
          </Link>
          <Link
            scroll={false}
            className="relative font-sans font-bold uppercase after:absolute after:left-0 after:-bottom-1 after:-z-10 after:h-[3px] after:w-full
          after:bg-js-red after:opacity-0 after:transition-all after:duration-300
           hover:after:opacity-100"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            scroll={false}
            className="relative font-sans font-bold uppercase after:absolute after:left-0 after:-bottom-1 after:-z-10 after:h-[3px] after:w-full
          after:bg-js-yellow after:opacity-0 after:transition-all after:duration-300
           hover:after:opacity-100"
            href="/cv"
          >
            CV
          </Link>
          <ColorSchemeToggle />
        </nav>
      </div>
    </motion.header>
  );
}
