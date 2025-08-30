import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { PlayArrow, Info } from '@mui/icons-material';
import type { Movie } from '../../types/movie';

interface HeroProps {
  featuredMovie?: Movie;
}

const Hero: React.FC<HeroProps> = ({ featuredMovie }) => {
  const backgroundImage = featuredMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`
    : '';

  return (
    <Box
      sx={{
        background: backgroundImage
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`
          : 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: '600px' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.1
            }}
          >
            {featuredMovie?.title || 'Descubra Filmes Incríveis'}
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              opacity: 0.9,
              fontWeight: 400
            }}
          >
            {featuredMovie?.overview || 
             'Explore milhares de filmes, encontre seus favoritos e descubra novas histórias para amar.'}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700
              }}
            >
              Assistir
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<Info />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px'
                }
              }}
            >
              Mais Info
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;