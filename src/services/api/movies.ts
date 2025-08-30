import { api } from '.';

export const moviesApi = {
  // Filmes populares
  getPopular: () => api.get('/movie/popular'),
  
  // Filmes em cartaz
  getNowPlaying: () => api.get('/movie/now_playing'),
  
  // Próximos lançamentos
  getUpcoming: () => api.get('/movie/upcoming'),
  
  // Melhores avaliados
  getTopRated: () => api.get('/movie/top_rated'),
  
  // Buscar filmes
  search: (query: string) => api.get('/search/movie', {
    params: { query }
  }),
  
  // Detalhes do filme
  getDetails: (id: number) => api.get(`/movie/${id}`, {
    params: { append_to_response: 'videos,credits' }
  }),
  
  // Gêneros
  getGenres: () => api.get('/genre/movie/list')
};