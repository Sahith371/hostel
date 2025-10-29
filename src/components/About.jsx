import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.95 
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.8 },
        y: { duration: 0.8 },
        scale: { duration: 0.8 }
      }
    })
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const features = [
    {
      number: '01',
      title: 'Prime Location',
      description: 'Strategically located near major educational institutions with excellent connectivity to public transport.',
      icon: '📍',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Affordable Pricing',
      description: 'Competitive pricing with flexible payment options and transparent fee structure without hidden charges.',
      icon: '💰',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      number: '03',
      title: 'Experienced Management',
      description: 'Over 10 years of experience in student accommodation with a proven track record of excellence.',
      icon: '🏆',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      number: '04',
      title: 'Student-Centric Approach',
      description: 'All policies and facilities are designed keeping student needs and preferences at the center.',
      icon: '🎓',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Mr. Rajesh Kumar',
      role: 'Hostel Warden',
      description: '15+ years experience in student welfare and hostel management.',
      icon: '👨‍💼',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Medical Officer',
      description: 'Available 24/7 for medical emergencies and health consultations.',
      icon: '👩‍⚕️',
      gradient: 'from-rose-600 to-pink-600'
    },
    {
      name: 'Mr. Amit Singh',
      role: 'Maintenance Head',
      description: 'Ensures all facilities are well-maintained and functioning optimally.',
      icon: '🔧',
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <div className="about-page">
      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">Why Choose SAHE Hostelers?</h2>
            <p className="section-subtitle">
              Discover what makes us the preferred choice for student accommodation
            </p>
            <div className="title-underline">
              <div className="underline-bar"></div>
            </div>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                custom={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { 
                    duration: 0.3, 
                    ease: "easeOut",
                    boxShadow: { duration: 0.3 }
                  }
                }}
              >
                <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.gradient}`}>
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-number">{feature.number}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className={`feature-glow bg-gradient-to-br ${feature.gradient}`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet Our Dedicated Team</h2>
            <p className="section-subtitle">
              Experienced professionals committed to your comfort and success
            </p>
            <div className="title-underline">
              <div className="underline-bar"></div>
            </div>
          </motion.div>

          <motion.div 
            className="team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                custom={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { 
                    duration: 0.3, 
                    ease: "easeOut",
                    boxShadow: { duration: 0.3 }
                  }
                }}
              >
                <div className={`team-avatar bg-gradient-to-br ${member.gradient}`}>
                  <span className="team-icon">{member.icon}</span>
                  <div className="avatar-ring"></div>
                </div>
                <div className="team-content">
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
                <div className={`team-glow bg-gradient-to-br ${member.gradient}`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyChoose;
