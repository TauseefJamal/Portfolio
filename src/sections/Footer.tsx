import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/TauseefJamal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/tauseefjamal', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mdtauseefjamal.iot.aec@gmail.com', label: 'Email' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-20 lg:py-24 bg-white/[0.01] border-t border-white/5"
    >
      <div className="section-padding">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, '#hero')} 
                className="inline-block font-display text-2xl text-white mb-4 hover:text-brand-blue transition-colors duration-300"
              >
                Tauseef<span className="text-brand-blue">.</span>
              </a>
              <p className="font-body text-sm text-white/40 max-w-sm mb-6 leading-relaxed">
                A passionate software developer specializing in IoT, Cybersecurity, and Blockchain. 
                Building innovative solutions and creating exceptional digital experiences.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-premium w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm text-white/40 mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="link-underline font-body text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display text-sm text-white/40 mb-5">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:mdtauseefjamal.iot.aec@gmail.com"
                    className="font-body text-sm text-white/50 hover:text-brand-blue transition-colors duration-300"
                  >
                    mdtauseefjamal.iot.aec@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+91754960736"
                    className="font-body text-sm text-white/50 hover:text-brand-blue transition-colors duration-300"
                  >
                    +91-75496-0736
                  </a>
                </li>
                <li>
                  <span className="font-body text-sm text-white/50">
                    Asansol, West Bengal, India
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="font-body text-sm text-white/30 flex items-center gap-1.5">
                © {new Date().getFullYear()} Tauseef. Crafted with{' '}
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> and passion.
              </p>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 font-body text-sm text-white/30 hover:text-brand-blue transition-colors duration-300"
              >
                Back to Top
                <span className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 transition-all duration-300">
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
