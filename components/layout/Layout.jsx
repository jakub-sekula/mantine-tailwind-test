import { Header, Footer } from "components/layout";

export default function Layout({ children, className, dark = false }) {
  return (
    <>
      <Header dark={dark} />
      <div
        key="layout"
        className={`relative mx-auto flex h-full w-full flex-col
      items-center ${className ? className : ""}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}
