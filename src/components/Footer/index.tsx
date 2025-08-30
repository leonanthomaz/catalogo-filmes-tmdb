import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 4,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container>
        <Stack spacing={4}>
          {/* Links */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              MovieCatalog
            </Typography>
            
            <Stack direction="row" spacing={3}>
              <Link href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Início
              </Link>
              <Link href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Filmes
              </Link>
              <Link href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Séries
              </Link>
              <Link href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Sobre
              </Link>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <YouTube />
              </IconButton>
            </Stack>
          </Stack>
          
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center' }}
          >
            © 2024 MovieCatalog. Todos os direitos reservados.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;