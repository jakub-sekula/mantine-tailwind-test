"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ApiToolTool } from "../../../types/strapi/contentTypes";
import { convertRelativeUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ToolCard({
  tool,
  ...props
}: {
  tool: ApiToolTool;
  [key: string]: any;
}) {
  const { theme } = useTheme();
  let icon_url;
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    if (!theme) return;
    setMounted(true);
  }, [theme]);

  if (theme === "dark" && !tool.attributes.prefer_light) {
    if (!!tool.attributes.icon_dark.data?.attributes) {
      icon_url = convertRelativeUrl(
        tool.attributes.icon_dark.data?.attributes.url
      );
    } else if (!!tool.attributes.icon_light.data?.attributes) {
      icon_url = convertRelativeUrl(
        tool.attributes.icon_light.data?.attributes.url
      );
    } else {
      icon_url = "/images/thailand.jpg";
    }
  } else {
    if (!!tool.attributes.icon_light.data?.attributes) {
      icon_url = convertRelativeUrl(
        tool.attributes.icon_light.data?.attributes.url
      );
    } else if (!!tool.attributes.icon_dark.data?.attributes) {
      icon_url = convertRelativeUrl(
        tool.attributes.icon_dark.data?.attributes.url
      );
    } else {
      icon_url = "/images/thailand.jpg";
    }
  }
  return (
    <div
      className={`rounded-card flex flex-col items-center justify-center gap-4
	 px-3 py-6 font-bold dark:bg-white/[2%] backdrop-blur-lg ${props.className}`}
    >
      {mounted ? (
        <Image
          src={icon_url}
          alt={tool.attributes.name}
          width={48}
          height={48}
          className="w-16"
        />
      ) : null}

      <span className="text-sm">{tool.attributes.name}</span>
    </div>
  );
}
