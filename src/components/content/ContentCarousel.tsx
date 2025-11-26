'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ContentCard } from './ContentCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {moreLink && (
            <Link href={moreLink}>
              <Button variant="ghost" size="sm">
                More
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full px-12"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={`${item.id}-${index}`} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <ContentCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-0" />
        <CarouselNext className="mr-0" />
      </Carousel>
    </Card>
  );
}
