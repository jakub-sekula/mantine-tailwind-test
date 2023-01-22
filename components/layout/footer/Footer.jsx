import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="mt-24 flex w-full flex-col items-center justify-center
     border-t border-zinc-300 bg-neutral-50 font-light dark:border-0
    dark:bg-black/80"
    >
      <div className="flex w-full flex-col gap-6 py-10 items-center text-center">
        <h4 className=" font-poppins text-4xl font-bold">Let's talk!</h4>
        <div className="flex flex-col gap-2">
          <p>I’m open to remote freelance opportunities.</p>
          <p className="">
            Shoot me a message and let’s make cool things together:
          </p>
        </div>
        <a href="mailto:contact@jakubsekula.com" className="font-bold">
          contact@jakubsekula.com
        </a>
        <div className="flex gap-10">
          <a target="_blank" href="https://github.com/jakub-sekula"><FaGithub size={24} /></a>
          <a target="_blank" href="https://instagram.com/sekula.jpg"><FaInstagram size={24} /></a>
          <a target="_blank" href="https://www.linkedin.com/in/jakub-sekula"><FaLinkedin size={24} /></a>
        </div>
      </div>
      <div
        className="flex w-full flex-col items-center justify-center
      gap-2 border-t border-zinc-300 py-6 text-xs 
      dark:border-neutral-800 dark:text-zinc-600 "
      >
        <span className=" text-base">Made with ❤️ in Bristol, UK</span>
        <span className="flex items-center gap-2">
          View page source on Github <FaGithub size={14} />
        </span>
      </div>
    </footer>
  );
}
