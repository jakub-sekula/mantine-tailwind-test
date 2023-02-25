import { Layout } from "components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function About() {
  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);

  useEffect(() => {
    setDefaultTransition(true);
  }, []);

  return (
    <Layout>
      <div className=" flex items-center justify-center gap-12">
        <div
          onClick={() => {
            setDefaultTransition(false);
            router.push("/work", undefined, { scroll: false });
          }}
          className=" flex h-96 w-96 items-center justify-center rounded-md bg-js-blue text-center text-5xl font-bold"
        >
          <h1>World</h1>
        </div>

        <div className="flex h-96 w-96 items-center justify-center rounded-md bg-js-green text-center text-5xl font-bold" />
      </div>
    </Layout>
  );
}
