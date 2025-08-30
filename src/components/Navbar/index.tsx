import React, { useState, useEffect, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import { Movie as MovieIcon, Search as SearchIcon } from '@mui/icons-material';
import { moviesApi } from '../../services/api/movies';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';

const MovieSearchCard = ({ movie, onClick }: { movie: Movie; onClick: () => void }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : 'https://via.placeholder.com/50x75/1E1E1E/FFD700?text=No+Image';

    return (
        <ListItem
            component="button" // Corrigido: usando a propriedade `component`
            onClick={onClick}
            sx={{
                width: '100%',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.08)',
                    borderRadius: '8px',
                },
                py: 1.5,
                transition: 'background-color 0.2s',
            }}
        >
            <ListItemAvatar>
                <Avatar src={posterUrl} variant="rounded" sx={{ width: 50, height: 75 }} />
            </ListItemAvatar>
            <ListItemText
                primary={movie.title}
                secondary={movie.release_date ? `(${movie.release_date.substring(0, 4)})` : ''}
                sx={{
                    ml: 2,
                    '& .MuiListItemText-primary': {
                        color: 'text.primary',
                        fontWeight: 600,
                    },
                    '& .MuiListItemText-secondary': {
                        color: 'text.secondary',
                    },
                }}
            />
        </ListItem>
    );
};

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleSearch = async () => {
            if (searchQuery.length > 2) {
                try {
                    const response = await moviesApi.search(searchQuery);
                    setSearchResults(response.data.results.slice(0, 5));
                    setShowResults(true);
                } catch (error) {
                    console.error('Erro ao buscar filmes:', error);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        };
        const timeoutId = setTimeout(handleSearch, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchRef]);

    const handleResultClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
        setShowResults(false);
        setSearchQuery('');
    };

    return (
        <AppBar position="sticky" elevation={0} sx={{ mb: 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        mr: 4,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                    onClick={() => navigate('/')}
                >
                    <MovieIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 800,
                            background: 'linear-gradient(45deg, #FFD700 30%, #FFC400 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        LeonanFilmes
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                    ref={searchRef}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Pesquisar filmes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                            if (searchResults.length > 0) setShowResults(true);
                        }}
                        sx={{
                            maxWidth: { xs: '100%', sm: '400px', md: '500px' }, // Corrigido: Limita o tamanho do input
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                color: 'text.primary',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.1) !important',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.main !important',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.main !important',
                                },
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'secondary.main',
                            },
                        }}
                    />

                    {showResults && searchResults.length > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                mt: 1,
                                width: '100%',
                                maxWidth: { xs: '100%', sm: '400px', md: '500px' }, // Corrigido: Alinha com o tamanho do input
                                backgroundColor: 'background.paper',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                zIndex: 1200,
                            }}
                        >
                            <List>
                                {searchResults.map((movie) => (
                                    <MovieSearchCard
                                        key={movie.id}
                                        movie={movie}
                                        onClick={() => handleResultClick(movie.id)}
                                    />
                                ))}
                            </List>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;