import type { HomeData, AnimeDetail, FilmDetail, EpisodeDetail, SeriesDetail, ServerData, ContentItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/placeholder/400/600';

const LOREM_SYNOPSIS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const allContent: Record<string, ContentItem> = {
  'one-piece': { id: 'one-piece', title: 'One Piece', image: getImage('anime-1'), type: 'anime', rating: '9.0', link: '/anime/one-piece' },
  'naruto-shippuden': { id: 'naruto-shippuden', title: 'Naruto Shippuden', image: getImage('anime-2'), type: 'anime', rating: '8.7', link: '/anime/naruto-shippuden' },
  'attack-on-titan': { id: 'attack-on-titan', title: 'Attack on Titan', image: getImage('anime-3'), type: 'anime', rating: '8.9', link: '/anime/attack-on-titan' },
  'your-name': { id: 'your-name', title: 'Your Name', image: getImage('film-1'), type: 'film', rating: '8.8', link: '/film/your-name' },
  'parasite': { id: 'parasite', title: 'Parasite', image: getImage('film-2'), type: 'film', rating: '8.5', link: '/film/parasite' },
  'breaking-bad': { id: 'breaking-bad', title: 'Breaking Bad', image: getImage('series-1'), type: 'series', rating: '9.5', link: '/series/breaking-bad' },
  'squid-game': { id: 'squid-game', title: 'Squid Game', image: getImage('series-2'), type: 'series', rating: '8.0', link: '/series/squid-game' },
  'the-witcher': { id: 'the-witcher', title: 'The Witcher', image: getImage('series-4'), type: 'series', rating: '8.2', link: '/series/the-witcher' },
};

export const getHomeDataMock = (): HomeData => ({
  top10_anime: [
    { ...allContent['one-piece'], rank: '1' },
    { ...allContent['naruto-shippuden'], rank: '2' },
    { ...allContent['attack-on-titan'], rank: '3' },
  ],
  latest_anime: [
    { ...allContent['one-piece'], episode: 'Episode 1108', time: '1 hour ago', views: '10k' },
    { ...allContent['naruto-shippuden'], episode: 'Episode 500', time: '2 hours ago', views: '5k' },
  ],
  top10_film: [
    { ...allContent['your-name'], rank: '1' },
    { ...allContent['parasite'], rank: '2' },
    { id: 'inception', title: 'Inception', image: getImage('film-3'), type: 'film', rating: '8.8', link: '/film/inception', rank: '3' },
  ],
  latest_film: [
    allContent['your-name'],
    allContent['parasite'],
  ],
  jepang_korea_china_barat: [
    allContent['squid-game'],
    { id: 'three-body-problem', title: 'Three-Body Problem', image: getImage('series-3'), type: 'series', rating: '7.8', link: '/series/three-body-problem' },
  ],
  tv_show: [
    allContent['breaking-bad'],
    allContent['the-witcher'],
  ],
});

export const getAnimeDetailMock = (id: string): AnimeDetail | null => {
  if (!allContent[id] || allContent[id].type !== 'anime') return null;
  return {
    title: allContent[id].title,
    image: allContent[id].image,
    synopsis: LOREM_SYNOPSIS,
    info: {
      rating: allContent[id].rating || 'N/A',
      season: 'Fall 2023',
      genres: [{ name: 'Action', url: '#' }, { name: 'Adventure', url: '#' }],
    },
    episodes: Array.from({ length: 5 }, (_, i) => ({
      title: `Episode ${i + 1}`,
      id: `${id}-episode-${i + 1}`,
      link: `/episode/${id}-episode-${i + 1}`,
    })),
    recommendations: [
      { id: 'rec-1', title: 'Gintama', image: getImage('recommendation-1'), type: 'anime', rating: '9.0', link: '#' },
      { id: 'rec-2', title: 'Bleach', image: getImage('recommendation-2'), type: 'anime', rating: '8.5', link: '#' },
    ],
  };
};

export const getSeriesDetailMock = (id: string): SeriesDetail | null => {
  if (!allContent[id] || allContent[id].type !== 'series') return null;
  return {
    title: allContent[id].title,
    image: allContent[id].image,
    synopsis: LOREM_SYNOPSIS,
    info: {
      rating: allContent[id].rating || 'N/A',
      season: '2022',
      genres: [{ name: 'Drama', url: '#' }, { name: 'Thriller', url: '#' }],
    },
    episodes: Array.from({ length: 8 }, (_, i) => ({
      title: `Season 1 Episode ${i + 1}`,
      id: `${id}-s1-episode-${i + 1}`,
      link: `/episode/${id}-s1-episode-${i + 1}`,
    })),
    recommendations: [
      { id: 'rec-3', title: 'Stranger Things', image: getImage('recommendation-3'), type: 'series', rating: '8.7', link: '#' },
    ],
  };
};

export const getFilmDetailMock = (id: string): FilmDetail | null => {
  if (!allContent[id] || allContent[id].type !== 'film') return null;
  return {
    title: allContent[id].title,
    image: allContent[id].image,
    synopsis: LOREM_SYNOPSIS,
    stream_options: [
      { server: 'Main Server', data_post: '12345', data_nume: '1', data_type: 'schtml' },
      { server: 'Backup Server', data_post: '12345', data_nume: '2', data_type: 'schtml' },
    ],
    info: {
      rating: allContent[id].rating || 'N/A',
      genres: [{ name: 'Sci-Fi', url: '#' }, { name: 'Animation', url: '#' }],
    },
    recommendations: [
      { id: 'rec-film-1', title: 'A Silent Voice', image: getImage('recommendation-2'), type: 'film', rating: '8.9', link: '#' },
    ],
  };
};

export const getEpisodeDetailMock = (id: string): EpisodeDetail | null => {
  return {
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    downloads: [
      {
        resolution: '1080p',
        links: [{ server: 'Google Drive', url: '#' }, { server: 'Mega', url: '#' }],
      },
      {
        resolution: '720p',
        links: [{ server: 'Google Drive', url: '#' }, { server: 'ZippyShare', url: '#' }],
      },
    ],
    stream_options: [
      { server: 'Server 1', data_post: '54321', data_nume: '1', data_type: 'schtml' },
      { server: 'Server 2', data_post: '54321', data_nume: '2', data_type: 'schtml' },
    ],
    note: "Select a server to start streaming.",
  };
};

export const getServerDataMock = (id: string, nume: string, type: string): ServerData => {
  // In a real scenario, you'd fetch this. Here, we return a sample video.
  return {
    embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', // A classic choice
  };
};
