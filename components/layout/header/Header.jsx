import { ColorSchemeToggle, DotsLogo } from "components/common";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="w-full flex items-center justify-center h-20  px-4 bg-[#111111]"
    >
      <div className="max-w-[1400px] flex  w-screen">
        <Link href="/" className="flex gap-2 items-center font-mono mr-auto text-xl">
          <DotsLogo />
          <span className="font-bold">
            <span className="text-js-yellow">
              jakubsekula<span className="text-js-blue">@personal</span>:
            </span>
            <span className="text-white">~</span>
            <span className="text-js-blue">$</span>
          </span>
        </Link>
        <div className="flex flex-row items-center gap-14">
          <Link className="uppercase text-js-green font-sans"  href="/work" Ś>
            My work
          </Link>
          <Link className="uppercase text-js-yellow font-sans"  href="/about">About me</Link>
          <Link className="uppercase text-js-red font-sans"  href="/blog">Blog</Link>
          <Link  className="uppercase text-js-blue font-sans" href="/cv">CV</Link>
          <ColorSchemeToggle />
        </div>
      </div>
    </header>
  );
}
