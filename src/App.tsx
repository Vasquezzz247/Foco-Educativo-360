import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

import LandingPage from './pages/LandingPage';
import CapsulesPage from './pages/CapsulesPage/CapsulesPage';
import Background from './components/ui/Background/Background';
import PageLayout from './components/layout/PageLayout';
import backgroundImage from './assets/images/background/background-site.png';

/* Páginas temporales (pueden moverse luego a /pages) */
const LoginPage: React.FC = () => (
  <div>
    <h1>Página de inicio de sesión</h1>
    <p>Aquí irá el formulario de login.</p>
  </div>
);

const DashboardPage: React.FC = () => (
  <div>
    <h1>Panel principal</h1>
    <p>Aquí irá el contenido para usuarios autenticados.</p>
  </div>
);

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>

          {/* Landing */}
          <Route
            path="/"
            element={
              <Background
                imagePath={backgroundImage}
                opacity={1}
                overlay
                overlayColor="#000"
                overlayOpacity={0.4}
              >
                <LandingPage />
              </Background>
            }
          />

          {/* Cápsulas */}
          <Route
            path="/capsulas"
            element={
              <Background imagePath={backgroundImage}>
                <CapsulesPage />
              </Background>
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              <Background imagePath={backgroundImage}>
                <LoginPage />
              </Background>
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Background imagePath={backgroundImage}>
                <DashboardPage />
              </Background>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div>
                <h1>404</h1>
                <p>Página no encontrada.</p>
              </div>
            }
          />

        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;