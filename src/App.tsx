import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";
import GlobalLoader from './components/loading/GlobalLoader';
import GlobalAxios from './axios/globalAxios';

const App: React.FC = () => {

  return (
    <>
      <GlobalAxios />
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
      </ Routes>
    </>
  );
}

export default App;
