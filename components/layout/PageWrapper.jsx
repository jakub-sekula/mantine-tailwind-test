export default function PageWrapper({ children, title, ...props }) {
  return (
    <main className="mx-auto mt-6 grid w-full max-w-page grid-cols-12 gap-6 px-6 md:mt-6 lg:mt-12 xl:px-4 2xl:px-0">
      <h1 className="text-center col-span-full font-heading text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {children}
    </main>
  );
}
