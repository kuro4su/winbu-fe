'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import type { StreamOption } from '@/lib/types';
import { getServerUrl } from '@/lib/api';
import { Loader2, PlayCircle, Server as ServerIcon, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VideoPlayerProps {
  streamOptions: Record<string, StreamOption[]>; // Changed to object with resolution keys
}

export function VideoPlayer({ streamOptions }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServerKey, setSelectedServerKey] = useState<string | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<string>('');

  // Get available resolutions
  const resolutions = useMemo(() => {
    return Object.keys(streamOptions).filter(res => streamOptions[res].length > 0);
  }, [streamOptions]);

  // Set default resolution on mount
  useMemo(() => {
    if (resolutions.length > 0 && !selectedResolution) {
      setSelectedResolution(resolutions[0]);
    }
  }, [resolutions, selectedResolution]);

  const handleServerClick = async (option: StreamOption, key: string) => {
    setIsLoading(true);
    setError(null);
    setEmbedUrl(null);
    setSelectedServerKey(key);

    try {
      const serverData = await getServerUrl(option.data_post, option.data_nume, option.data_type);
      if (serverData?.embed_url) {
        let url = serverData.embed_url;
        // The scraper might return a relative URL, so we prepend the origin if needed.
        if (url.startsWith('//')) {
          url = 'https:' + url;
        }

        // Basic URL validation
        try {
          new URL(url);
          setEmbedUrl(url);
        } catch (e) {
          throw new Error('Invalid embed URL received.');
        }

      } else {
        throw new Error('Embed URL not found.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to load video from this server. Please try another one.`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current resolution servers
  const currentServers = useMemo(() => {
    if (!selectedResolution || !streamOptions[selectedResolution]) return [];
    return streamOptions[selectedResolution];
  }, [selectedResolution, streamOptions]);

  // Generate server display names for current resolution
  const serverDisplayNames = useMemo(() => {
    const names: Record<string, string> = {};
    const serverCounts: Record<string, number> = {};

    currentServers.forEach(option => {
      serverCounts[option.server] = (serverCounts[option.server] || 0) + 1;
    });

    const counters: Record<string, number> = {};
    currentServers.forEach(option => {
      const key = `${option.server}-${option.data_nume}`;
      if (serverCounts[option.server] > 1) {
        counters[option.server] = (counters[option.server] || 0) + 1;
        names[key] = `${option.server} ${counters[option.server]}`;
      } else {
        names[key] = option.server;
      }
    });
    return names;
  }, [currentServers]);

  if (resolutions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle />
            Stream Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No stream options available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle />
          Stream Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full rounded-lg bg-card-foreground/5 flex items-center justify-center">
          {embedUrl ? (
            // Check if the URL is a direct video file (ends with .mp4, .webm, etc) or contains /dl/
            embedUrl.match(/\.(mp4|webm|ogg)$/i) || embedUrl.includes('/dl/') ? (
              <video
                controls
                autoPlay
                className="h-full w-full rounded-md"
                title="Video Player"
              >
                <source src={embedUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={embedUrl}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Video Player"
                className="h-full w-full rounded-md"
              ></iframe>
            )
          ) : (
            <div className="text-center text-muted-foreground">
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : error ? (
                <div className='flex flex-col items-center gap-2'>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                  <p className='max-w-xs'>{error}</p>
                </div>
              ) : (
                <div className='flex flex-col items-center gap-2'>
                  <PlayCircle className="h-12 w-12" />
                  <p>Select a resolution and server to begin streaming.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Resolution Tabs */}
        <Tabs value={selectedResolution} onValueChange={setSelectedResolution}>
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${resolutions.length}, 1fr)` }}>
            {resolutions.map(res => (
              <TabsTrigger key={res} value={res}>{res}</TabsTrigger>
            ))}
          </TabsList>

          {resolutions.map(res => (
            <TabsContent key={res} value={res} className="mt-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {streamOptions[res].map((option) => {
                    const key = `${option.server}-${option.data_nume}`;
                    return (
                      <Button
                        key={key}
                        onClick={() => handleServerClick(option, key)}
                        disabled={isLoading && selectedServerKey === key}
                        variant={selectedServerKey === key ? 'default' : 'secondary'}
                      >
                        {isLoading && selectedServerKey === key ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ServerIcon className="mr-2 h-4 w-4" />
                        )}
                        {serverDisplayNames[key]}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
