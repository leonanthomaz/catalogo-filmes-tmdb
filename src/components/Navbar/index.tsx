import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Movie as MovieIcon, Search, Refresh } from '@mui/icons-material';

interface NavbarProps {
  onRefresh: () => void;
  refreshing: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh, refreshing }) => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ mb: 2 }}>
      <Toolbar>
        <MovieIcon sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
        
        <Typography
          variant="h4"
          component="div"
          sx={{ 
            flexGrow: 1, 
            color: 'primary.main',
            fontWeight: 800,
            background: 'linear-gradient(45deg, #FFD700 30%, #FFC400 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          MovieCatalog
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button color="inherit" sx={{ color: 'secondary.main', fontWeight: 600 }}>
            Início
          </Button>
          <Button color="inherit" sx={{ color: 'secondary.main', fontWeight: 600 }}>
            Filmes
          </Button>
          <Button color="inherit" sx={{ color: 'secondary.main', fontWeight: 600 }}>
            Séries
          </Button>
          
          <IconButton 
            onClick={onRefresh} 
            disabled={refreshing}
            sx={{ 
              color: refreshing ? 'text.disabled' : 'primary.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: refreshing ? 'none' : 'rotate(180deg)'
              }
            }}
          >
            <Refresh />
          </IconButton>
          
          <IconButton color="inherit">
            <Search sx={{ color: 'secondary.main' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;