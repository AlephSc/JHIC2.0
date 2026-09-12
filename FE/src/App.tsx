import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Jurusan from './pages/Jurusan';
import Fasilitas from './pages/Fasilitas';
import Ekstra from './pages/Ekstra';
import Produk from './pages/Produk';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import Bkk from './pages/Bkk';
import BkkDetail from './pages/BkkDetail';
import Ppdb from './pages/Ppdb';
import PpdbDaftar from './pages/PpdbDaftar';
import { PpdbDashboard, PpdbLulus, PpdbStatus, PpdbTiket } from './pages/PpdbLain';
import Auth from './pages/Auth';
import { CekPotensi, Hasil, Quiz } from './pages/Quiz';
import Profil from './pages/Profil';
import Alumni from './pages/Alumni';
import Kesehatan from './pages/Kesehatan';

// HashRouter: nol rewrite server → jalan identik di L0/L1 Vercel/CF + L2 GH Pages.
export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/ekstrakurikuler" element={<Ekstra />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/bkk" element={<Bkk />} />
          <Route path="/bkk/:id" element={<BkkDetail />} />
          <Route path="/ppdb" element={<Ppdb />} />
          <Route path="/ppdb/daftar" element={<PpdbDaftar />} />
          <Route path="/ppdb/dashboard" element={<PpdbDashboard />} />
          <Route path="/ppdb/tiket" element={<PpdbTiket />} />
          <Route path="/ppdb/status" element={<PpdbStatus />} />
          <Route path="/ppdb/lulus" element={<PpdbLulus />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route path="/cek-potensi" element={<CekPotensi />} />
          <Route path="/cek-potensi/quiz" element={<Quiz />} />
          <Route path="/cek-potensi/hasil" element={<Hasil />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/kesehatan" element={<Kesehatan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Chatbot />
    </HashRouter>
  );
}
