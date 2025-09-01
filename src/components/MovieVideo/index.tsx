// src/components/MovieVideo.tsx
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, useTheme, alpha } from '@mui/material';
import { serverApi } from "../../services/api/server";

interface MovieVideoProps {
  tmdbId: number;
}

const MovieVideo: React.FC<MovieVideoProps> = ({ tmdbId }) => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    async function fetchEmbed() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await serverApi.getMovieEmbed(tmdbId);

        if (data.status === 'ok' && data.player_url) {
          setEmbedUrl(data.player_url);
        } else {
          setError('Não foi possível encontrar um vídeo para este filme.');
        }
      } catch (err: any) {
        console.error("Erro ao buscar vídeo:", err);
        setError("Erro ao carregar o player de vídeo. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmbed();
  }, [tmdbId]);

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 600, 
          width: '100%',
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          borderRadius: 2
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ ml: 2, color: theme.palette.text.secondary }}>
          Carregando vídeo...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 600, 
          width: '100%',
          backgroundColor: alpha(theme.palette.error.dark, 0.1),
          borderRadius: 2
        }}
      >
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: 600, 
        overflow: 'hidden', 
        borderRadius: 2,
        boxShadow: `0 8px 20px ${alpha(theme.palette.background.default, 0.5)}`
      }}
    >
      <iframe
        src={embedUrl as string}
        title="Movie Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      ></iframe>
    </Box>
  );
};

export default MovieVideo;
