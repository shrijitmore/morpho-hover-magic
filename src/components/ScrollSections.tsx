import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Product Design',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff'],
    tools: ['Figma', 'Sketch', 'Adobe XD', 'Framer'],
  },
  {
    number: '02',
    title: 'Development',
    description: 'Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.',
    services: ['Frontend Platforms (React / Next)', 'Backend APIs & Microservices', 'Mobile Apps (iOS & Android)', 'CI/CD & Cloud Ops'],
    tools: ['React', 'Node.js', 'Flutter', 'AWS'],
  },
  {
    number: '03',
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies—SEO, social media, paid ads, and content that drives growth and engagement.',
    services: ['SEO & Content Strategy', 'Social Media Marketing', 'Paid Advertising (PPC)', 'Analytics & Optimization'],
    tools: ['Google Ads', 'Meta Ads', 'Mailchimp', 'HubSpot'],
  },
  {
    number: '04',
    title: 'Garai - AI Solutions',
    description: 'Our flagship AI product—intelligent automation, chatbots, and custom AI solutions for modern businesses.',
    services: ['AI Chatbots & Assistants', 'Process Automation', 'Custom AI Development', 'AI Integration Services'],
    tools: ['OpenAI', 'LangChain', 'TensorFlow', 'Python'],
  },
];

