import Link from "next/link";
import { IconChevronRight } from "@tabler/icons";

export default function Hyperlink({title="Project details", href="", ...props}) {
  return (
    <Link
    // {...props}
      
      href={href}
      className={`flex items-center gap-1 hover:underline  ${props.className ? props.className : null}`}
    >
      {title}
      <IconChevronRight size={16} />
    </Link>
  );
}
