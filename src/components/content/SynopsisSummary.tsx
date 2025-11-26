'use client';

import { useState } from 'react';
import { summarizeContentSynopsis } from '@/ai/flows/summarize-content-synopsis';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

interface SynopsisSummaryProps {
  synopsis: string;
}

export function SynopsisSummary({ synopsis }: SynopsisSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeContentSynopsis({ synopsis });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate AI summary. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleSummarize} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Summarize with AI
      </Button>

      {isLoading && (
         <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>Generating Summary</AlertTitle>
          <AlertDescription>
            The AI is reading the synopsis and crafting a summary for you. Please wait...
          </AlertDescription>
        </Alert>
      )}

      {summary && (
        <Alert variant="default" className="border-accent">
          <Sparkles className="h-4 w-4 text-accent" />
          <AlertTitle>AI Summary</AlertTitle>
          <AlertDescription>{summary}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
