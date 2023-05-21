"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { imageLinkTransformer } from "lib/utils";

export default function MarkdownRenderer({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
      className={`prose-pre:overflow-x-none prose col-span-full row-start-3 w-full max-w-none
				  px-6 font-light prose-pre:m-0 prose-pre:h-min prose-pre:bg-red-600 prose-pre:p-0 
				dark:prose-invert md:col-span-8 md:col-start-3 lg:px-0 
			   ${
           false
             ? "lg:col-span-6 lg:col-start-4"
             : "lg:col-span-7 lg:col-start-2 lg:pr-24"
         } `}
      transformImageUri={imageLinkTransformer}
    >
      {children}
    </ReactMarkdown>
  );
}

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import slugify from "slugify";

// Components for React Markdown renderer
const markdownComponents = {
  a(props) {
    return (
      <a
        {...props}
        className="visited:text-purple-400 dark:visited:text-purple-600"
      >
        {props.children}
      </a>
    );
  },
  h2(props) {
    return (
      <h2 id={slugify(props.children[0].replace(/[^a-zA-Z ]/g, ""))} {...props}>
        {props.children}
      </h2>
    );
  },
  h3(props) {
    return (
      <h3 id={slugify(props.children[0].replace(/[^a-zA-Z ]/g, ""))} {...props}>
        {props.children}
      </h3>
    );
  },
  img(props) {
    return (
      <Image
        width={960}
        height={960}
        className="rounded-sm"
        alt={props.alt}
        {...props}
      />
    );
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        customStyle={{
          margin: 0,
        }}
        wrapLines={true}
        showLineNumbers
        language={match[1]}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
