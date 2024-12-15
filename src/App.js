import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import KanbanBoard from './components/KanbanBoard';
import RolesPage from './components/RolesPage';
import SetupWizard from './components/SetupWizard/SetupWizard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RolesPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/setup" element={<SetupWizard />} />
          <Route 
            path="/kanban" 
            element={
              <RequireSetup>
                <KanbanBoard />
              </RequireSetup>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

function RequireSetup({ children }) {
  const isSetupComplete = localStorage.getItem('setupComplete') === 'true';
  
  if (!isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }

  return children;
}

export default App;

