import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";
import GlobalLoader from './components/loading/GlobalLoader';
import GlobalAxios from './axios/globalAxios';
import { getCurrencies } from './axios/currencyAxios';
import { setCurrencies } from './redux/slices/sliceCurrency';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/store';

const App: React.FC = () => {

  const dispatch = useAppDispatch()

  const getCurrenciesAsync = async () => {
    await getCurrencies().then(res => {
      dispatch(setCurrencies(res.data));
    });
  }

  useEffect(() => {
    getCurrenciesAsync();
  }, []);

  return (
    <>
      <GlobalAxios showError={false} />
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
      </ Routes>
    </>
  );
}

export default App;
