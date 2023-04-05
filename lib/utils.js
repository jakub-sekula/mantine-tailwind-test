export function convertRelativeUrl(src) {
  if (src) {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
  } else {
	return "/images/thailand.jpg"
  }
}

// Converts relative links from Markdown to absolute for image display
export function imageLinkTransformer(src) {
  return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
}

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import slugify from "slugify";

// Components for React Markdown renderer
export const markdownComponents = {
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
    return <Image width={960} height={960} className="rounded-sm" alt={props.alt} {...props} />;
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

export function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 175;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}