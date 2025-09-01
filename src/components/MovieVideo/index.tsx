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
    const fetchEmbed = async () => {
      setIsLoading(true);
      setError(null);
      setEmbedUrl(null);

      try {
        console.log(`Buscando embed para TMDB ID: ${tmdbId}`);
        const data = await serverApi.getMovieEmbed(tmdbId);
        console.log('Resposta da API:', data);

        if (data.status === 'ok' && data.player_url) {
          setEmbedUrl(data.player_url);
        } else if (data.status === 'error') {
          setError(data.message || 'Não foi possível encontrar um vídeo para este filme.');
        } else {
          setError('Resposta inesperada do servidor.');
        }
      } catch (err: any) {
        console.error("Erro ao buscar vídeo:", err);
        setError("Erro ao carregar o player de vídeo. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    if (tmdbId) {
      fetchEmbed();
    } else {
      setError("ID do filme não fornecido");
      setIsLoading(false);
    }
  }, [tmdbId]);

  if (isLoading) {
    return (
      <Box 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600, width: '100%', backgroundColor: alpha(theme.palette.background.paper, 0.5), borderRadius: 2, flexDirection: 'column' }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ mt: 2, color: theme.palette.text.secondary }}>
          Carregando vídeo...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600, width: '100%', backgroundColor: alpha(theme.palette.error.dark, 0.1), borderRadius: 2, p: 2, textAlign: 'center' }}
      >
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
          TMDB ID: {tmdbId}
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ width: '100%', height: 600, overflow: 'hidden', borderRadius: 2, boxShadow: `0 8px 20px ${alpha(theme.palette.background.default, 0.5)}` }}
    >
      {embedUrl && (
        <iframe
          src={embedUrl}
          title="Movie Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      )}
    </Box>
  );
};

export default MovieVideo;
