import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import GlobalLoader from './components/loading/GlobalLoader';
import './axios/globalAxios';

const defaultTheme = createTheme();

const App: React.FC = () => {

  return (
    <>
      <GlobalLoader />
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LogIn />} />
            </ Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
