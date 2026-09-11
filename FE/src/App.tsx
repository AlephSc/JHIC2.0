import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Jurusan from './pages/Jurusan';
import Berita from './pages/Berita';
import Bkk from './pages/Bkk';
import Ppdb from './pages/Ppdb';
import Kesehatan from './pages/Kesehatan';

// HashRouter: nol rewrite server → jalan identik di L0/L1 Vercel/CF + L2 GH Pages.
// Tradeoff: URL #/... kurang cantik, tapi paling jarang down.
export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/bkk" element={<Bkk />} />
          <Route path="/ppdb" element={<Ppdb />} />
          <Route path="/kesehatan" element={<Kesehatan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Chatbot />
    </HashRouter>
  );
}
