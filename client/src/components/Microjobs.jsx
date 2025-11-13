import React, { useState } from 'react';
import { Heart, Search, Filter, BookmarkPlus, Clock, DollarSign, CheckCircle, MapPin } from 'lucide-react';

const MicroJobs = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const jobs = [
    { id: 1, title: 'Pet Sitting', company: 'Local Family', location: 'Ludhiana', pay: '₹500/day', type: 'Part-time', hours: '2-3 hrs', description: 'Care for friendly pets while family is away', skills: ['Animal Care', 'Reliable'] },
    { id: 2, title: 'Tutoring Math', company: 'Education Center', location: 'Near You', pay: '₹800/hr', type: 'Flexible', hours: '5-10 hrs/week', description: 'Help students with mathematics homework and concepts', skills: ['Math', 'Teaching'] },
    { id: 3, title: 'Garden Consultant', company: 'Green Spaces', location: 'Ludhiana', pay: '₹1000/visit', type: 'Contract', hours: 'As needed', description: 'Provide gardening advice and plant care tips', skills: ['Gardening', 'Advisory'] },
    { id: 4, title: 'Event Photographer', company: 'Celebrations Co.', location: 'Punjab', pay: '₹2000/event', type: 'Event-based', hours: '3-5 hrs', description: 'Capture special moments at family events', skills: ['Photography', 'Creative'] },
    { id: 5, title: 'Handwriting Projects', company: 'Creative Studio', location: 'Remote', pay: '₹600/project', type: 'Remote', hours: 'Flexible', description: 'Beautiful handwritten invitations and cards', skills: ['Calligraphy', 'Detail-oriented'] },
    { id: 6, title: 'Translation Services', company: 'Language Bridge', location: 'Remote', pay: '₹1200/hr', type: 'Remote', hours: 'Flexible', description: 'Translate documents between English and Punjabi', skills: ['Bilingual', 'Writing'] }
  ];

  const toggleSave = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
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
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-purple-600 font-semibold text-lg">Dashboard</button>
              <button onClick={() => onNavigate('landing')} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Micro Job</span>
          </h1>
          <p className="text-xl text-gray-600">Flexible opportunities that fit your lifestyle and interests</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs or locations..."
                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-lg text-gray-600">{job.company}</p>
                </div>
                <button
                  onClick={() => toggleSave(job.id)}
                  className={`p-3 rounded-full transition ${
                    savedJobs.includes(job.id) ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400 hover:bg-purple-50'
                  }`}
                >
                  <BookmarkPlus size={24} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={20} className="text-purple-600" />
                  <span className="text-lg">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={20} className="text-purple-600" />
                  <span className="text-lg">{job.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign size={20} className="text-purple-600" />
                  <span className="text-lg font-semibold text-green-600">{job.pay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {job.type}
                  </span>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                <CheckCircle size={20} />
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MicroJobs;