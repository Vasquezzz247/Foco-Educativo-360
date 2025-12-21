import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage/TestPage';
import { ContentProvider } from './context/ContentContext';
import { useEnvironment } from './hooks/useEnvironment';
import NavigationTracker from './components/shared/NavigationTracker';
import './styles/global.css';
import LandingPage from './pages/LandingPage';
import CapsulesPage from './pages/CapsulesPage/CapsulesPage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import ResourceDetailPage from './pages/ResourcesPage/resources/conociendo-el-cerebro/ResourceDetailPage';
import Background from './components/ui/Background/Background';
import PageLayout from './components/layout/PageLayout';
import backgroundImage from './assets/images/background/background-site.png';

function App() {
  const { enableTestPages } = useEnvironment();
  return (
    <ContentProvider>
      <Router>
        <NavigationTracker />
        <PageLayout>
          <Routes>
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
            
            <Route path="/capsulas" element={
              <Background 
                imagePath={backgroundImage}
                opacity={0.9}
                overlay={true}
                overlayColor="rgba(184, 234, 255, 0.1)"
                overlayOpacity={0.1}
              >
                <CapsulesPage />
              </Background>
            } />
            
            <Route path="/recursos" element={
              <Background 
                imagePath={backgroundImage}
                opacity={0.9}
                overlay={true}
                overlayColor="rgba(184, 234, 255, 0.1)"
                overlayOpacity={0.1}
              >
                <ResourcesPage />
              </Background>
            } />
            
            <Route path="/recursos/:slug" element={
              <Background 
                imagePath={backgroundImage}
                opacity={0.9}
                overlay={true}
                overlayColor="rgba(184, 234, 255, 0.1)"
                overlayOpacity={0.1}
              >
                <ResourceDetailPage />
              </Background>
            } />

            {enableTestPages && (
              <Route path="/test-page" element={
                <Background
                  imagePath={backgroundImage}
                  opacity={0.9}
                  overlay={true}
                  overlayColor="rgba(184, 234, 255, 0.1)"
                  overlayOpacity={0.1}
                >
                  <TestPage />
                </Background>
              } />
            )}
          </Routes>
        </PageLayout>
      </Router>
    </ContentProvider>
  );
}


export default App;