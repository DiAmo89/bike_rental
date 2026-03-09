import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing() {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="-ml-4">
        {Array.from({ length: 30 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-4"
            style={{ flexBasis: "calc(100% / 5)", flexShrink: 0 }}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-10">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-11 bg-[#e6ff2a] border-none text-black hover:bg-[#d4eb00] hover:text-black w-10 h-10 [&_svg]:size-5" />
      <CarouselNext className="-right-11 bg-[#e6ff2a] border-none text-black hover:bg-[#d4eb00] hover:text-black w-10 h-10 [&_svg]:size-5" />
    </Carousel>
  );
}
