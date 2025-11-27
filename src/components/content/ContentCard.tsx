import Image from 'next/image';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const href = `/${item.type}/${item.id}`;

  return (
    <Link href={href} className="group block">
      {/* Brutal Card */}
      <div className="brutal-card-hover bg-card overflow-hidden">
        <div className="relative aspect-[2/3] w-full bg-muted">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={`${item.type} poster`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {item.episode && (
              <div className="brutal-border bg-secondary text-secondary-foreground px-3 py-1 mb-2 inline-block">
                <span className="font-black text-xs uppercase">{item.episode}</span>
              </div>
            )}
            <h3 className="font-black text-base line-clamp-2 uppercase tracking-tight">
              {item.title}
            </h3>
          </div>

          {/* Rating Badge - Top Right */}
          {item.rating && (
            <div className="absolute top-3 right-3">
              <div className="brutal-border brutal-shadow-sm bg-destructive text-destructive-foreground px-3 py-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-black text-sm">{item.rating}</span>
              </div>
            </div>
          )}

          {/* Rank Badge - Top Left */}
          {item.rank && (
            <div className="absolute top-3 left-3">
              <div className="brutal-border bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
                <span className="font-black text-sm">#{item.rank}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
