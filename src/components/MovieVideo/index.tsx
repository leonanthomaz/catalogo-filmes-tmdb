// src/components/MovieVideo/index.tsx
import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { serverApi } from '../../services/api/server';

interface MovieVideoProps {
  tmdbId: number;
}

const MovieVideo: React.FC<MovieVideoProps> = ({ tmdbId }) => {
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchPlayerUrl = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Chama sua API para obter a URL do player
        const response = await serverApi.getMovieEmbed(tmdbId);
        
        if (response.data.status === 'ok' && response.data.player_url) {
          setPlayerUrl(response.data.player_url);
        } else {
          setError('Player não disponível para este filme');
        }
      } catch (err) {
        console.error('Erro ao buscar URL do player:', err);
        setError('Erro ao carregar o player');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerUrl();
  }, [tmdbId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!playerUrl) {
    return (
      <Box sx={{ textAlign: 'center', p: 4, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">
          Player não disponível
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '70vh', maxHeight: '600px' }}>
      <iframe
        src={playerUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: theme.palette.background.default
        }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={`Player for TMDB ID: ${tmdbId}`}
      />
    </Box>
  );
};

export default MovieVideo;