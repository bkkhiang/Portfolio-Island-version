import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useTheme } from '../contexts/ThemeContext.jsx';

// Sample projects data - you can customize this
const projectsData = [
  {
    id: 1,
    title: 'Fantasy Cottage 3D Viewer',
    description: 'Interactive 3D cottage model with smooth animations and camera controls. Built with Google model-viewer for seamless web integration.',
    fullDescription: 'This project showcases a detailed fantasy cottage rendered entirely in the browser using Google\'s model-viewer web component. The model features high-quality textures, realistic lighting, and smooth camera controls for an immersive viewing experience.',
    category: '3D',
    tech: ['model-viewer', 'GLB', 'HTML5'],
    modelPath: '/models/fantasy-cottage.glb',
    image: null,
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'Data Management Dashboard',
    description: 'Admin dashboard for managing field surveys, data quality checks, and project monitoring. Built with React and Tailwind CSS.',
    fullDescription: 'A comprehensive dashboard for managing field data collection projects. Features include survey progress tracking, real-time data quality indicators, automated reports, and team coordination tools.',
    category: 'Web',
    tech: ['React', 'Tailwind CSS', 'Stata API', 'Power BI'],
    modelPath: null,
    image: null,
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'CATI Survey System',
    description: 'Computer-Assisted Telephone Interviewing system built with ODK for automated phone surveys and data collection.',
    fullDescription: 'A complete CATI solution built on ODK Central with automated calling workflows, real-time data collection, quality assurance checks, and comprehensive reporting. Used for large-scale household surveys.',
    category: 'Data',
    tech: ['ODK', 'Stata', 'React', 'Node.js'],
    modelPath: null,
    image: null,
    github: '#',
    demo: '#'
  },
  {
    id: 4,
    title: 'XLSForm AI Generator',
    description: 'AI-powered tool that automatically generates ODK/KoBo survey forms from Word and PDF documents.',
    fullDescription: 'An AI-driven system that uses large language models to transform structured documents into valid XLSForm survey instruments. Reduces form development time from days to minutes.',
    category: 'AI',
    tech: ['GPT-4', 'React', 'Python', 'Stata'],
    modelPath: null,
    image: null,
    github: '#',
    demo: '#'
  },
  {
    id: 5,
    title: 'SurveyCTO Form Builder',
    description: 'Interactive web-based form designer for SurveyCTO with drag-and-drop interface and real-time preview.',
    fullDescription: 'A visual form builder that simplifies the creation of complex SurveyCTO forms. Features include drag-and-drop question types, conditional logic designer, and one-click deployment to SurveyCTO servers.',
    category: 'Web',
    tech: ['React', 'Tailwind', 'SurveyCTO API', 'XLSForm'],
    modelPath: null,
    image: null,
    github: '#',
    demo: '#'
  },
  {
    id: 6,
    title: 'Conservation Tech Portfolio',
    description: 'Personal portfolio showcasing work in conservation technology, built with-react-spring animations and responsive design.',
    fullDescription: 'This portfolio demonstrates expertise in both web development and conservation tech. Features include smooth animations, project showcase, and integration with 3D models to tell a compelling professional story.',
    category: 'Web',
    tech: ['React', 'Tailwind CSS', '@react-spring/web', 'model-viewer'],
    modelPath: null,
    image: null,
    github: '#',
    demo: '#'
  }
];

const categories = ['All', 'Web', '3D', 'Data', 'AI'];

const Projects = () => {
  const { currentTheme } = useTheme();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  // Modal spring animations
  const modalSpring = useSpring({
    opacity: selectedProject ? 1 : 0,
    transform: selectedProject ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 300, friction: 30 }
  });

  return (
    <div className={`min-h-screen ${currentTheme.background}`}>
      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-4 md:px-8 ${currentTheme.heroBg}`}>
        <div className="max-w-6xl mx-auto text-center">
          <animated.h1
            className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${currentTheme.accentGradient} bg-clip-text text-transparent mb-6 ${currentTheme.headingFont}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            My Projects
          </animated.h1>
          <animated.p
            className={`text-xl md:text-2xl ${currentTheme.textMuted} mb-8 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A collection of work showcasing expertise in web development, 3D graphics, and interactive experiences.
          </animated.p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className={`py-8 px-4 md:px-8 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === cat
                    ? `${currentTheme.buttonPrimary} shadow-lg`
                    : `${currentTheme.buttonSecondary}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className={`${currentTheme.cardBg} ${currentTheme.cardBorder} border rounded-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group`}
                onClick={() => setSelectedProject(project)}
              >
                {/* 3D Preview or Placeholder */}
                <div className={`h-56 bg-gradient-to-br from-cyan-100 to-purple-100 relative overflow-hidden`}>
                  {project.modelPath ? (
                    <model-viewer
                      src={project.modelPath}
                      camera-controls
                      auto-rotate
                      shadow-intensity="1"
                      className="w-full h-full"
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-6xl ${currentTheme.background}`}>
                      🖥️
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 ${currentTheme.cardBg} backdrop-blur px-3 py-1 rounded-full text-sm font-medium ${currentTheme.text}`}>
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3 group-hover:${currentTheme.accentText.replace('text-', 'group-hover:')} transition-colors`}>
                    {project.title}
                  </h3>
                  <p className={currentTheme.textMuted + ' mb-4 line-clamp-2'}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-sm ${currentTheme.cardBg} ${currentTheme.cardBorder} border ${currentTheme.textMuted}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className={currentTheme.accentText + ' font-semibold hover:underline'}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <animated.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={modalSpring}
          onClick={() => setSelectedProject(null)}
        >
          <animated.div
            className={`${currentTheme.cardBg} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${currentTheme.cardBorder} border`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className={`text-3xl font-bold ${currentTheme.text}`}>{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`${currentTheme.textMuted} hover:${currentTheme.text} text-4xl leading-none`}
                >
                  ×
                </button>
              </div>

              {/* Project Image/Model Preview */}
              <div className="h-80 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-xl mb-6 relative overflow-hidden">
                {selectedProject.modelPath && (
                  <model-viewer
                    src={selectedProject.modelPath}
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    className="w-full h-full"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                )}
              </div>

              <div className="mb-6">
                <p className={`text-lg ${currentTheme.text} leading-relaxed`}>{selectedProject.fullDescription}</p>
              </div>

              <div className="mb-6">
                <h3 className={`text-xl font-bold ${currentTheme.text} mb-3`}>Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className={`px-4 py-2 rounded-lg font-medium ${currentTheme.cardBg} ${currentTheme.cardBorder} border ${currentTheme.textMuted}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  className={`px-6 py-3 ${currentTheme.buttonPrimary} font-semibold rounded-lg transition-colors`}
                >
                  View Code
                </a>
                <a
                  href={selectedProject.demo}
                  className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </animated.div>
        </animated.div>
      )}
    </div>
  );
};

export default Projects;
