// src/services/api/server.tsx

import axios from "axios";

export const serverApi = {
  getMovieEmbed: async (tmdbId: number) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/movie/${tmdbId}`);
      return res.data;
    } catch (err: any) {
      console.error("Erro no serverApi.getMovieEmbed:", err);
      return { status: "error", message: err.message || "Erro desconhecido" };
    }
  },
};
