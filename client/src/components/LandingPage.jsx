
import React, { useState } from 'react';
import { User, Briefcase, Heart, Users, MapPin, Menu, X,  } from 'lucide-react';
import { Link } from 'react-router-dom';

// Landing Page Component
const LandingPage = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                RetireWell
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 text-lg font-medium transition">Features</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 text-lg font-medium transition">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 text-lg font-medium transition">Contact</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to="/login">
              <button  className="px-6 py-3 text-purple-600 border-2 border-purple-600 rounded-full font-semibold hover:bg-purple-50 transition text-lg">
                Login
              </button>
              </Link>
              <Link to = "/signup">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition text-lg">
                Get Started
              </button>
              </Link>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 text-lg py-2">Features</a>
              <a href="#about" className="block text-gray-700 text-lg py-2">About</a>
              <a href="#contact" className="block text-gray-700 text-lg py-2">Contact</a>
              <Link to ="/login"><button  className="w-full px-6 py-3 text-purple-600 border-2 border-purple-600 rounded-full font-semibold">
                Login
              </button>
              </Link>
              <Link to="/signup">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold">
                Get Started
              </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Your Next Chapter,
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Best Chapter
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stay active, connected, and fulfilled in retirement. Find flexible work, share your story, maintain your health, and build meaningful connections.
          </p>
          <Link to="/signup">
          <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition">
            Start Your Journey
          </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900">
          Everything You Need in One Place
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Briefcase, title: 'Micro Jobs', desc: 'Find flexible, meaningful work opportunities that fit your schedule and interests', color: 'from-blue-500 to-blue-600' },
            { icon: User, title: 'Your Story', desc: 'Create and share your autobiography with family and future generations', color: 'from-purple-500 to-purple-600' },
            { icon: Heart, title: 'Health Hub', desc: 'Track wellness, access health resources, and maintain your vitality', color: 'from-pink-500 to-pink-600' },
            { icon: Users, title: 'Community', desc: 'Connect with like-minded individuals and build lasting friendships', color: 'from-green-500 to-green-600' },
            { icon: MapPin, title: 'Local Services', desc: 'Discover nearby services, events, and volunteer opportunities', color: 'from-orange-500 to-orange-600' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Begin Your New Adventure?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of retirees who are living their best lives
          </p>
          <Link to="/signup">
          <button  className="px-10 py-5 bg-white text-purple-600 rounded-full text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition">
            Create Free Account
          </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg">&copy; 2025 RetireWell. Empowering your retirement journey.</p>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
