'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ContentCard } from './ContentCard';
import { Button } from '@/components/ui/button';
import type { ContentItem } from '@/lib/types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  moreLink?: string;
}

export function ContentCarousel({ title, items, moreLink }: ContentCarouselProps) {
  return (
    <section className="brutal-border brutal-shadow bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
            {title}
          </h2>
          {moreLink && (
            <Link href={moreLink}>
              <Button
                variant="ghost"
                className="brutal-border brutal-shadow-sm bg-card font-black uppercase text-xs hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform px-4 py-2"
              >
                MORE
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          )}
        </div>
        <div className="h-1 w-20 bg-primary" />
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={`${item.id}-${index}`} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <ContentCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Brutal Navigation */}
        <CarouselPrevious className="left-0 brutal-border bg-primary text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform" />
        <CarouselNext className="right-0 brutal-border bg-primary text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform" />
      </Carousel>
    </section>
  );
}
