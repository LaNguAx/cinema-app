import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex grow p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
