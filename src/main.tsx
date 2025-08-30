// src/main.tsx
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useMuiTheme from './styles/theme';
import { GlobalCss } from './styles/globalStyles';
import { GlobalProvider } from './context/GlobalContext';

const Root = () => {
    return (
        <MainApp />
    );
};

const MainApp = () => {
    const muiTheme = useMuiTheme;

    return (
     <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalCss />
        <GlobalProvider> 
          <App />
        </GlobalProvider>
      </MuiThemeProvider>
    );
};

createRoot(document.getElementById('root')!).render(<Root />);