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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in animations for each section
      gsap.utils.toArray('.scroll-section').forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      });

      // Card stagger animations
      gsap.utils.toArray('.animate-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Background fade based on scroll
  const bgOpacity = Math.min(scrollProgress * 2, 0.9);

  return (
    <div ref={containerRef} className="relative z-20 pt-[100vh]">
      {/* Background fade overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 bg-background"
        style={{ opacity: bgOpacity }}
      />

      {/* Services Section */}
      <section className="scroll-section min-h-screen flex flex-col items-center justify-start px-6 lg:px-12 py-24 pointer-events-auto relative z-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Our Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-4xl leading-tight">
              We offer comprehensive digital solutions that transform your business.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.number}
                className="animate-card group bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-primary/50 hover:bg-card/60 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
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
                            className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/30"
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

      {/* Case Studies Section */}
      <section className="scroll-section min-h-screen flex flex-col items-center justify-start px-6 lg:px-12 py-24 pointer-events-auto relative z-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Case Studies</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-3xl leading-tight">
              Proven results, measurable impact.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <div
                key={study.number}
                className="animate-card group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${study.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="text-primary text-sm font-mono self-start bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {study.number}
                  </span>
                  
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4">
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

                <div className="absolute top-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="scroll-section min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto relative z-20">
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
                className="animate-card group bg-card/30 border border-border/30 rounded-3xl p-8 hover:border-primary/30 hover:bg-card/50 transition-all duration-500"
              >
                <p className="text-foreground text-lg leading-relaxed mb-8">
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
      <section className="scroll-section py-24 px-6 lg:px-12 pointer-events-auto relative z-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Trusted by Industry Leaders</p>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-muted-foreground mb-12">
            Powering Innovation for Companies Worldwide
          </h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {clients.map((client, idx) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-2xl font-display font-bold text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="scroll-section min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm uppercase tracking-[0.2em] mb-6 font-medium"
          >
            Ready to Start?
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight mb-8"
          >
            Let's build something
            <br />
            <span className="text-gradient italic">extraordinary</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            Transform your vision into reality with our expert team of designers, developers, and strategists.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 text-lg">
              Start Your Project
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-medium hover:bg-card/50 transition-all duration-300 text-lg">
              View Our Work
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="scroll-section py-24 px-6 lg:px-12 border-t border-border/30 pointer-events-auto relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-display font-bold text-foreground mb-4">ORANGEGLAZZ</h3>
              <p className="text-muted-foreground max-w-md">
                Empowering businesses with digital solutions that turn complex challenges into real-world outcomes.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Links</h4>
              <ul className="space-y-3">
                {['Work', 'Services', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-foreground hover:text-primary transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Connect</h4>
              <ul className="space-y-3">
                {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-foreground hover:text-primary transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/30">
            <p className="text-muted-foreground text-sm">
              © 2024 Orangeglazz. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
