import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Container,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Theaters,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  icon?: React.ReactNode;
  description?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, icon }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getIconForTitle = (title: string) => {
    switch (title.toLowerCase()) {
      case 'populares':
        return <TrendingUp sx={{ fontSize: 28 }} />;
      case 'em cartaz':
        return <Theaters sx={{ fontSize: 28 }} />;
      case 'melhores avaliados':
        return <Star sx={{ fontSize: 28 }} />;
      default:
        return icon;
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && !isMobile) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [movies, isMobile]);

  if (movies.length === 0) return null;

  // Limita o número de filmes para mobile
  const moviesToShow = isMobile ? movies.slice(0, 3) : movies;

  return (
    <Box sx={{ py: 6, background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {getIconForTitle(title)}
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FFD700 30%, #FFC400 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {title}
            </Typography>
          </Stack>

          {/* Navegação ou Botão "Ver Mais" */}
          {!isMobile ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => scroll('left')}
                sx={{
                  color: showLeftArrow ? 'primary.main' : 'rgba(255, 215, 0, 0.3)',
                  backgroundColor: showLeftArrow ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                  border: '1px solid',
                  borderColor: showLeftArrow ? 'primary.main' : 'rgba(255, 215, 0, 0.2)',
                  opacity: showLeftArrow ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: showLeftArrow ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                    transform: 'translateX(-2px)'
                  }
                }}
                disabled={!showLeftArrow}
              >
                <ChevronLeft />
              </IconButton>
              
              <IconButton
                onClick={() => scroll('right')}
                sx={{
                  color: showRightArrow ? 'primary.main' : 'rgba(255, 215, 0, 0.3)',
                  backgroundColor: showRightArrow ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                  border: '1px solid',
                  borderColor: showRightArrow ? 'primary.main' : 'rgba(255, 215, 0, 0.2)',
                  opacity: showRightArrow ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: showRightArrow ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                    transform: 'translateX(2px)'
                  }
                }}
                disabled={!showRightArrow}
              >
                <ChevronRight />
              </IconButton>
            </Stack>
          ) : (
            <Button
              variant="text"
              endIcon={<ArrowForward />}
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontWeight: 600,
              }}
              onClick={() => console.log('Navegar para a página de todos os filmes')} // Ação do botão "Ver Mais"
            >
              Ver Mais
            </Button>
          )}
        </Stack>

        {/* Listagem de filmes */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: isMobile ? 'block' : 'flex',
            gap: 3,
            overflowX: isMobile ? 'unset' : 'auto',
            scrollSnapType: isMobile ? 'unset' : 'x mandatory',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            pb: 3,
            mx: isMobile ? 'unset' : -2,
            px: isMobile ? 'unset' : 2,
          }}
        >
          {moviesToShow.map((movie) => (
            <Box
              key={movie.id}
              sx={{
                flexShrink: isMobile ? 'unset' : 0,
                width: isMobile ? '100%' : { xs: '180px', sm: '220px', md: '280px' },
                scrollSnapAlign: isMobile ? 'unset' : 'start',
                mb: isMobile ? 3 : 0, // Adiciona margem inferior entre os cards em modo mobile
              }}
            >
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MovieCarousel;