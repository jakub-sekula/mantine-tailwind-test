export default function SectionContainer({ title = "", children }) {
  return (
    <section
      id={`${title}-section`}
      className="reveal fade-bottom mx-auto mb-8 md:mb-32 flex w-full max-w-page flex-col
      items-center gap-4 px-6 last:mb-0 md:gap-12 xl:px-4 2xl:px-0 overflow-hidden md:overflow-visible"
    >
      {!!title ? (
        <h2
          id="webdev"
          className="font-heading text-2xl font-semibold md:mb-4 md:text-4xl "
        >
          {title}
        </h2>
      ) : null}

      {children}
    </section>
  );
}
