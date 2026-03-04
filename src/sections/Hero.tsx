import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Premium easing curves
const easeExpoOut = 'power4.out';
const easeExpoInOut = 'expo.inOut';
const easeBackOut = 'back.out(1.7)';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: easeExpoOut } });

      // Label fade in
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0
      );

      // Animate name characters with stagger
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 120, opacity: 0, rotateX: 85 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0, 
            duration: 1.4, 
            stagger: 0.04,
            ease: easeExpoOut 
          },
          0.1
        );
      }

      // Role reveal with clip-path
      tl.fromTo(
        roleRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: easeExpoInOut },
        0.6
      );

      // Badges pop in
      tl.fromTo(
        badgesRef.current?.children || [],
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: easeBackOut },
        0.8
      );

      // Description fade up
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1
      );

      // CTA buttons scale in
      tl.fromTo(
        ctaRef.current?.children || [],
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: easeBackOut },
        1.2
      );

      // Social icons slide up
      tl.fromTo(
        socialsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
        1.4
      );

      // Scroll-triggered parallax effects
      gsap.to(nameRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(roleRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameChars = 'Tauseef'.split('');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-secondary opacity-80" />
      
      {/* Floating particles - minimal */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${18 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-brand-indigo/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="section-padding relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Label */}
          <p 
            ref={labelRef}
            className="label text-brand-blue mb-6"
          >
            Final Year B.Tech CSE Student
          </p>

          {/* Name - Premium Display Font */}
          <h1
            ref={nameRef}
            className="font-display text-white mb-6"
            style={{ 
              perspective: '1000px',
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.95'
            }}
          >
            {nameChars.map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Role */}
          <p
            ref={roleRef}
            className="font-body text-xl sm:text-2xl md:text-3xl font-medium text-white/90 mb-8"
            style={{ letterSpacing: '-0.01em' }}
          >
            IoT · Cybersecurity · Blockchain
          </p>

          {/* Badges */}
          <div ref={badgesRef} className="flex flex-wrap justify-center gap-2 mb-10">
            <span className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-body text-white/70 backdrop-blur-sm">
              Fresher
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-body text-white/70 backdrop-blur-sm">
              DevSoc Member
            </span>
            <span className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-body text-white/70 backdrop-blur-sm">
              Open to Opportunities
            </span>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="font-body text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Passionate about building innovative solutions. 
            Developing technical skills through academic projects and continuous learning.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleScrollToProjects}
              className="group btn-primary px-8 py-4 bg-brand-blue text-white font-body font-medium rounded-full flex items-center justify-center gap-2"
            >
              View My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300 ease-expo-out" />
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 border border-white/20 text-white font-body font-medium rounded-full hover:border-brand-blue/50 hover:bg-white/[0.02] transition-all duration-500 ease-expo-out"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div ref={socialsRef} className="flex gap-3 justify-center">
            {[
              { icon: Github, href: 'https://github.com/TauseefJamal', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/tauseefjamal', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:mdtauseefjamal.iot.aec@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-premium w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-blue hover:border-brand-blue/30 bg-white/[0.02] backdrop-blur-sm"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-bg to-transparent" />
    </section>
  );
}
