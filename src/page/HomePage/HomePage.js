import React from "react";
import ListMovie from "./ListMovie";

import CarouselMovie from "./CarouselMovie";
import FooterMovie from "./FooterMovie";
import TabMovie from "./TabMovie/TabMovie";

export default function HomePage() {
  return (
    <div className="bg-black">
      <CarouselMovie />

      <ListMovie />
      <TabMovie />
      <FooterMovie />
    </div>
  );
}
