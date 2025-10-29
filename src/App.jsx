import { useState, useEffect } from 'react';
import { Menu, X, Building2, ArrowLeft } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Amenities from './components/Amenities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StudentRegister from './components/Student';
import FacultyPage from './pages/FacultyPage';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStudentRegister, setShowStudentRegister] = useState(false);
  const isFacultyPage = location.pathname === '/faculty';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isFacultyPage ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3 absolute left-4">
              {isFacultyPage ? (
                <button 
                  onClick={handleBackToHome}
                  className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400 rounded-lg blur-md opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow-lg">
                      <Building2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    SAHE<span className="text-amber-600"> Hostelers</span>
                  </h1>
                </div>
              )}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 absolute right-4">
              {['home', 'amenities', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300 hover:scale-105"
                >
                  {item === 'home' ? 'Home' : item}
                </button>
              ))}
              <button 
                onClick={() => {
                  setShowStudentRegister(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="ml-4 px-7 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/40 transform active:scale-95"
              >
                <span className="relative z-10">Register Now</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-amber-600 focus:outline-none p-2 rounded-md"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'amenities', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item === 'home' ? 'Home' : item}
                </button>
              ))}
              <button 
                onClick={() => {
                  setShowStudentRegister(true);
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full mt-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-amber-500/30 text-center"
              >
                <span className="relative z-10">Register Now</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <Routes>
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/" element={
            showStudentRegister ? (
              <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-12 max-w-5xl">
                  <button 
                    onClick={() => setShowStudentRegister(false)}
                    className="mb-8 px-6 py-2 flex items-center text-amber-600 hover:text-amber-700 transition-colors bg-white rounded-lg shadow-sm border border-gray-200 hover:border-amber-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                  </button>
                  <StudentRegister onBack={() => setShowStudentRegister(false)} />
                </div>
              </div>
            ) : (
              <>
                <Hero 
                  onBookNow={() => scrollToSection('contact')} 
                  onStudentRegister={() => setShowStudentRegister(true)}
                  onFacultyClick={() => navigate('/faculty')}
                />
                <About />
                <Amenities />
                <Contact />
              </>
            )
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return <Navigation />;
}

export default App;
