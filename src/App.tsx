// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

// Puedes ir creando estos dos poco a poco.
// Mientras tanto los dejamos aquí como componentes simples.
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

const App: React.FC = () => {
  return (
    <Router>
      {/* Layout básico con header/footer reutilizables */}
      <div className="app-layout">
        <header>
          <h1>Foco Educativo 360</h1>
          <nav>
            {/* Navegación base */}
            <a href="/">Inicio</a> | <a href="/login">Login</a> |{" "}
            <a href="/dashboard">Dashboard</a>
          </nav>
        </header>

        <main>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<LandingPage />} />

            {/* Rutas base adicionales */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Ruta para 404 */}
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
        </main>

        <footer>
          <small>© {new Date().getFullYear()} Foco Educativo 360</small>
        </footer>
      </div>
    </Router>
  );
};

export default App;
