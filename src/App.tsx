import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";
import CustomPaginationActionsTable from './components/GlobalTable';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path='/aaa' element={<CustomPaginationActionsTable/>}/>
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
