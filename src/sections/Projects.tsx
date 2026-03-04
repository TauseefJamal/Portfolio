import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowUpRight, X, CheckCircle2, Zap, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Heart Disease Prediction',
    shortDesc: 'ML model to predict heart disease from clinical data',
    image: '/project-ecommerce.jpg',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/TauseefJamal',
    featured: true,
    // Detailed info for flip card
    fullDescription: 'A machine learning classification system that predicts the likelihood of heart disease based on patient clinical data.',
    features: [
      'Preprocessed clinical data with 300+ patient records',
      'Implemented Logistic Regression with 85%+ accuracy',
      'Visualized correlations using Matplotlib & Seaborn',
      'Applied hyperparameter tuning for optimal performance',
    ],
    outcomes: [
      '85% prediction accuracy achieved',
      'ROC-AUC Score: 0.89',
      'Reduced false negatives by 12%',
    ],
  },
  {
    id: 2,
    title: 'Task Management Web App',
    shortDesc: 'Full-stack task management with RESTful APIs',
    image: '/project-taskmanager.jpg',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Postman'],
    github: 'https://github.com/TauseefJamal',
    featured: true,
    // Detailed info for flip card
    fullDescription: 'A comprehensive backend-driven task management application enabling users to organize and track their work efficiently.',
    features: [
      'Built RESTful APIs with Spring Boot framework',
      'Implemented JWT authentication & authorization',
      'Designed relational database schema in PostgreSQL',
      'Added pagination and filtering for scalability',
    ],
    outcomes: [
      'Handles 1000+ tasks with sub-100ms response time',
      'Deployed on cloud platform for live testing',
      'Secured endpoints with role-based access control',
    ],
  },
  {
    id: 3,
    title: 'Portfolio Website',
    shortDesc: 'Modern responsive portfolio with premium animations',
    image: '/project-portfolio.jpg',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    github: 'https://github.com/TauseefJamal',
    featured: false,
    // Detailed info for flip card
    fullDescription: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and premium design.',
    features: [
      'Built with React + TypeScript + Vite',
      'Implemented GSAP ScrollTrigger animations',
      'Responsive design with Tailwind CSS',
      '3D flip card interactions for projects',
    ],
    outcomes: [
      '100/100 Lighthouse performance score',
      'Fully responsive across all devices',
      'Smooth 60fps animations throughout',
    ],
  },
];

const achievements = [
  { title: 'DevSoc Member', desc: 'Developer Society at AEC' },
  { title: 'Top 20', desc: 'Hardware Club Competition' },
  { title: '4th Position', desc: 'Inter-college Quiz' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        [labelRef.current, headingRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards animation
      const cards = projectsRef.current?.querySelectorAll('.project-card-container');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });

      // Achievements animation
      gsap.fromTo(
        achievementsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (projectId: number) => {
    setFlippedCard(flippedCard === projectId ? null : projectId);
  };

  // Handle wheel event on flip card backside
  const handleWheel = (e: React.WheelEvent, projectId: number) => {
    if (flippedCard === projectId) {
      const cardElement = cardRefs.current[projectId - 1];
      if (cardElement) {
        const scrollContainer = cardElement.querySelector('.flip-card-scroll');
        if (scrollContainer) {
          // Check if content is scrollable
          const canScrollUp = scrollContainer.scrollTop > 0;
          const canScrollDown = scrollContainer.scrollTop < scrollContainer.scrollHeight - scrollContainer.clientHeight;
          
          // Only prevent default if we can scroll in that direction
          if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
            e.stopPropagation();
          }
        }
      }
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-brand-blue/[0.02] rounded-full blur-[200px]" />

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <p ref={labelRef} className="label text-brand-blue mb-4">
                My Work
              </p>
              <h2 ref={headingRef} className="heading-lg text-white">
                Featured <span className="text-brand-blue">Projects</span>
              </h2>
            </div>
            <a
              href="https://github.com/TauseefJamal"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-brand-blue transition-colors duration-300"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Projects Grid with 3D Flip Cards */}
          <div
            ref={projectsRef}
            className="grid lg:grid-cols-2 gap-6 mb-20"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => { cardRefs.current[index] = el; }}
                className={`project-card-container ${index === 0 ? 'lg:col-span-2' : ''}`}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full transition-transform duration-700 ease-expo-out ${
                    flippedCard === project.id ? '[transform:rotateY(180deg)]' : ''
                  }`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    height: index === 0 ? '420px' : '380px'
                  }}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={() => handleCardClick(project.id)}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="h-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-blue/30 transition-all duration-500 ease-expo-out group">
                      {/* Image */}
                      <div className={`relative overflow-hidden ${index === 0 ? 'h-56 lg:h-64' : 'h-48'}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
                        
                        {/* Featured badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4 px-3 py-1.5 bg-brand-blue/90 backdrop-blur-sm rounded-full">
                            <span className="font-mono text-xs text-white">Featured</span>
                          </div>
                        )}

                        {/* Click hint */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="font-mono text-xs text-white/70">Click to flip</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl text-white mb-2 group-hover:text-brand-blue transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="font-body text-sm text-white/50 mb-5 leading-relaxed">
                          {project.shortDesc}
                        </p>
                        
                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1.5 bg-white/[0.03] rounded-lg text-xs font-mono text-white/40 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    onWheel={(e) => handleWheel(e, project.id)}
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="h-full rounded-2xl border border-brand-blue/30 bg-gradient-to-br from-brand-blue/10 to-brand-indigo/5 flex flex-col">
                      {/* Scrollable Content */}
                      <div className="flip-card-scroll flex-1 overflow-y-auto p-6 lg:p-8">
                        {/* Close button */}
                        <button
                          onClick={() => setFlippedCard(null)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Title */}
                        <h3 className="font-display text-xl text-white mb-3 pr-10">
                          {project.title}
                        </h3>

                        {/* Full Description */}
                        <p className="font-body text-sm text-white/60 mb-5 leading-relaxed">
                          {project.fullDescription}
                        </p>

                        {/* Key Features */}
                        <div className="mb-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-brand-blue" />
                            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Key Features</span>
                          </div>
                          <ul className="space-y-2">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-blue/70 mt-0.5 flex-shrink-0" />
                                <span className="font-body text-sm text-white/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <BarChart3 className="w-4 h-4 text-brand-blue" />
                            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Outcomes</span>
                          </div>
                          <ul className="space-y-1.5">
                            {project.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                                <span className="font-body text-sm text-white/60">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* GitHub Link */}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full text-sm font-body text-white hover:bg-brand-blue/20 hover:text-brand-blue transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements with Blurry Glow */}
          <div>
            <h3 className="font-display text-lg text-white/40 mb-8 text-center">
              Achievements & Recognition
            </h3>
            <div ref={achievementsRef} className="grid md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="blurry-glow-wrapper"
                >
                  <div className="blurry-glow" />
                  <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-brand-blue/20 hover:bg-white/[0.03] transition-all duration-500 ease-expo-out text-center">
                    <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue/15 transition-colors duration-300">
                      <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h4 className="font-body text-white font-medium mb-1">{achievement.title}</h4>
                    <p className="font-body text-sm text-white/40">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
