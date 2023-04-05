import Head from "next/head";
import { Layout, PageWrapper } from "components/layout";

export default function About() {
  return (
    <>
      <>
        <Head>
          <title>About me - Jakub Sekula</title>
        </Head>
        <Layout>
          <PageWrapper title="About me"></PageWrapper>
        </Layout>
      </>
    </>
  );
}
