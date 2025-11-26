export type ContentItem = {
  rank?: string;
  title: string;
  rating?: string;
  image: string;
  type: 'anime' | 'film' | 'series';
  id: string;
  link: string;
  episode?: string;
  time?: string;
  views?: string;
};

export type HomeData = {
  top10_anime: ContentItem[];
  latest_anime: ContentItem[];
  top10_film: ContentItem[];
  latest_film: ContentItem[];
  jepang_korea_china_barat: ContentItem[];
  tv_show: ContentItem[];
};

export type PaginationInfo = {
  current_page: number;
  total_pages: number;
  prev_page: number | null;
  next_page: number | null;
};

export type AnimeDonghuaData = {
  latest_anime: ContentItem[];
};

export type FilmListData = {
  latest_film: ContentItem[];
};

export type OthersListData = {
  jepang_korea_china_barat: ContentItem[];
};

export type TVShowData = {
  tv_show: ContentItem[];
};

export type Genre = {
  name: string;
  url: string;
};

export type Episode = {
  title: string;
  id: string;
  link: string;
};

export type Recommendation = ContentItem;

export type StreamOption = {
  server: string;
  data_post: string;
  data_nume: string;
  data_type: 'schtml';
};

export type AnimeDetail = {
  title: string;
  image: string;
  synopsis: string;
  info: {
    rating: string;
    season: string;
    genres: Genre[];
  };
  episodes: Episode[];
  recommendations: Recommendation[];
};

export type SeriesDetail = AnimeDetail;

export type FilmDetail = {
  title: string;
  image: string;
  synopsis: string;
  downloads: DownloadResolution[];
  stream_options: Record<string, StreamOption[]>;
  info: {
    rating: string;
    genres: Genre[];
  };
  recommendations: Recommendation[];
};

export type DownloadLink = {
  server: string;
  url: string;
};

export type DownloadResolution = {
  resolution: string;
  links: DownloadLink[];
};

export type EpisodeDetail = {
  title: string;
  downloads: DownloadResolution[];
  stream_options: Record<string, StreamOption[]>;
  note: string;
};

export type ServerData = {
  embed_url: string;
};
