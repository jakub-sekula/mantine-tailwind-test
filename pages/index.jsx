import Head from "next/head";
import {Layout} from "components/layout";
import {Hero} from 'components/home'

export default function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
