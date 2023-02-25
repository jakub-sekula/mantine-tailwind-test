import { Header, Footer } from "components/layout";
import { useLayoutContext } from "components/contexts";

export default function Layout({
  children,
  mode,
  className,
}) {
  const { transparent, dark, fixed } = useLayoutContext();

  let transitionProps = {};

  return (
    <>
      <Header transparent={transparent} fixed={fixed} dark={dark} />
      <div
        {...transitionProps}
        key="layout"
        className={`relative mt-24 flex h-full w-full flex-col mx-auto
      items-center ${className && className} ${mode === "blog" ? "max-w-3xl" : ""}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}
