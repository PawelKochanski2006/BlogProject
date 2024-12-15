import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
import AllRoutes from './components/AllRoutes.component';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <>
        <Header />
        <div className="min-h-screen bg-gray-100">
          <main className="container mx-auto py-8 px-4">
            <AllRoutes />
          </main>
        </div>
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
