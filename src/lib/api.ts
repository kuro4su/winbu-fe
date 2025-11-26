
import type { HomeData, AnimeDetail, SeriesDetail, FilmDetail, EpisodeDetail, ServerData, AnimeDonghuaData, FilmListData, OthersListData, TVShowData, PaginationInfo, ContentItem } from './types';

const API_BASE_URL = '/api';

const getBaseUrl = () => {
  // Always use backend URL directly
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
};


async function fetchAPI<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}${path}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for path ${path}`);
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Fetch API failed for path ${path}:`, error);
    return null;
  }
}

export const getHomeData = (): Promise<HomeData | null> => fetchAPI('/home');
export const getAnimeDetails = (id: string): Promise<AnimeDetail | null> => fetchAPI(`/anime/${id}`);
export const getSeriesDetails = (id: string): Promise<SeriesDetail | null> => fetchAPI(`/series/${id}`);
export const getFilmDetails = (id: string): Promise<FilmDetail | null> => fetchAPI(`/film/${id}`);
export const getEpisodeDetails = (id: string): Promise<EpisodeDetail | null> => fetchAPI(`/episode/${id}`);

export async function getAnimeDonghua(page: number = 1): Promise<{ data: AnimeDonghuaData; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/animedonghua?page=${page}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for animedonghua page ${page}`);
      return null;
    }

    const json = await res.json();
    return {
      data: json.data,
      pagination: json.pagination
    };
  } catch (error) {
    console.error(`Fetch API failed for animedonghua page ${page}:`, error);
    return null;
  }
}

export async function getLatestFilms(page: number = 1): Promise<{ data: FilmListData; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/film?page=${page}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for film page ${page}`);
      return null;
    }

    const json = await res.json();
    return {
      data: json.data,
      pagination: json.pagination
    };
  } catch (error) {
    console.error(`Fetch API failed for film page ${page}:`, error);
    return null;
  }
}

export async function getOthers(page: number = 1): Promise<{ data: OthersListData; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/others?page=${page}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for others page ${page}`);
      return null;
    }

    const json = await res.json();
    return {
      data: json.data,
      pagination: json.pagination
    };
  } catch (error) {
    console.error(`Fetch API failed for others page ${page}:`, error);
    return null;
  }
}

export async function getTVShows(page: number = 1): Promise<{ data: ContentItem[]; page: number; next_page: number; prev_page: number | null } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/tvshow?page=${page}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for tvshow page ${page}`);
      return null;
    }

    const json = await res.json();
    return {
      data: json.data,
      page: json.page,
      next_page: json.next_page,
      prev_page: json.prev_page
    };
  } catch (error) {
    console.error(`Fetch API failed for tvshow page ${page}:`, error);
    return null;
  }
}

export async function getServerUrl(id: string, nume: string, type: string): Promise<ServerData | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/server/${id}?nume=${nume}&type=${type}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for server ${id}`);
      return null;
    }

    // API now returns HTML instead of JSON
    const html = await res.text();

    // Try to find iframe src first (for embed URLs)
    const iframeSrcMatch = html.match(/<iframe[^>]+src="([^"]+)"/i);
    if (iframeSrcMatch && iframeSrcMatch[1]) {
      return {
        embed_url: iframeSrcMatch[1]
      };
    }

    // If no iframe, look for video source (direct video URL)
    const videoSrcMatch = html.match(/<source[^>]+src="([^"]+)"/i);
    if (videoSrcMatch && videoSrcMatch[1]) {
      return {
        embed_url: videoSrcMatch[1]
      };
    }

    console.error('Could not extract video URL from HTML response');
    console.log('HTML received:', html);
    return null;
  } catch (error) {
    console.error(`Fetch API failed for server ${id}:`, error);
    return null;
  }
}
