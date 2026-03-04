import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Java', 'Python', 'C/C++', 'SQL', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    name: 'Frameworks',
    skills: ['React.js', 'Node.js', 'Spring Boot', 'pandas', 'NumPy'],
  },
  {
    name: 'Tools',
    skills: ['VS Code', 'Git', 'GitHub', 'Jupyter', 'PyCharm', 'Figma'],
  },
  {
    name: 'Concepts',
    skills: ['OOPs', 'DSA', 'DBMS', 'Cyber Security', 'Cryptography'],
  },
];

const certifications = [
  { name: 'Foundations of Cybersecurity', provider: 'Coursera' },
  { name: 'Fundamentals of AI', provider: 'NPTEL' },
  { name: 'Data Science in Python', provider: 'Coursera' },
  { name: 'Web Development', provider: 'Udemy' },
];

const softSkills = ['Communication', 'Adaptability', 'Problem-Solving', 'Time Management', 'Teamwork'];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        [labelRef.current, headingRef.current, descRef.current],
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

      // Category cards animation
      gsap.fromTo(
        categoriesRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/[0.02] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-indigo/[0.02] rounded-full blur-[120px]" />

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p ref={labelRef} className="label text-brand-blue mb-4">
              My Expertise
            </p>
            <h2 ref={headingRef} className="heading-lg text-white mb-6">
              Skills & <span className="text-brand-blue">Technologies</span>
            </h2>
            <p ref={descRef} className="body-lg max-w-xl mx-auto">
              Technologies I work with to bring ideas to life. 
              Constantly learning and expanding my toolkit.
            </p>
          </div>

          {/* Skills Grid */}
          <div
            ref={categoriesRef}
            className="grid md:grid-cols-2 gap-5 mb-16"
          >
            {skillCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="skill-card-wrapper relative"
                onMouseEnter={() => setHoveredCategory(catIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Blurry Glow Effect Background */}
                <div 
                  className={`absolute inset-0 rounded-2xl transition-all duration-700 ease-expo-out pointer-events-none ${
                    hoveredCategory === catIndex 
                      ? 'opacity-100 scale-105' 
                      : 'opacity-0 scale-100'
                  }`}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
                    filter: 'blur(40px)',
                    transform: 'translateZ(0)',
                  }}
                />
                
                <div
                  className={`relative p-6 lg:p-8 bg-white/[0.02] border rounded-2xl transition-all duration-500 ease-expo-out ${
                    hoveredCategory === catIndex 
                      ? 'border-brand-blue/30 bg-white/[0.04]' 
                      : 'border-white/5'
                  }`}
                >
                  <h3 className="font-display text-lg text-white/40 mb-6">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ease-expo-out cursor-default ${
                          hoveredCategory === catIndex
                            ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                            : 'bg-white/[0.03] text-white/70 border border-white/10 hover:border-brand-blue/20 hover:text-white'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section - Soft Skills & Certifications */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Soft Skills with Blurry Glow */}
            <div className="blurry-glow-wrapper">
              <div className="blurry-glow" />
              <div className="relative p-6 lg:p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-brand-blue/20 hover:bg-white/[0.03] transition-all duration-500 ease-expo-out">
                <h3 className="font-display text-lg text-white/40 mb-6">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/[0.03] rounded-full text-sm font-body text-white/60 border border-white/5 hover:border-brand-blue/20 hover:text-white transition-all duration-300 ease-expo-out"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications with Blurry Glow */}
            <div className="blurry-glow-wrapper">
              <div className="blurry-glow" />
              <div className="relative p-6 lg:p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-brand-blue/20 hover:bg-white/[0.03] transition-all duration-500 ease-expo-out">
                <h3 className="font-display text-lg text-white/40 mb-6">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-brand-blue/20 transition-all duration-300 ease-expo-out group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:animate-pulse" />
                        <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">
                          {cert.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-white/30">{cert.provider}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
