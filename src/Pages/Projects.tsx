// src/pages/Projects.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/footer';

const API_BASE_URL = 'http://localhost:8000/api';

interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  media_type: 'image' | 'video';
  media_url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url: string;
  client: string;
  technologies_list: string[];
  is_featured: boolean;
}

const Projects: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch hero section
      const heroResponse = await fetch(`${API_BASE_URL}/portfolio-hero/active/`);
      if (heroResponse.ok) {
        const heroData = await heroResponse.json();
        setHeroData(heroData);
      }

      // Fetch projects
      const projectsResponse = await fetch(`${API_BASE_URL}/projects/`);
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.results || projectsData);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Hero Section */}
        <div className="relative h-96 bg-black">
          {heroData && (
            <>
              {heroData.media_type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={heroData.media_url} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${heroData.media_url}')` }}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {heroData.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    {heroData.subtitle}
                  </p>
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
                    {heroData.button_text}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Projects Section */}
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Projects
          </h2>
          
          {projects.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No projects available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
                >
                  <div className="relative h-48 bg-gray-700">
                    {project.media_type === 'video' ? (
                      <>
                        {project.thumbnail_url ? (
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video className="w-full h-full object-cover" muted>
                            <source src={project.media_url} type="video/mp4" />
                          </video>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={project.media_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {project.is_featured && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-sm text-purple-400 mb-2">
                        Client: {project.client}
                      </p>
                    )}
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {project.technologies_list.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies_list.map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;