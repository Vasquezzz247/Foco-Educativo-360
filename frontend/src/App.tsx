import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { useEnvironment } from './hooks/useEnvironment';
import NavigationTracker from './components/shared/NavigationTracker';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './styles/global.css';

// Páginas
import TestPage from './pages/TestPage/TestPage';
import LandingPage from './pages/LandingPage';
import CapsulesPage from './pages/CapsulesPage/CapsulesPage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import ResourceDetailPage from './pages/ResourcesPage/resources/conociendo-el-cerebro/ResourceDetailPage';
import DocentesPage from './pages/DocentesPage/DocentesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from '././pages/DashboardPage/DashboardPage';
import UserProfilePage from '././pages/UserProfilePage/UserProfilePage';

// Componentes UI
import Background from './components/ui/Background/Background';
import backgroundImage from './assets/images/background/background-site.png';

function App() {
  const { enableTestPages } = useEnvironment();
  
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <NavigationTracker />
  
          <Routes>
            {/* === PÁGINAS PÚBLICAS === */}
            
            {/* Inicio */}
            <Route path="/" element={
              <Background 
                imagePath={backgroundImage}
                opacity={1}
                overlay={true}
                overlayColor="#000"
                overlayOpacity={0.4}
              >
                <LandingPage />
              </Background>
            } />
            
            {/* Autenticación */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Contenido educativo (público o semi-público) */}
            <Route path="/capsulas" element={<CapsulesPage />} />
            <Route path="/recursos" element={<ResourcesPage />} />
            <Route path="/recursos/:slug" element={<ResourceDetailPage />} />
            <Route path="/docentes" element={<DocentesPage />} />
            
            {/* === PÁGINAS PROTEGIDAS (requieren login) === */}
            
            {/* Dashboard principal */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } />
            
            {/* Perfil de usuario */}
            <Route path="/perfil" element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            } />
            
            {/* Páginas de prueba (si están habilitadas) */}
            {enableTestPages && (
              <Route path="/test-page" element={
                <PrivateRoute>
                  <TestPage />
                </PrivateRoute>
              } />
            )}
            
            {/* Manejo de rutas no encontradas */}
            <Route path="*" element={
              <div style={{ 
                padding: '4rem', 
                textAlign: 'center',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                  Página no encontrada
                </p>
                <a 
                  href="/" 
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--color-primary)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}
                >
                  Volver al inicio
                </a>
              </div>
            } />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;