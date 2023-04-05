
import { Header, Footer } from "components/layout";
import { useLayoutContext } from "components/contexts";

export default function Layout({
  children,
  className,
}) {
  const { transparent, dark, fixed } = useLayoutContext();


  return (
    <>
      <Header transparent={transparent} fixed={fixed} dark={dark} />
      <div
        key="layout"
        className={`relative flex h-full w-full flex-col mx-auto
      items-center ${className && className}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}
