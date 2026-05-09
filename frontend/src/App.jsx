import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import IoTPage from './pages/IoTPage';
import EcommercePage from './pages/EcommercePage';
import SlackPage from './pages/SlackPage';

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<IoTPage />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/slack" element={<SlackPage />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
