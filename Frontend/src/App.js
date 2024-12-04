import Header from './components/Header';
import Footer from './components/Footer';
import AllRoutes from './components/AllRoutes';
// import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto py-8">
          <AllRoutes />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
