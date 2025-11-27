import type { HomeData, AnimeDetail, SeriesDetail, FilmDetail, EpisodeDetail, ServerData, AnimeDonghuaData, FilmListData, OthersListData, TVShowData, PaginationInfo, ContentItem, Genre } from './types';

const API_BASE_URL = '/api';

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
};

async function fetchAPI<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}${path}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`API Error: ${res.status} for ${path}`);
      return null;
    }
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error(`Fetch failed for ${path}:`, error);
    return null;
  }
}

export async function searchContent(query: string, page: number = 1): Promise<{ results: ContentItem[]; query: string; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return {
      results: json.results || [],
      query: json.query || query,
      pagination: json.pagination
    };
  } catch (error) {
    return null;
  }
}

export async function getHomeData(): Promise<HomeData | null> {
  return fetchAPI<HomeData>('/home');
}

export async function getAnimeDetails(id: string): Promise<AnimeDetail | null> {
  return fetchAPI<AnimeDetail>(`/anime/${id}`);
}

export async function getSeriesDetails(id: string): Promise<SeriesDetail | null> {
  return fetchAPI<SeriesDetail>(`/series/${id}`);
}

export async function getFilmDetails(id: string): Promise<FilmDetail | null> {
  return fetchAPI<FilmDetail>(`/film/${id}`);
}

export async function getEpisodeDetails(id: string): Promise<EpisodeDetail | null> {
  return fetchAPI<EpisodeDetail>(`/episode/${id}`);
}

export async function getAnimeDonghua(page: number = 1): Promise<{ data: AnimeDonghuaData; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/animedonghua?page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return { data: json.data, pagination: json.pagination };
  } catch (error) {
    return null;
  }
}

export async function getLatestFilms(page: number = 1): Promise<{ data: FilmListData; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/film?page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return { data: json.data, pagination: json.pagination };
  } catch (error) {
    return null;
  }
}

export async function getOthers(page: number = 1): Promise<{ data: OthersListData; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/others?page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return { data: json.data, pagination: json.pagination };
  } catch (error) {
    return null;
  }
}

export async function getTVShows(page: number = 1): Promise<{ data: ContentItem[]; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/tvshow?page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return { data: json.data.tv_show_list || [], pagination: json.pagination };
  } catch (error) {
    return null;
  }
}

export async function getServerUrl(id: string, nume: string, type: string): Promise<ServerData | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/server/${id}?nume=${nume}&type=${type}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const html = await res.text();
    const iframeSrcMatch = html.match(/<iframe[^>]+src="([^"]+)"/i);
    if (iframeSrcMatch?.[1]) {
      return { embed_url: iframeSrcMatch[1] };
    }
    const videoSrcMatch = html.match(/<source[^>]+src="([^"]+)"/i);
    if (videoSrcMatch?.[1]) {
      return { embed_url: videoSrcMatch[1] };
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Genre Functions
export async function getGenres(): Promise<Genre[] | null> {
  return fetchAPI<Genre[]>('/genres');
}

export async function getGenreContent(slug: string, page: number = 1): Promise<{ genre: string; data: ContentItem[]; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/genre/${slug}?page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

export async function getCatalog(page: number = 1, filters: any = {}): Promise<{ data: ContentItem[]; pagination: PaginationInfo } | null> {
  try {
    const baseUrl = getBaseUrl();
    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (filters.title) params.append('title', filters.title);
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);
    if (filters.order) params.append('order', filters.order);

    if (filters.genre) {
      if (Array.isArray(filters.genre)) {
        filters.genre.forEach((g: string) => params.append('genre[]', g));
      } else {
        params.append('genre[]', filters.genre);
      }
    }

    const url = `${baseUrl}${API_BASE_URL}/catalog?${params.toString()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return { data: json.data || [], pagination: json.pagination };
  } catch (error) {
    return null;
  }
}
