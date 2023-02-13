import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Jakub Sekula</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300&family=Inter:wght@400;600;800&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <body className="bg-lightbg font-sans text-text dark:bg-darkbg dark:text-darktext">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
