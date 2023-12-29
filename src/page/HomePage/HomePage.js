import React from "react";
import ListMovie from "./ListMovie";

import CarouselMovie from "./CarouselMovie";
import FooterMovie from "./FooterMovie";
import TabMovie from "./TabMovie/TabMovie";
import HomeTool from "./HomeTool/HomeTool";

export default function HomePage() {
  return (
    <div className="bg-black ">
      <CarouselMovie />
      <HomeTool />
      <ListMovie />
      <TabMovie />
      <FooterMovie />
    </div>
  );
}
