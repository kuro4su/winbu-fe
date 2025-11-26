'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { StreamOption } from '@/lib/types';
import { getServerUrl } from '@/lib/api';
import { Loader2, PlayCircle, Server as ServerIcon, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoPlayerProps {
  streamOptions: StreamOption[];
}

export function VideoPlayer({ streamOptions }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const handleServerClick = async (option: StreamOption) => {
    setIsLoading(true);
    setError(null);
    setEmbedUrl(null);
    setSelectedServer(option.server);

    try {
      const serverData = await getServerUrl(option.data_post, option.data_nume, option.data_type);
      if (serverData?.embed_url) {
        setEmbedUrl(serverData.embed_url);
      } else {
        throw new Error('Embed URL not found.');
      }
    } catch (e) {
      setError('Failed to load video from this server. Please try another one.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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
            <iframe
              src={embedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
              className="h-full w-full rounded-md"
            ></iframe>
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
                  <p>Select a server to begin streaming.</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="space-y-2">
            <p className="font-semibold text-sm">Available Servers:</p>
            <div className="flex flex-wrap gap-2">
            {streamOptions.map((option) => (
                <Button
                key={option.data_nume}
                onClick={() => handleServerClick(option)}
                disabled={isLoading && selectedServer === option.server}
                variant={selectedServer === option.server ? 'default' : 'secondary'}
                >
                {isLoading && selectedServer === option.server ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <ServerIcon className="mr-2 h-4 w-4" />
                )}
                {option.server}
                </Button>
            ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
