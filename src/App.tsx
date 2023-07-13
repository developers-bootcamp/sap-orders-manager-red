import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";
import GlobalLoader from './axios/loading/GlobalLoader';
import './axios/globalAxios';

const App: React.FC = () => {

  return (
    <>
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
