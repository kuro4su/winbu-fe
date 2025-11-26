import type { HomeData, AnimeDetail, SeriesDetail, FilmDetail, EpisodeDetail, ServerData } from './types';

// In a real app, you would set this based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9002';

async function fetchAPI<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api${path}`, {
      // Using cache: 'no-store' to simulate real-time scraping as per docs
      cache: 'no-store', 
    });
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for path ${path}`);
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Fetch API failed:', error);
    return null;
  }
}

export const getHomeData = (): Promise<HomeData | null> => fetchAPI('/home');
export const getAnimeDetails = (id: string): Promise<AnimeDetail | null> => fetchAPI(`/anime/${id}`);
export const getSeriesDetails = (id: string): Promise<SeriesDetail | null> => fetchAPI(`/series/${id}`);
export const getFilmDetails = (id: string): Promise<FilmDetail | null> => fetchAPI(`/film/${id}`);
export const getEpisodeDetails = (id: string): Promise<EpisodeDetail | null> => fetchAPI(`/episode/${id}`);
export const getServerUrl = (id: string, nume: string, type: string): Promise<ServerData | null> => fetchAPI(`/server/${id}?nume=${nume}&type=${type}`);
