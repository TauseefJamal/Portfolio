import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Trophy, Code, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code, value: 4, suffix: '', label: 'Academic Projects' },
  { icon: Trophy, value: 3, suffix: '', label: 'Achievements' },
  { icon: Award, value: 4, suffix: '', label: 'Certifications' },
  { icon: Users, value: 1, suffix: '', label: 'DevSoc Member' },
];

const education = [
  {
    degree: 'B.Tech CSE',
    specialization: 'IoT, Cybersecurity & Blockchain',
    institution: 'Asansol Engineering College',
    period: '2022 – 2026 (Final Year)',
    current: true,
  },
  {
    degree: 'Senior Secondary (CBSE)',
    specialization: '77%',
    institution: 'S.T.S.V. International School',
    period: '2020',
    current: false,
  },
  {
    degree: 'Secondary (CBSE)',
    specialization: '75.8%',
    institution: "Jean Paul's High School",
    period: '2018',
    current: false,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const eduRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text paragraphs stagger
      textRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: index * 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Education cards
      gsap.fromTo(
        eduRef.current?.children || [],
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: eduRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to(
              { value: 0 },
              {
                value: stat.value,
                duration: 2,
                ease: 'power4.out',
                onUpdate: function () {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = Math.round(this.targets()[0].value);
                    return newCounters;
                  });
                },
              }
            );
          });
        },
        once: true,
      });

      // Stats entrance
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: statsRef.current,
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
      id="about"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-brand-blue/[0.02] rounded-full blur-[200px] -translate-y-1/2" />

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <p 
              ref={labelRef}
              className="label text-brand-blue mb-4"
            >
              About Me
            </p>
            <h2
              ref={headingRef}
              className="heading-lg text-white"
            >
              Know Who <span className="text-brand-blue">I Am</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Bio */}
            <div className="space-y-6">
              <p 
                ref={el => { textRefs.current[0] = el; }}
                className="font-body text-lg text-white/80 leading-relaxed"
              >
                I&apos;m <span className="text-white font-medium">Md Tauseef Jamal</span>, 
                a final year B.Tech Computer Science & Engineering student at 
                <span className="text-brand-blue"> Asansol Engineering College</span>, 
                specializing in Internet of Things (IoT), Cybersecurity, and Blockchain Technology.
              </p>
              
              <p 
                ref={el => { textRefs.current[1] = el; }}
                className="font-body text-base text-white/60 leading-relaxed"
              >
                As a fresher, I am actively developing my technical skills through academic projects 
                and continuous learning. I have a strong foundation in programming and emerging technologies, 
                with a passion for creating elegant solutions to complex problems.
              </p>
              
              <p 
                ref={el => { textRefs.current[2] = el; }}
                className="font-body text-base text-white/60 leading-relaxed"
              >
                I&apos;m an active member of the <span className="text-white font-medium">Developer Society (DevSoc)</span> at my college, 
                where I help organize coding contests, developer workshops, and tech events 
                to promote a vibrant developer culture on campus.
              </p>
            </div>

            {/* Right - Education */}
            <div>
              <h3 className="font-display text-lg text-white/40 mb-6 flex items-center gap-3">
                <GraduationCap className="w-5 h-5" />
                Education
              </h3>
              <div ref={eduRef} className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`group p-6 bg-white/[0.02] border rounded-2xl transition-all duration-500 ease-expo-out ${
                      edu.current 
                        ? 'border-brand-blue/30 hover:border-brand-blue/50 hover:bg-brand-blue/[0.03]' 
                        : 'border-white/5 hover:border-brand-blue/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-body text-white font-medium">{edu.degree}</h4>
                        {edu.current && (
                          <span className="px-2 py-0.5 bg-brand-blue/20 rounded-full text-xs font-mono text-brand-blue">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-white/40">{edu.period}</span>
                    </div>
                    <p className="font-body text-sm text-brand-blue/80 mb-1">{edu.specialization}</p>
                    <p className="font-body text-sm text-white/40">{edu.institution}</p>
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="mt-8">
                <div className="flex justify-between text-xs font-mono text-white/40 mb-2">
                  <span>B.Tech Progress</span>
                  <span>Final Year (4th Year)</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-brand-blue to-brand-indigo rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-brand-blue/20 hover:bg-white/[0.03] transition-all duration-500 ease-expo-out"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue/15 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                </div>
                <p className="font-display text-3xl text-white mb-1">
                  {counters[index]}{stat.suffix}
                </p>
                <p className="font-body text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
