import { Layout } from "components/layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAnimationContext } from "components/contexts";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <Layout>
      <Link
        scroll={false}
        href="/#photography-section"
        className="w-full py-36 min-h-[1000px] text-center text-5xl font-bold"
      >
        Photo category {category}
        <img
          alt={category}
          src={`/images/${category}.jpg`}
          className="mx-auto w-[600px]"
        />
      </Link>
    </Layout>
  );
}