const caseStudies = [
  {
    number: '01',
    title: 'TechFlow App',
    tags: ['App Design', 'Development', 'AI Integration'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
  },
  {
    number: '02',
    title: 'GreenLeaf Brand',
    tags: ['Web Design', 'Digital Marketing'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    number: '03',
    title: 'HealthPlus Portal',
    tags: ['Web Design', 'Development'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  },
  {
    number: '04',
    title: 'CloudSync Platform',
    tags: ['App Design', 'AI Development'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    number: '05',
    title: 'RetailMax Store',
    tags: ['E-commerce', 'Digital Marketing'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
];

const testimonials = [
  {
    quote: "The Orangeglazz team worked with me to build my e-commerce site. Within 90 days of launch, our store was exceeding expectations in monthly revenue.",
    name: "Sarah M.",
    company: "TechStart Inc.",
  },
  {
    quote: "We worked with Orangeglazz to redesign our marketing site and mobile app, increasing both customer acquisition and retention significantly.",
    name: "James K.",
    company: "GrowthLab",
  },
  {
    quote: "We wanted to build a new customer platform; with Orangeglazz we were able to design and launch a working MVP in under a month.",
    name: "Priya R.",
    company: "InnovateCo",
  },
];

const clients = [
  'TechCorp', 'InnovateLabs', 'StartupX', 'DigitalFirst', 'CloudNine', 'DataDriven'
];

interface ScrollSectionsProps {
  scrollProgress: number;
}

export default function ScrollSections({ scrollProgress }: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spotlight/mask background animation
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
          backgroundPosition: "50% 100%",
          opacity: 1,
        });
      }

      // Services section - stacked pinned cards
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll('.service-card');
        
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { 
              y: 100 + (i * 20), 
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)"
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                scrub: 1,
              }
            }
          );

          // Parallax on scroll out
          gsap.to(card, {
            y: -50 - (i * 10),
            opacity: 0.6,
            scale: 0.95,
            scrollTrigger: {
              trigger: card,
              start: "bottom 50%",
              end: "bottom -20%",
              scrub: 1,
            }
          });
        });
      }

      // Case studies - horizontal scroll scrub
      if (caseStudiesRef.current && horizontalRef.current) {
        const scrollWidth = horizontalRef.current.scrollWidth - window.innerWidth + 200;
        
        gsap.to(horizontalRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: caseStudiesRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        // Individual card animations
        const caseCards = horizontalRef.current.querySelectorAll('.case-card');
        caseCards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0.3, scale: 0.85, rotateY: -15 },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              scrollTrigger: {
                trigger: caseStudiesRef.current,
                start: `top+=${i * 200} top`,
                end: `top+=${i * 200 + 400} top`,
                scrub: 1,
              }
            }
          );
        });
      }

      // Testimonials - parallax reveal with stagger
      if (testimonialsRef.current) {
        const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach((card, i) => {
          gsap.fromTo(card,
            { 
              y: 150, 
              opacity: 0, 
              rotateX: 15,
              filter: "blur(8px)"
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              filter: "blur(0px)",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 50%",
                scrub: 1,
              }
            }
          );
        });
      }

      // CTA section - dramatic reveal
      if (ctaRef.current) {
        const ctaElements = ctaRef.current.querySelectorAll('.cta-element');
        
        ctaElements.forEach((el, i) => {
          gsap.fromTo(el,
            { 
              y: 80 + (i * 20), 
              opacity: 0,
              scale: 0.9
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: ctaRef.current,
                start: `top+=${i * 50} 80%`,
                end: `top+=${i * 50 + 200} 40%`,
                scrub: 1,
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 pt-[100vh]">
      {/* Spotlight/mask background fade */}
      <div 
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-10 opacity-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, hsl(var(--background)) 70%)`,
          backgroundPosition: "50% 0%",
        }}
      />

      {/* Services Section - Stacked Cards */}
      <section
        ref={servicesRef}
        className="min-h-screen flex flex-col items-center justify-start px-6 lg:px-12 py-24 pointer-events-auto relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Our Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-4xl leading-tight">
              We offer comprehensive digital solutions that transform your business.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
            {services.map((service, idx) => (
              <div
                key={service.number}
                className="service-card group bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-primary/50 hover:bg-card/60 transition-all duration-500 cursor-pointer relative overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-primary text-sm font-mono">{service.number}</span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {service.services.map((s) => (
                          <span 
                            key={s} 
                            className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/30 hover:border-primary/30 hover:text-foreground transition-all duration-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Tools</p>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map((tool) => (
                          <span 
                            key={tool} 
                            className="text-xs text-primary/80 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section - Horizontal Scroll */}
      <section 
        ref={caseStudiesRef}
        className="h-screen pointer-events-auto overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 px-6 lg:px-12 pt-24 z-20">
          <div className="max-w-7xl">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Case Studies</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-3xl leading-tight">
              Proven results, measurable impact.
            </h2>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={horizontalRef}
          className="flex items-center gap-8 px-6 lg:px-12 h-full pt-32"
          style={{ width: "fit-content" }}
        >
          {caseStudies.map((study, idx) => (
            <div
              key={study.number}
              className="case-card group relative min-w-[350px] md:min-w-[450px] lg:min-w-[550px] h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer flex-shrink-0"
              style={{ perspective: "1000px" }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${study.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <span className="text-primary text-sm font-mono self-start bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  {study.number}
                </span>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Parallax Reveal */}
      <section
        ref={testimonialsRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto"
        style={{ perspective: "1000px" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight">
              What our clients
              <br />
              <span className="text-gradient italic">say about us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="testimonial-card group bg-card/30 border border-border/30 rounded-3xl p-8 hover:border-primary/30 hover:bg-card/50 transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <p className="text-foreground text-lg leading-relaxed mb-8 group-hover:text-foreground/90 transition-colors">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-foreground font-medium">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-24 px-6 lg:px-12 pointer-events-auto">
        <div className="max-w-7xl mx-auto text-center">
          <div>
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Trusted by Industry Leaders</p>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-muted-foreground mb-12">
              Powering Innovation for Companies Worldwide
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {clients.map((client, idx) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/40 hover:text-foreground/60 transition-colors duration-300 cursor-pointer"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dramatic Reveal */}
      <section
        ref={ctaRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto relative overflow-hidden"
      >
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="cta-element text-primary text-sm uppercase tracking-[0.3em] mb-8 font-medium">
            Ready to start?
          </p>
          
          <h2 className="cta-element text-5xl md:text-6xl lg:text-8xl font-display font-bold text-foreground mb-12 tracking-tight leading-[1.1]">
            We turn bold ideas into
            <br />
            <span className="text-gradient italic">powerful digital realities.</span>
          </h2>

          <p className="cta-element text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Partner with Orangeglazz to bring your vision to life. Let's create something extraordinary together.
          </p>
          
          <div className="cta-element flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-medium text-lg transition-all shadow-lg shadow-primary/30 hover:scale-105 hover:shadow-xl hover:shadow-primary/40">
              Start Your Project
            </button>
            <button className="border border-border/50 text-foreground px-10 py-5 rounded-full font-medium text-lg hover:bg-muted/20 hover:border-primary/30 transition-all hover:scale-105">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/20 px-6 lg:px-12 py-20 pointer-events-auto overflow-hidden">
        {/* Footer background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top section with large branding */}
          <div className="mb-20">
            <h3 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 uppercase tracking-wider">
              Orangeglazz
            </h3>
            <p className="text-muted-foreground text-lg max-w-md">
              Transforming ideas into digital excellence. Your vision, our expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h4 className="text-sm uppercase tracking-wider text-primary mb-4">Get in touch</h4>
              <a href="mailto:hello@orangeglazz.com" className="text-2xl md:text-3xl font-display text-foreground hover:text-primary transition-colors">
                hello@orangeglazz.com
              </a>
              <div className="flex gap-4 text-muted-foreground text-sm mt-6">
                <span>Based globally</span>
                <span>•</span>
                <span>Serving clients worldwide</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm uppercase tracking-wider text-primary mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Product Design</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Development</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Digital Marketing</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Garai AI</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm uppercase tracking-wider text-primary mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Our Work</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm">© 2025 Orangeglazz. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Dribbble</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
