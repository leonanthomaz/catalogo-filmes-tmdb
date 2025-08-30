// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   CircularProgress,
//   Stack,
//   Chip,
//   Button,
// } from '@mui/material';
// import {
//   Star,
//   CalendarToday,
//   AccessTime,
//   Language,
// } from '@mui/icons-material';
// import type { Movie } from '../../types/movie';

// // Supondo que você tenha uma função para buscar um filme por ID
// const fetchMovieById = async (id: string): Promise<Movie | null> => {
//   try {
//     const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=SUA_API_KEY`);
//     if (!response.ok) {
//       throw new Error('Filme não encontrado.');
//     }
//     const data = await response.json();
//     return data as Movie;
//   } catch (error) {
//     console.error("Erro ao buscar detalhes do filme:", error);
//     return null;
//   }
// };

// const MovieDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [movie, setMovie] = useState<Movie | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       fetchMovieById(id)
//         .then(data => {
//           setMovie(data);
//           setLoading(false);
//         })
//         .catch(err => {
//           setError('Não foi possível carregar os detalhes do filme.');
//           console.error(err);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#111' }}>
//         <CircularProgress sx={{ color: '#FFD700' }} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: 'center', p: 4, color: '#B0B0B0', background: '#111' }}>
//         <Typography variant="h5" color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!movie) {
//     return (
//       <Box sx={{ textAlign: 'center', p: 4, color: '#B0B0B0', background: '#111' }}>
//         <Typography variant="h5">Filme não encontrado.</Typography>
//       </Box>
//     );
//   }

//   const backdropUrl = movie.backdrop_path
//     ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
//     : 'https://via.placeholder.com/1920x1080/1E1E1E/FFD700?text=No+Backdrop+Image';
    
//   const posterUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//     : 'https://via.placeholder.com/300x450/1E1E1E/FFD700?text=No+Image';

//   return (
//     <Box sx={{ background: '#0F0F0F', color: '#FFFFFF' }}>
//       {/* Banner/Backdrop Section */}
//       <Box
//         sx={{
//           position: 'relative',
//           height: { xs: '400px', md: '600px' },
//           overflow: 'hidden',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundImage: `url(${backdropUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'blur(5px) brightness(0.5)',
//             transform: 'scale(1.1)',
//           },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Container maxWidth="lg" sx={{ zIndex: 1, position: 'relative' }}>
//           {/* Usando Stack para o layout principal do conteúdo */}
//           <Stack
//             direction={{ xs: 'column', md: 'row' }}
//             spacing={4}
//             alignItems="center"
//           >
//             {/* Box para o pôster do filme */}
//             <Box
//               sx={{
//                 width: { xs: '80%', md: '40%' },
//                 maxWidth: { xs: '300px', md: '400px' }, // Limita a largura máxima para desktop
//                 flexShrink: 0, // Impede o encolhimento do pôster
//               }}
//             >
//               <Box
//                 component="img"
//                 src={posterUrl}
//                 alt={movie.title}
//                 sx={{
//                   width: '100%',
//                   height: 'auto',
//                   borderRadius: 2,
//                   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
//                   border: '2px solid rgba(255, 215, 0, 0.3)',
//                   display: 'block',
//                 }}
//               />
//             </Box>

//             {/* Box para as informações do filme */}
//             <Box sx={{ color: '#E0E0E0', width: { xs: '100%', md: '60%' } }}>
//               <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
//                 <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: 'primary.main', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
//                   {movie.title}
//                 </Typography>
//                 <Chip
//                   icon={<Star />}
//                   label={movie.vote_average.toFixed(1)}
//                   sx={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700', fontWeight: 600, fontSize: '1rem' }}
//                 />
//               </Stack>
//               <Typography variant="h5" sx={{ mb: 2, fontStyle: 'italic', color: '#B0B0B0' }}>
//                 {movie.tagline}
//               </Typography>
//               <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2 }}>
//                 <Chip icon={<CalendarToday />} label={`Lançamento: ${movie.release_date.slice(0, 4)}`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />
//                 <Chip icon={<AccessTime />} label={`Duração: ${movie.runtime} min`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />
//                 <Chip icon={<Language />} label={`Idioma: ${movie.original_language.toUpperCase()}`} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />
//               </Stack>
//               <Typography variant="body1" sx={{ mt: 4, mb: 4, lineHeight: 1.8, color: '#FFFFFF' }}>
//                 {movie.overview}
//               </Typography>
//               <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
//                 {movie.genres?.map(genre => (
//                   <Chip
//                     key={genre.id}
//                     label={genre.name}
//                     sx={{
//                       backgroundColor: 'rgba(255, 215, 0, 0.1)',
//                       color: '#FFD700',
//                       fontWeight: 500,
//                     }}
//                   />
//                 ))}
//               </Stack>
//               <Button
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   background: 'linear-gradient(45deg, #FFD700 30%, #FFC400 90%)',
//                   color: '#111',
//                   fontWeight: 700,
//                   transition: 'transform 0.2s ease-in-out',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 5px 15px rgba(255, 215, 0, 0.4)',
//                   }
//                 }}
//               >
//                 Assistir Trailer
//               </Button>
//             </Box>
//           </Stack>
//         </Container>
//       </Box>

//       {/* Outras seções (elenco, recomendações) podem vir aqui */}
//     </Box>
//   );
// };

// export default MovieDetailPage;