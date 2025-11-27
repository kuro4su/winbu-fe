export type ContentItem = {
  title: string;
  type: string;
  id: string;
  link: string;
  image: string;
  release_date: string;
  description?: string;
  episode?: string;
  views?: number;
  rating?: string;
  rank?: number;
};

export type PaginationInfo = {
  current_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
};

export type HomeData = {
  top10_anime: ContentItem[];
  latest_anime: ContentItem[];
  top10_film: ContentItem[];
  latest_film: ContentItem[];
  jepang_korea_china_barat: ContentItem[];
  tv_show: ContentItem[];
};

export type AnimeDetail = {
  title: string;
  image: string;
  synopsis: string;
  info: {
    rating: string;
    status: string;
    studio: string;
    released: string;
    duration: string;
    season: string;
    type: string;
    episodes: string;
    fansub: string;
    genres: Genre[];
  };
  episodes: Episode[];
  recommendations: ContentItem[];
};

export type SeriesDetail = {
  title: string;
  image: string;
  synopsis: string;
  info: {
    rating: string;
    status: string;
    network: string;
    released: string;
    duration: string;
    season: string;
    country: string;
    episodes: string;
    genres: Genre[];
  };
  episodes: Episode[];
  recommendations: ContentItem[];
};

export type FilmDetail = {
  title: string;
  image: string;
  synopsis: string;
  info: {
    rating: string;
    quality: string;
    released: string;
    duration: string;
    country: string;
    director: string;
    genres: Genre[];
  };
  stream_options: Record<string, StreamOption[]>;
  downloads: DownloadOption[];
  recommendations: ContentItem[];
};

export type Genre = {
  name: string;
  slug: string;
  count: number;
  url?: string;
};

export type Episode = {
  id: string;
  title: string;
  date: string;
};

export type StreamOption = {
  server: string;
  url: string;
};

export type DownloadOption = {
  resolution: string;
  links: {
    server: string;
    url: string;
  }[];
};

export type EpisodeDetail = {
  title: string;
  video_url: string;
  stream_options: Record<string, StreamOption[]>;
  downloads: DownloadOption[];
  navigation: {
    prev_episode: string | null;
    next_episode: string | null;
    all_episodes: string;
  };
};

export type ServerData = {
  embed_url: string;
};

export type AnimeDonghuaData = {
  latest_anime: ContentItem[];
};

export type FilmListData = {
  latest_film: ContentItem[];
};

export type OthersListData = {
  latest_others: ContentItem[];
  jepang_korea_china_barat: ContentItem[];
};

export type TVShowData = {
  tv_show_list: ContentItem[];
};
