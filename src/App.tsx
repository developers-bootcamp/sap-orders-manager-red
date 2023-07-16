import './App.css';
import { BrowserRouter, Route} from 'react-router-dom'
import { Routes} from 'react-dom'
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";
import CustomPaginationActionsTable from './components/GlobalTable';
import GlobalLoader from './axios/loading/GlobalLoader';
import './axios/globalAxios';

const App: React.FC = () => {

  return (
    <>
      <GlobalLoader />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/aaa' element={<CustomPaginationActionsTable />} />
        </ Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
