import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import LandingPage from './pages/LandingPage';
import CapsulesPage from './pages/CapsulesPage/CapsulesPage';
import Background from './components/ui/Background/Background';
import PageLayout from './components/layout/PageLayout';
import backgroundImage from './assets/images/background/background-site.png';

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={
            <Background 
              imagePath={backgroundImage}
              opacity={1}
              overlay={true}
              overlayColor="#0000"
              overlayOpacity={0.4}
            >
              <LandingPage />
            </Background>
          } />

          <Route path="/capsulas" element={
            <Background 
              imagePath={backgroundImage}
            >
             <CapsulesPage />
           </Background>
         } />
          
          {/* Mas rutas... */}
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;