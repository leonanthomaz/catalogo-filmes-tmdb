import { Box, Typography, CircularProgress, keyframes, useTheme, useMediaQuery } from '@mui/material';
import { SiPython, SiReact, SiDocker, SiPostgresql } from 'react-icons/si';
import { FaFlask, FaVial } from 'react-icons/fa';

// Animações
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const stacks = [SiPython, SiReact, SiDocker, SiPostgresql];
const labItems = [FaFlask, FaVial];

const Loading = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        color: 'white',
      }}
    >
      {/* Stack icons */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        {stacks.map((Icon, idx) => (
          <Box key={idx} sx={{ animation: `${pulse} ${2 + idx}s infinite`, fontSize: isMobile ? 40 : 60 }}>
            <Icon color="#61dafb" />
          </Box>
        ))}
      </Box>

      {/* Frascos de laboratório */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {labItems.map((Icon, idx) => (
          <Box key={idx} sx={{ animation: `${float} ${3 + idx}s ease-in-out infinite`, fontSize: isMobile ? 30 : 50, color: '#90caf9' }}>
            <Icon />
          </Box>
        ))}
      </Box>

      {/* Circular progress */}
      <CircularProgress size={isMobile ? 60 : 80} thickness={4} color="primary" sx={{ animation: `${pulse} 2s infinite` }} />

      {/* Mensagem */}
      <Typography variant={isMobile ? "body1" : "h6"} sx={{ mt: 2, fontWeight: 500, textAlign: 'center' }}>
        Carregando Sandbox...
      </Typography>
    </Box>
  );
};

export default Loading;
