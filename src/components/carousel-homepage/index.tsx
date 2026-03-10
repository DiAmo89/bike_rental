import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getBikes } from "@/api/getBikes";

import type { Bike } from "@/types/Bike";
import BikeCard from "../catalog/bike-card";

export function CarouselSpacing() {
  const [bikes, setBikes] = React.useState<Bike[]>([]);

  React.useEffect(() => {
    getBikes().then((data) => {
      setBikes(data.slice(0, 30));
    });
  }, []);

  return (
    <Carousel className="w-full ">
      <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4 lg:-ml-6 xl:-ml-8">
        {bikes.map((bike) => (
          <CarouselItem
            key={bike.id}
            className="pl-2 sm:pl-3 md:pl-4 lg:pl-6 xl:pl-8 flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%]"
          >
            <div className="p-1">
              <BikeCard bike={bike} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 sm:-left-6 md:-left-8 bg-[#e6ff2a] border-none text-black hover:bg-[#d4eb00] hover:text-black w-10 h-10 [&_svg]:size-5" />
      <CarouselNext className="-right-4 sm:-right-6 md:-right-8 bg-[#e6ff2a] border-none text-black hover:bg-[#d4eb00] hover:text-black w-10 h-10 [&_svg]:size-5" />
    </Carousel>
  );
}
