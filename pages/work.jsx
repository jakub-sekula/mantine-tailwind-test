import { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { useRouter } from "next/router";

export default function Work() {
  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <Layout>
      <div
        className="relative mx-auto grid h-[600px] w-full max-w-page grid-cols-12 
                   gap-4 py-36 text-center"
      >
        <div
          onClick={() => {
            setDefaultTransition(false);
            router.push("/about", undefined, { scroll: false });
          }}
          className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-yellow"
        >
          <h1 className="text-5xl font-bold">Hello</h1>
        </div>
        <div
          className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-red text-5xl font-bold "
        >
          World
        </div>
      </div>
    </Layout>
  );
}
