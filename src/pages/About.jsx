import React from 'react';
import { Link } from 'react-router-dom';
import { animated } from '@react-spring/web';
import { useTheme } from '../contexts/ThemeContext.jsx';

const About = () => {
  const { currentTheme } = useTheme();

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
            About Me
          </animated.h1>
          <animated.p
            className={`text-xl md:text-2xl ${currentTheme.textMuted} mb-8 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Technical Officer specializing in data automation, AI-assisted workflows, and digital survey systems. Using technology to drive conservation and community development initiatives.
          </animated.p>
        </div>
      </section>

      {/* Bio Section */}
      <section className={`py-16 px-4 md:px-8 ${currentTheme.sectionAltBg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold ${currentTheme.text} mb-6 ${currentTheme.headingFont}`}>Who I Am</h2>
              <p className={`text-lg ${currentTheme.text} mb-4 leading-relaxed`}>
                I'm a Technical Officer with a background in Anthropology from Jahangirnagar University. My career focuses on leveraging technology for conservation and development—using data automation, AI-assisted workflows, and digital survey tools to support biodiversity protection and community livelihoods.
              </p>
              <p className={`text-lg ${currentTheme.text} mb-6 leading-relaxed`}>
                Currently serving as a focal point for the Data & Technical Team, I specialize in building automated survey systems, data quality assurance, and AI-driven tools like xlsform-ai. I'm also exploring web development to create immersive digital experiences that communicate complex ideas effectively.
              </p>
              <Link
                to="/contact"
                className={`inline-block px-8 py-3 ${currentTheme.buttonPrimary} rounded-lg transition-colors font-semibold`}
              >
                Get in Touch
              </Link>
            </div>
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${currentTheme.cardBorder} border`}>
              <img
                src="/profile.jpg"
                alt="Bijoy Khiang"
                className={`w-full h-auto max-h-[30rem] object-cover ${currentTheme.background}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className={`py-16 px-4 md:px-8 ${currentTheme.sectionAltBg}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold ${currentTheme.text} text-center mb-12 ${currentTheme.headingFont}`}>Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Data Automation', level: 90 },
              { name: 'AI-Assisted Workflows', level: 90 },
              { name: 'SurveyCTO & ODK', level: 92 },
              { name: 'Stata', level: 88 },
              { name: 'Power BI', level: 85 },
              { name: 'Form Design (XLSForm)', level: 90 },
              { name: 'Data Quality Assurance', level: 92 },
              { name: 'Project Documentation', level: 88 }
            ].map((skill, idx) => (
              <div key={idx} className={`${currentTheme.cardBg} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${currentTheme.cardBorder} border`}>
                <h3 className={`font-semibold ${currentTheme.text} mb-3`}>{skill.name}</h3>
                <div className={`w-full rounded-full h-2.5 ${currentTheme.text === 'text-white' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className={`bg-gradient-to-r ${currentTheme.accentGradient} h-2.5 rounded-full`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className={`text-sm ${currentTheme.textMuted} mt-1 block`}>{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className={`py-16 px-4 md:px-8 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold ${currentTheme.text} text-center mb-12 ${currentTheme.headingFont}`}>Experience</h2>
          <div className="space-y-8">
            {[
              {
                role: 'Research Assistant 3 (Technical Focal Point)',
                company: 'Arannayk Foundation',
                period: 'Jan 2025 - Present',
                desc: 'Serve as focal point for Data & Technical Team, develop AI-driven xlsform-ai system, implement automated CATI surveys, and oversee data quality assurance for multiple projects.'
              },
              {
                role: 'Research Assistant 1',
                company: 'Arannayk Foundation',
                period: 'Oct 2024 - Dec 2025',
                desc: 'Facilitated Scrum cycles, improved ODK/Stata modules, delivered Stata training, led survey implementations, and mentored junior staff in data quality processes.'
              },
              {
                role: 'Trainee Research Assistant',
                company: 'Arannayk Foundation',
                period: 'Oct 2023 - Sep 2024',
                desc: 'Designed CATI survey forms, automated incentive tracking workflows, led referral surveys, and consolidated large datasets for analysis.'
              },
              {
                role: 'Intern',
                company: 'Arannayk Foundation',
                period: 'Jul 2023 - Sep 2023',
                desc: 'Supported mystery shopping project, translated survey instruments, refined questionnaires, managed large Excel datasets, and rapidly developed technical proficiency.'
              }
            ].map((exp, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row gap-6 items-start md:items-center ${currentTheme.cardBg} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${currentTheme.cardBorder} border`}>
                <div className="md:w-1/4">
                  <span className={`${currentTheme.accentText} font-semibold`}>{exp.period}</span>
                </div>
                <div className="md:w-1/3">
                  <h3 className={`text-xl font-bold ${currentTheme.text}`}>{exp.role}</h3>
                  <p className={currentTheme.textMuted}>{exp.company}</p>
                </div>
                <div className="md:w-2/4">
                  <p className={currentTheme.text}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={`py-16 px-4 md:px-8 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold ${currentTheme.text} text-center mb-12 ${currentTheme.headingFont}`}>Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'AI Agents', 'GPT-4', 'Claude', 'Stata', 'SurveyCTO', 'ODK',
              'XLSForm', 'Power BI', 'React', 'Tailwind CSS', 'Git',
              'MS Office Suite', 'Vite', 'Data Automation'
            ].map((tech, idx) => (
              <span
                key={idx}
                className={`px-6 py-3 ${currentTheme.cardBg} rounded-full text-lg font-medium ${currentTheme.cardBorder} border hover:opacity-80 transition-colors`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`py-16 px-4 md:px-8 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className={`text-4xl font-bold ${currentTheme.text} ${currentTheme.headingFont}`}>Latest Blog Posts</h2>
            <button className={`${currentTheme.accentText} font-semibold hover:underline`}>View All →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Automating Survey Data Quality with Stata',
                excerpt: 'How to implement automated data quality checks using Stata scripts to ensure clean, reliable survey data at scale.',
                date: 'Feb 2025',
                readTime: '7 min read'
              },
              {
                title: 'Building xlsform-ai: AI-Powered Form Generation',
                excerpt: 'A deep dive into creating an AI-driven system that automatically generates ODK survey forms from Word and PDF documents.',
                date: 'Jan 2025',
                readTime: '10 min read'
              },
              {
                title: 'Implementing CATI Surveys with ODK',
                excerpt: 'Best practices for designing and deploying computer-assisted telephone interviews using ODK Central and automation.',
                date: 'Dec 2024',
                readTime: '8 min read'
              }
            ].map((post, idx) => (
              <article key={idx} className={`${currentTheme.cardBg} ${currentTheme.cardBorder} border rounded-xl overflow-hidden hover:shadow-xl transition-shadow`}>
                <div className={`h-48 bg-gradient-to-br from-cyan-400 to-purple-500`}></div>
                <div className="p-6">
                  <div className={`flex justify-between text-sm ${currentTheme.textMuted} mb-3`}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-3 hover:${currentTheme.accentText} transition-colors`}>
                    {post.title}
                  </h3>
                  <p className={`${currentTheme.text} mb-4`}>{post.excerpt}</p>
                  <button className={`${currentTheme.accentText} font-semibold hover:underline`}>Read More →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Open to Conservation Tech Opportunities</h2>
          <p className="text-xl mb-8 opacity-90">
            I'm passionate about applying data science, automation, and AI to biodiversity conservation and sustainable development. Let's connect if you're working on impactful projects.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Connect with Me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
