import { ColorSchemeToggle, DotsLogo } from "components/common";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="flex h-20 w-full items-center justify-center border-b 
    border-zinc-300 px-4 dark:border-0 dark:bg-[#111111]"
    >
      <div className="flex w-screen  max-w-[1400px]">
        <Link
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
        <div className="hidden flex-row items-center gap-14 md:flex ">
          <Link
            className="font-sans font-bold uppercase text-js-green"
            href="/work"
          >
            My work
          </Link>
          <Link
            className="relative font-sans font-bold uppercase text-js-yellow "
            href="/about"
          >
            About me
          </Link>
          <Link
            className="font-sans font-bold uppercase text-js-red"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="font-sans font-bold uppercase text-js-blue"
            href="/cv"
          >
            CV
          </Link>
          <ColorSchemeToggle />
        </div>
      </div>
    </header>
  );
}
