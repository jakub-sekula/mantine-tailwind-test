export default function PageWrapper({ children, title, ...props }) {
  return (
    <>
      {!!title ? (
        <h1 className="mt-6 col-span-full text-center font-heading text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
          {title}
        </h1>
      ) : null}
      <main
        className={`mx-auto  grid w-full ${
          props.className ? props.className : "max-w-page"
        } grid-cols-12 gap-6 px-6 lg:mt-12 xl:px-4 2xl:px-0`}
      >
        {children}
      </main>
    </>
  );
}
