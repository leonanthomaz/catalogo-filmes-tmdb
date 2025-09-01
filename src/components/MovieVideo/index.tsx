// src/components/MovieVideo/index.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { serverApi } from '../../services/api/server';
import { useGlobal } from '../../context/GlobalContext';

interface MovieVideoProps {
  tmdbId: number;
}

const MovieVideo: React.FC<MovieVideoProps> = ({ tmdbId }) => {
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGlobal();

  useEffect(() => {
    const fetchPlayerUrl = async () => {
      if (!tmdbId) return;
      setIsLoading(true);
      setError(null);
      setPlayerUrl(null);
      try {
        const response = await serverApi.getMovieEmbed(tmdbId);
        if (response.data.status === 'ok' && response.data.player_url) {
          setPlayerUrl(response.data.player_url);
        } else {
          setError(response.data.message || 'Player não encontrado.');
        }
      } catch (err) {
        console.error("Erro ao carregar URL do player:", err);
        setError('Não foi possível carregar o player de vídeo.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerUrl();
  }, [tmdbId, setIsLoading]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!playerUrl) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ position: 'relative', pt: '56.25%', width: '100%' }}>
      <iframe
        src={playerUrl}
        title="Player de Vídeo"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        }}
      />
    </Box>
  );
};

export default MovieVideo;