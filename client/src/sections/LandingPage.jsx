import React from "react";
import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Heart, BookOpen, MapPin } from "lucide-react";

const Button = (props) => <button {...props} className={`px-4 py-2 rounded ${props.className}`}>{props.children}</button>;

export default function LandingPage() {
  return (
    <div className="relative min-h-screen min-w-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto text-white">
        <h1 className="text-3xl font-bold tracking-wide">RetireNow</h1>
        <nav className="hidden md:flex gap-8 text-lg">
          <a href="#jobs" className="hover:text-yellow-300">Micro Jobs</a>
          <a href="#autobio" className="hover:text-yellow-300">Autobiography</a>
          <a href="#health" className="hover:text-yellow-300">Health</a>
          <a href="#community" className="hover:text-yellow-300">Community</a>
          <a href="#local" className="hover:text-yellow-300">Local Services</a>
        </nav>
        <div className="flex gap-4">
          <Button variant="outline" className="text-white border-white hover:bg-yellow-300 hover:text-black">Login</Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 mt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
          Live Your Next Chapter with Purpose and Connection
        </motion.h2>
        <p className="mt-6 text-lg max-w-2xl opacity-90">
          Discover meaningful micro-jobs, write your legacy, stay healthy, and connect with your community — all in one place.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg rounded-2xl">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-2xl">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mt-24 px-6 pb-20">
        <FeatureCard icon={<Briefcase className="w-10 h-10 text-yellow-400" />} title="Micro Jobs" desc="Find flexible, meaningful work to stay active and earn." />
        <FeatureCard icon={<BookOpen className="w-10 h-10 text-yellow-400" />} title="Autobiography" desc="Write and share your life story for future generations." />
        <FeatureCard icon={<Heart className="w-10 h-10 text-yellow-400" />} title="Health" desc="Access tips and tools to maintain your well-being." />
        <FeatureCard icon={<Users className="w-10 h-10 text-yellow-400" />} title="Community" desc="Connect with people who share your interests." />
        <FeatureCard icon={<MapPin className="w-10 h-10 text-yellow-400" />} title="Local Services" desc="Explore NGOs and local resources near you." />
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/70 text-white py-8 text-center">
        <p className="text-sm opacity-80">© 2025 RetireNow — A platform built for a fulfilling retirement.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center text-white shadow-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-80">{desc}</p>
    </motion.div>
  );
}
