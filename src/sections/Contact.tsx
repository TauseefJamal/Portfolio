import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/TauseefJamal' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/tauseefjamal' },
  { name: 'Email', icon: Mail, url: 'mailto:mdtauseefjamal.iot.aec@gmail.com' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'mdtauseefjamal.iot.aec@gmail.com', href: 'mailto:mdtauseefjamal.iot.aec@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91-75496-0736', href: 'tel:+91754960736' },
  { icon: MapPin, label: 'Location', value: 'Asansol, West Bengal, India', href: null },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        infoRef.current?.children || [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social icons animation
      gsap.fromTo(
        socialsRef.current?.children || [],
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // EmailJS configuration
      // Note: User needs to set up their own EmailJS account and replace these values
      const serviceId = 'service_portfolio';
      const templateId = 'template_contact';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'mdtauseefjamal.iot.aec@gmail.com',
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        }),
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setShowDialog(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setErrorMessage('Failed to send message. Please try again or contact directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-blue/[0.03] via-transparent to-transparent" />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-indigo/[0.02] rounded-full blur-[120px]" />

      <div className="section-padding relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p ref={labelRef} className="label text-brand-blue mb-4">
              Get In Touch
            </p>
            <h2 ref={headingRef} className="heading-lg text-white mb-6">
              Let&apos;s <span className="text-brand-blue">Connect</span>
            </h2>
            <p ref={descRef} className="body-lg max-w-xl mx-auto">
              Have a project in mind or want to collaborate? 
              I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="blurry-glow-wrapper">
                <div className="blurry-glow" />
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="relative p-8 lg:p-10 bg-white/[0.02] border border-white/5 rounded-2xl"
                >
                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="font-body text-sm text-red-400">{errorMessage}</p>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="form-field-glow relative">
                        <label htmlFor="name" className="block font-body text-sm text-white/50 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input-premium w-full px-4 py-3.5 rounded-xl text-white font-body placeholder:text-white/20"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="form-field-glow relative">
                        <label htmlFor="email" className="block font-body text-sm text-white/50 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input-premium w-full px-4 py-3.5 rounded-xl text-white font-body placeholder:text-white/20"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-field-glow relative">
                      <label htmlFor="message" className="block font-body text-sm text-white/50 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="input-premium w-full px-4 py-3.5 rounded-xl text-white font-body placeholder:text-white/20 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group btn-primary w-full md:w-auto px-8 py-4 bg-brand-blue text-white font-body font-medium rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-expo-out" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info & Socials */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info with Blurry Glow */}
              <div ref={infoRef} className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="blurry-glow-wrapper"
                  >
                    <div className="blurry-glow" />
                    <div className="relative flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-brand-blue/20 hover:bg-white/[0.03] transition-all duration-500 ease-expo-out group">
                      <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue/15 transition-colors duration-300">
                        <info.icon className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs text-white/30 uppercase tracking-wider mb-0.5">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-body text-sm text-white/80 hover:text-brand-blue transition-colors duration-300 truncate block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-body text-sm text-white/80 truncate">{info.value}</p>
                        )}
                      </div>
                      {info.href && (
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-brand-blue transition-colors duration-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="font-mono text-xs text-white/30 uppercase tracking-wider mb-4">Follow me</p>
                <div ref={socialsRef} className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-premium w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Card with Blurry Glow */}
              <div className="blurry-glow-wrapper">
                <div className="blurry-glow" />
                <div className="relative p-6 bg-gradient-to-br from-brand-blue/10 to-brand-indigo/5 rounded-2xl border border-brand-blue/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-body text-sm text-green-400">Available for work</span>
                  </div>
                  <p className="font-body text-sm text-white/50 leading-relaxed">
                    Currently open to new opportunities, freelance projects, and collaborations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-dark-secondary border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Message Sent!
            </DialogTitle>
            <DialogDescription className="font-body text-white/50">
              Thank you for reaching out! I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
