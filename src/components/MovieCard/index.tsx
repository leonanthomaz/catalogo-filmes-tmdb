import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { Star, CalendarToday, Visibility } from '@mui/icons-material';
import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/1E1E1E/FFD700?text=No+Image';

  const formatVoteCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getYearFromDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(145deg, #1E1E1E 0%, #2A2A2A 100%)',
        border: '1px solid rgba(255, 215, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 50px rgba(255, 215, 0, 0.2)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
        }
      }}
    >
      {/* Container da imagem com proporção fixa */}
      <Box sx={{ position: 'relative', width: '100%', pt: '150%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={movie.title}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'scale(1.05)'
            }
          }}
        />
        
        {/* Overlays de informações */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Chip
            icon={<Star sx={{ fontSize: 16 }} />}
            label={movie.vote_average.toFixed(1)}
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#FFD700',
              fontWeight: 600,
              backdropFilter: 'blur(10px)'
            }}
          />
        </Box>
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Chip
            icon={<Visibility sx={{ fontSize: 16 }} />}
            label={formatVoteCount(movie.vote_count)}
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#FFFFFF',
              fontWeight: 500,
              backdropFilter: 'blur(10px)'
            }}
          />
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: '#FFFFFF',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3.5rem',
            lineHeight: 1.3
          }}
        >
          {movie.title}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <CalendarToday sx={{ fontSize: 18, color: '#FFD700' }} />
          <Typography variant="body2" sx={{ color: '#B0B0B0', fontWeight: 500 }}>
            {getYearFromDate(movie.release_date)}
          </Typography>
        </Stack>
        
        <Typography
          variant="body2"
          sx={{
            color: '#B0B0B0',
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}
        >
          {movie.overview || 'Sinopse não disponível.'}
        </Typography>
        
        {movie.genre_ids && movie.genre_ids.length > 0 && (
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {movie.genre_ids.slice(0, 2).map((genreId) => (
              <Chip
                key={genreId}
                label={`Gênero ${genreId}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  color: '#FFD700',
                  fontSize: '0.7rem',
                  height: '24px'
                }}
              />
            ))}
            {movie.genre_ids.length > 2 && (
              <Chip
                label={`+${movie.genre_ids.length - 2}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#B0B0B0',
                  fontSize: '0.7rem',
                  height: '24px'
                }}
              />
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;