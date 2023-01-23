import Link from "next/link";
import { IconChevronRight } from "@tabler/icons";

export default function Hyperlink({title="Project details", href=""}) {
  return (
    <Link
      scroll={false}
      href={href}
      className="flex items-center gap-1 hover:underline"
    >
      {title}
      <IconChevronRight size={16} />
    </Link>
  );
}
