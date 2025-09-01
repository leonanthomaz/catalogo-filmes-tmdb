// src/components/MovieVideo.tsx
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Button, Typography, Paper, alpha, useTheme } from "@mui/material";
import { serverApi } from "../../services/api/server";
import { OpenInNew } from "@mui/icons-material";

interface MovieVideoProps {
  tmdbId: number;
}

const MovieVideo: React.FC<MovieVideoProps> = ({ tmdbId }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      setVideoUrl(null);

      try {
        const data = await serverApi.getMovieEmbed(tmdbId);

        if (data.status === "ok" && data.player_url) {
          setVideoUrl(data.player_url);
        } else if (data.status === "not_found") {
          setError("Vídeo não disponível para este filme.");
        } else {
          setError(data.message || "Erro ao buscar vídeo.");
        }
      } catch (err: any) {
        setError("Erro ao carregar vídeo. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (tmdbId) fetchVideo();
    else setLoading(false);
  }, [tmdbId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          width: "100%",
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          borderRadius: 2,
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>
          Carregando link...
        </Typography>
      </Box>
    );
  }

  if (error || !videoUrl) {
    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          width: "100%",
          backgroundColor: alpha(theme.palette.grey[200], 0.5),
          borderRadius: 2,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography color="textSecondary">{error || "Vídeo não disponível"}</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        endIcon={<OpenInNew />}
        onClick={() => window.open(videoUrl, "_blank")}
      >
        Assistir filme
      </Button>
    </Box>
  );
};

export default MovieVideo;
