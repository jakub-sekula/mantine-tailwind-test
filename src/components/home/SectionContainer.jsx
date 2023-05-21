export default function SectionContainer({ title = "title", children }) {
  return (
    <section
      id={`${title}-section`}
      className="mx-auto last:mb-0 mb-32 flex w-full max-w-page flex-col items-center
      gap-4 md:gap-12 px-6 xl:px-4 2xl:px-0 reveal-later fade-bottom active"
    >
      <h2
        id="webdev"
        className="font-heading text-2xl md:text-4xl font-semibold md:mb-4 "
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
