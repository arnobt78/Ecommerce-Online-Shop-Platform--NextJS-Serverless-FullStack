'use client';

import hero1 from '@/public/images/hero1.jpg';
import hero2 from '@/public/images/hero2.jpg';
import hero3 from '@/public/images/hero3.jpg';
import hero4 from '@/public/images/hero4.jpg';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <div className='hidden lg:block relative w-full'>
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        setApi={(api) => {
          api?.plugins().autoplay?.play();
        }}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className='p-2'>
                    <Image
                      src={image}
                      alt='hero'
                      className='w-full h-[24rem] rounded-md object-cover'
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className='!left-4 !-right-auto top-1/2 -translate-y-1/2 h-9 w-9 bg-black/30 hover:bg-black/50 border-0 text-white hover:text-white'
        />
        <CarouselNext
          className='!right-4 !-left-auto top-1/2 -translate-y-1/2 h-9 w-9 bg-black/30 hover:bg-black/50 border-0 text-white hover:text-white'
        />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
