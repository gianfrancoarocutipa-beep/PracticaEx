import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import OrderFormPage from './pages/OrderFormPage';
import SchedulePage from './pages/SchedulePage';
import TrackingPage from './pages/TrackingPage';
import HistoryPage from './pages/HistoryPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/order" replace />} />
        <Route path="/order" element={<OrderFormPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="*" element={<Navigate to="/order" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
