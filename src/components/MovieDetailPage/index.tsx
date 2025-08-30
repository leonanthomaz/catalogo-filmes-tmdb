// src/components/MovieDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Stack,
    Chip,
    Button,
} from '@mui/material';
import {
    Star,
    CalendarToday,
    AccessTime,
    Language,
    Group,
    Movie as MovieIcon,
} from '@mui/icons-material';
import { moviesApi } from '../../services/api/movies';
import type { Movie, MovieDetails, Cast, Crew } from '../../types/movie';
import { useGlobal } from '../../context/GlobalContext'; // Importe o hook useGlobal

interface RecommendedMovies {
    results: Movie[];
}

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [credits, setCredits] = useState<{ cast: Cast[], crew: Crew[] } | null>(null);
    const [recommended, setRecommended] = useState<RecommendedMovies | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { setIsLoading } = useGlobal(); // Chame o hook useGlobal para pegar a função setIsLoading

    useEffect(() => {
        const fetchMovieData = async () => {
            if (!id) return;

            setIsLoading(true); // Ativa o loading antes de iniciar a requisição
            setError(null);

            try {
                const [detailsRes, recommendationsRes] = await Promise.all([
                    moviesApi.getDetails(Number(id)),
                    moviesApi.getRecommendations(Number(id))
                ]);
                
                setMovie(detailsRes.data);
                setCredits(detailsRes.data.credits); 
                setRecommended(recommendationsRes.data);

            } catch (err) {
                console.error("Erro ao carregar os dados do filme:", err);
                setError('Não foi possível carregar os detalhes do filme.');
            } finally {
                setIsLoading(false); // Desativa o loading ao final da requisição (com sucesso ou com erro)
            }
        };

        fetchMovieData();
    }, [id, setIsLoading]);

    // O seu componente Loading já é gerenciado pelo GlobalProvider,
    // então você pode remover a lógica de renderização condicional
    // que estava dentro deste componente.

    if (error || !movie) {
        return (
            <Box sx={{ textAlign: 'center', p: 4, color: '#B0B0B0', background: '#0F0F0F' }}>
                <Typography variant="h5" color="error">{error || 'Filme não encontrado.'}</Typography>
            </Box>
        );
    }
    
    // O componente de Loading será renderizado pelo GlobalProvider.
    // Portanto, você não precisa mais do "if (loading)" no topo do componente.
    // Agora, a renderização só acontece quando os dados estão disponíveis.
    
    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : 'https://via.placeholder.com/1920x1080/1E1E1E/FFD700?text=No+Backdrop+Image';
        
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/300x450/1E1E1E/FFD700?text=No+Image';

    // Componente auxiliar para Card de Pessoa
    const PersonCard = ({ person }: { person: Cast | Crew }) => {
        const profileUrl = person.profile_path
            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
            : 'https://via.placeholder.com/200x300/1E1E1E/B0B0B0?text=Sem+Foto';
            
        return (
            <Box sx={{ textAlign: 'center', p: 1, '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
                <Box
                    component="img"
                    src={profileUrl}
                    alt={person.name}
                    sx={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                />
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: '#FFF' }}>
                    {person.name}
                </Typography>
                {('character' in person) && (
                    <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                        {person.character}
                    </Typography>
                )}
                {('job' in person) && (
                    <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                        {person.job}
                    </Typography>
                )}
            </Box>
        );
    };
    
    // Componente auxiliar para Card de Filme
    const MovieRecommendationCard = ({ movie }: { movie: Movie }) => {
        const recommendationPosterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450/1E1E1E/FFD700?text=Sem+Imagem';
            
        return (
            <Box sx={{ textAlign: 'center', cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)', transition: 'transform 0.3s' } }}>
                <Box
                    component="img"
                    src={recommendationPosterUrl}
                    alt={movie.title}
                    sx={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                />
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: '#FFF' }}>
                    {movie.title}
                </Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ background: '#0F0F0F', color: '#FFFFFF', minHeight: '100vh' }}>
            {/* Banner/Backdrop Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: 'auto', md: '600px' },
                    overflow: 'hidden',
                    pt: { xs: 8, md: 0 },
                    pb: { xs: 8, md: 0 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${backdropUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(5px) brightness(0.5)',
                        transform: 'scale(1.1)',
                    },
                }}
            >
                <Container maxWidth="lg" sx={{ zIndex: 1, position: 'relative' }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={4}
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                        {/* Poster Section */}
                        <Box
                            sx={{
                                width: { xs: '80%', sm: '60%', md: '40%' },
                                maxWidth: '400px',
                                flexShrink: 0,
                            }}
                        >
                            <Box
                                component="img"
                                src={posterUrl}
                                alt={movie.title}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                                    border: '2px solid rgba(255, 215, 0, 0.3)',
                                    display: 'block',
                                }}
                            />
                        </Box>

                        {/* Movie Info Section */}
                        <Box sx={{ color: '#E0E0E0', width: { xs: '100%', md: '60%' } }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: '#FFD700', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                                    {movie.title}
                                </Typography>
                                <Chip
                                    icon={<Star />}
                                    label={movie.vote_average.toFixed(1)}
                                    sx={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', fontWeight: 600, fontSize: '1rem' }}
                                />
                            </Stack>
                            <Typography variant="h5" sx={{ mb: 2, fontStyle: 'italic', color: '#B0B0B0' }}>
                                {movie.tagline}
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                {movie.release_date && <Chip icon={<CalendarToday />} label={`Lançamento: ${movie.release_date.slice(0, 4)}`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />}
                                {movie.runtime && <Chip icon={<AccessTime />} label={`Duração: ${movie.runtime} min`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />}
                                {movie.original_language && <Chip icon={<Language />} label={`Idioma: ${movie.original_language.toUpperCase()}`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />}
                            </Stack>
                            <Typography variant="body1" sx={{ mt: 4, mb: 4, lineHeight: 1.8, color: '#FFFFFF' }}>
                                {movie.overview}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                {movie.genres?.map(genre => (
                                    <Chip
                                        key={genre.id}
                                        label={genre.name}
                                        sx={{
                                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                            color: '#FFD700',
                                            fontWeight: 500,
                                        }}
                                    />
                                ))}
                            </Stack>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFC400 90%)',
                                    color: '#111',
                                    fontWeight: 700,
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 5px 15px rgba(255, 215, 0, 0.4)',
                                    }
                                }}
                            >
                                Assistir Trailer
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Seções Adicionais (Elenco e Recomendações) */}
            <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
                {/* Seção de Elenco Principal */}
                {credits && credits.cast.length > 0 && (
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3, borderLeft: '4px solid #FFD700', pl: 2, display: 'flex', alignItems: 'center' }}>
                            <Group sx={{ mr: 1 }} /> Elenco Principal
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                            {credits.cast.slice(0, 10).map((person) => (
                                <Box key={person.id} sx={{ flexShrink: 0, width: { xs: '35%', sm: '25%', md: '15%' } }}>
                                    <PersonCard person={person} />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* Seção de Filmes Recomendados */}
                {recommended && recommended.results.length > 0 && (
                    <Box>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3, borderLeft: '4px solid #FFD700', pl: 2, display: 'flex', alignItems: 'center' }}>
                            <MovieIcon sx={{ mr: 1 }} /> Filmes Recomendados
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                            {recommended.results.slice(0, 10).map((recMovie) => (
                                <Box key={recMovie.id} sx={{ flexShrink: 0, width: { xs: '35%', sm: '25%', md: '15%' } }}>
                                    <MovieRecommendationCard movie={recMovie} />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default MovieDetailPage;