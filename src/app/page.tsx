import { getHomeData } from '@/lib/api';
import { ContentCarousel } from '@/components/content/ContentCarousel';
import type { ContentItem } from '@/lib/types';

export default async function Home() {
  const homeData = await getHomeData();

  if (!homeData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Failed to load data.</h1>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const sections = [
    { title: 'Top 10 Anime', data: homeData.top10_anime, type: 'anime' },
    { title: 'Latest Anime Episodes', data: homeData.latest_anime, type: 'anime' },
    { title: 'Top 10 Films', data: homeData.top10_film, type: 'film' },
    { title: 'Latest Films', data: homeData.latest_film, type: 'film' },
    { title: 'From Around the World', data: homeData.jepang_korea_china_barat, type: 'series' },
    { title: 'Latest TV Shows', data: homeData.tv_show, type: 'series' },
  ];

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      {sections.map((section) => (
        section.data && section.data.length > 0 && (
          <ContentCarousel
            key={section.title}
            title={section.title}
            items={section.data as ContentItem[]}
          />
        )
      ))}
    </div>
  );
}
