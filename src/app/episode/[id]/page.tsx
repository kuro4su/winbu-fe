import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEpisodeDetails } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoPlayer } from '@/components/content/VideoPlayer';
import { Download, HardDrive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const episode = await getEpisodeDetails(params.id);

  if (!episode) {
    return {
      title: 'Episode Not Found',
    };
  }

  return {
    title: `${episode.title} - Bellonime`,
    description: `Watch ${episode.title} on Bellonime`,
    openGraph: {
      title: `${episode.title} - Bellonime`,
      description: `Watch ${episode.title} on Bellonime`,
    },
  };
}

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const episode = await getEpisodeDetails(params.id);

  if (!episode) {
    notFound();
  }

  return (
    <>
      <PageNavigation />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {episode.title}
            </h1>

          </div>

          <VideoPlayer streamOptions={episode.stream_options} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download />
                Download Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={episode.downloads[0]?.resolution || '720p'} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {episode.downloads.map(res => (
                    <TabsTrigger key={res.resolution} value={res.resolution}>{res.resolution}</TabsTrigger>
                  ))}
                </TabsList>
                {episode.downloads.map(res => (
                  <TabsContent key={res.resolution} value={res.resolution} className="mt-4">
                    <div className="space-y-2">
                      {res.links.map(link => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.server}>
                          <Button variant="outline" className="w-full justify-start">
                            <HardDrive className="mr-2 h-4 w-4" />
                            {link.server}
                          </Button>
                        </a>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
