import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useTheme } from '../contexts/ThemeContext.jsx';
import VideoBackground from '../components/VideoBackground.jsx';

const Contact = () => {
  const { currentTheme, pageColors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const buttonSpring = useSpring({
    transform: submitted ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 300, friction: 30 }
  });

  return (
    <VideoBackground>
      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-4 md:px-8 ${currentTheme.heroBg}`}>
          <div className="max-w-6xl mx-auto text-center">
            <animated.h1
              className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${pageColors.gradient} bg-clip-text text-transparent mb-6 ${currentTheme.headingFont}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </animated.h1>
          <animated.p
            className={`text-xl md:text-2xl ${currentTheme.textMuted} mb-8 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Interested in collaboration or conservation tech opportunities? Let's connect.
          </animated.p>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-16 px-4 md:px-8 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className={`text-4xl font-bold ${currentTheme.text} mb-8 ${currentTheme.headingFont}`}>Let's Connect</h2>
              <p className={`text-lg ${currentTheme.text} mb-8 leading-relaxed`}>
                I'm always interested in new opportunities, collaborations, and exciting projects. Whether you have a question about conservation tech, data automation, or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${currentTheme.cardBg} rounded-full flex items-center justify-center ${currentTheme.accentText} text-xl flex-shrink-0`}>
                    ✉️
                  </div>
                  <div>
                    <h3 className={`font-bold ${currentTheme.text} mb-1`}>Email</h3>
                    <p className={currentTheme.textMuted}>bijoykhiang97@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${currentTheme.cardBg} rounded-full flex items-center justify-center ${currentTheme.accentText} text-xl flex-shrink-0`}>
                    💼
                  </div>
                  <div>
                    <h3 className={`font-bold ${currentTheme.text} mb-1`}>LinkedIn</h3>
                    <p className={currentTheme.textMuted}>linkedin.com/in/bijoy-khiang-4b3114265</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${currentTheme.cardBg} rounded-full flex items-center justify-center ${currentTheme.accentText} text-xl flex-shrink-0`}>
                    📍
                  </div>
                  <div>
                    <h3 className={`font-bold ${currentTheme.text} mb-1`}>Location</h3>
                    <p className={currentTheme.textMuted}>Kazipara, Mirpur-1216, Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${currentTheme.cardBg} rounded-full flex items-center justify-center ${currentTheme.accentText} text-xl flex-shrink-0`}>
                    📱
                  </div>
                  <div>
                    <h3 className={`font-bold ${currentTheme.text} mb-1`}>Phone</h3>
                    <p className={currentTheme.textMuted}>+880 1533-720188</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/bijoy-khiang-4b3114265" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${currentTheme.cardBg} rounded-full flex items-center justify-center ${currentTheme.accentText} hover:opacity-80 transition-colors text-xl font-bold`}>in</a>
                <a href="mailto:bijoykhiang97@gmail.com" className={`w-10 h-10 ${currentTheme.cardBg} rounded-full flex items-center justify-center ${currentTheme.accentText} hover:opacity-80 transition-colors text-xl`}>✉️</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${currentTheme.cardBg} p-8 rounded-2xl ${currentTheme.cardBorder} border`}>
              <h3 className={`text-2xl font-bold ${currentTheme.text} mb-6 ${currentTheme.headingFont}`}>Send a Message</h3>

              {submitted ? (
                <animated.div
                  className="text-center py-12"
                  style={buttonSpring}
                >
                  <div className="text-6xl mb-4">📨</div>
                  <h4 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h4>
                  <p className={currentTheme.textMuted}>Thanks for reaching out. I'll get back to you soon.</p>
                </animated.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : currentTheme.cardBorder} ${currentTheme.background} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : currentTheme.cardBorder} ${currentTheme.background} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : currentTheme.cardBorder} ${currentTheme.background} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : currentTheme.cardBorder} ${currentTheme.background} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="Your message..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className={`w-full px-6 py-4 ${currentTheme.buttonPrimary} font-bold rounded-lg shadow-lg hover:shadow-xl transition-all`}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional CTA (optional) */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 animate-pulse opacity-75"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Interested in Conservation Tech?</h2>
          <p className="text-xl mb-8 opacity-90">I'm seeking opportunities to apply data science, automation, and AI for biodiversity conservation. Let's discuss how we can work together.</p>
          <a
            href="mailto:bijoykhiang97@gmail.com"
            className="inline-block px-10 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Email Me Directly
          </a>
        </div>
      </section>
    </VideoBackground>
  );
};

export default Contact;
