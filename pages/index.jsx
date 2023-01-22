import { Layout } from "components/layout";
import {
  Hero,
  HomepageSection,
  AboutSection,
  ToolsSection,
  BlogSection,
} from "components/home";

import { webCards } from "dummyData";
import { engineeringCards } from "dummyData";

export default function Home() {
  return (
    <Layout >
      <Hero />
      <HomepageSection title="Web Development" cards={webCards} />
      <HomepageSection
        title="Engineering & DIY"
        cards={engineeringCards}
        reverse
      />
      <AboutSection title="About me" />
      <ToolsSection title="Tools and Skills" />
      <BlogSection title="Recent blog posts" />
    </Layout>
  );
}
