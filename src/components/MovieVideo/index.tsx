import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, useTheme, alpha, Paper } from "@mui/material";
import { serverApi } from "../../services/api/server";
import { PlayArrow, VideocamOff } from "@mui/icons-material";

interface MovieVideoProps {
  tmdbId: number;
}

const MovieVideo: React.FC<MovieVideoProps> = ({ tmdbId }) => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!tmdbId) {
      setError("ID do filme não fornecido");
      setIsLoading(false);
      return;
    }

    const fetchEmbed = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log(`Buscando embed para TMDB ID: ${tmdbId}`);
        const data = await serverApi.getMovieEmbed(tmdbId);
        console.log("Resposta da API:", data);

        if (data.status === "ok" && data.player_url) {
          setEmbedUrl(data.player_url);
        } else {
          setError(data.message || "Erro ao buscar vídeo.");
        }
      } catch (err: any) {
        console.error("Erro ao buscar vídeo:", err);
        setError("Erro ao carregar o player de vídeo. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmbed();
  }, [tmdbId]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
          width: "100%",
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          borderRadius: 2,
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ mt: 2, color: theme.palette.text.secondary }}>
          Carregando vídeo...
        </Typography>
      </Box>
    );
  }

  if (error || !embedUrl) {
    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
          width: "100%",
          backgroundColor: alpha(theme.palette.grey[200], 0.5),
          borderRadius: 2,
          p: 3,
          textAlign: "center",
        }}
      >
        <VideocamOff sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Vídeo não disponível
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          {error || "Não foi possível carregar o player de vídeo para este filme."}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <PlayArrow sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            TMDB ID: {tmdbId}
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Player principal (iframe)
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.12)}`,
      }}
    >
      <iframe
        src={embedUrl}
        title="Movie Player"
        allow="autoplay"
        style={{ width: "100%", height: "100%", border: "none" }}
      />

    </Box>
  );
};

export default MovieVideo;
