"use client";

import dynamic from "next/dynamic";

const CatCompanion = dynamic(() => import("./cat-companion"), { ssr: false });

export default function CatLayer() {
  return <CatCompanion />;
}
