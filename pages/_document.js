import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body className='dark:bg-zinc-800 dark:text-zinc-200 bg-amber-50'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
