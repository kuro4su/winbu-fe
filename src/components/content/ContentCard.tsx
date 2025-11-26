import Image from 'next/image';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const href = `/${item.type}/${item.id}`;

  return (
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:border-primary/50">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              data-ai-hint={`${item.type} poster`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-primary-foreground">
              {item.episode && <Badge variant="secondary" className='mb-1'>{item.episode}</Badge>}
              <h3 className="font-bold line-clamp-2">{item.title}</h3>
            </div>
            {item.rating && (
              <Badge className="absolute top-2 right-2 flex items-center gap-1" variant="destructive">
                <Star className="h-3 w-3 fill-current" /> {item.rating}
              </Badge>
            )}
             {item.rank && (
              <Badge className="absolute top-2 left-2" variant="default">
                #{item.rank}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
