'use server';

/**
 * @fileOverview A flow to summarize content synopses using GenAI.
 *
 * - summarizeContentSynopsis - A function that takes a content synopsis and returns a short summary.
 * - SummarizeContentSynopsisInput - The input type for the summarizeContentSynopsis function.
 * - SummarizeContentSynopsisOutput - The return type for the summarizeContentSynopsis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentSynopsisInputSchema = z.object({
  synopsis: z.string().describe('The synopsis of the anime or film.'),
});

export type SummarizeContentSynopsisInput = z.infer<typeof SummarizeContentSynopsisInputSchema>;

const SummarizeContentSynopsisOutputSchema = z.object({
  summary: z.string().describe('A short summary of the content synopsis.'),
});

export type SummarizeContentSynopsisOutput = z.infer<typeof SummarizeContentSynopsisOutputSchema>;

export async function summarizeContentSynopsis(
  input: SummarizeContentSynopsisInput
): Promise<SummarizeContentSynopsisOutput> {
  return summarizeContentSynopsisFlow(input);
}

const summarizeContentSynopsisPrompt = ai.definePrompt({
  name: 'summarizeContentSynopsisPrompt',
  input: {schema: SummarizeContentSynopsisInputSchema},
  output: {schema: SummarizeContentSynopsisOutputSchema},
  prompt: `Summarize the following synopsis in a concise manner:\n\n{{{synopsis}}}`,
});

const summarizeContentSynopsisFlow = ai.defineFlow(
  {
    name: 'summarizeContentSynopsisFlow',
    inputSchema: SummarizeContentSynopsisInputSchema,
    outputSchema: SummarizeContentSynopsisOutputSchema,
  },
  async input => {
    const {output} = await summarizeContentSynopsisPrompt(input);
    return output!;
  }
);
