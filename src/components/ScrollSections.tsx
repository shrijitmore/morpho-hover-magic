import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

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
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: caseStudiesRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="relative z-20 pt-[100vh] pointer-events-none">
      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-start px-6 lg:px-12 py-24 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Our Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-4xl leading-tight">
              We offer comprehensive digital solutions that transform your business.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-primary/50 hover:bg-card/60 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.span 
                      className="text-primary text-sm font-mono"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {service.number}
                    </motion.span>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </motion.div>
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
                          <motion.span 
                            key={s} 
                            className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/30 hover:border-primary/30 hover:text-foreground transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {s}
                          </motion.span>
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <section 
        ref={caseStudiesRef}
        className="min-h-screen py-24 pointer-events-auto overflow-hidden"
      >
        <div className="px-6 lg:px-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Case Studies</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-3xl leading-tight">
                Proven results, measurable impact—explore the transformations we've delivered.
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <motion.div 
          className="flex gap-6 px-6 lg:px-12"
          style={{ x }}
        >
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.7, 
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
              className="group relative min-w-[350px] md:min-w-[450px] lg:min-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
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
                <motion.span 
                  className="text-primary text-sm font-mono self-start bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  {study.number}
                </motion.span>
                
                <div>
                  <motion.h3 
                    className="text-2xl md:text-3xl font-display font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    {study.title}
                  </motion.h3>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag, tagIdx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 + tagIdx * 0.05 }}
                        className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <motion.div 
                className="absolute top-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 45 }}
              >
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight">
              What our clients
              <br />
              <span className="text-gradient italic">say about us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: idx * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group bg-card/30 border border-border/30 rounded-3xl p-8 hover:border-primary/30 hover:bg-card/50 transition-all duration-500"
              >
                <p className="text-foreground text-lg leading-relaxed mb-8 group-hover:text-foreground/90 transition-colors">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-foreground font-medium">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trusted By Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 px-6 lg:px-12 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Trusted by Industry Leaders</p>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-muted-foreground mb-12">
              Powering Innovation for Companies Worldwide
            </h2>
          </motion.div>

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
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto relative"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-10 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            We turn bold ideas into
            <br />
            <span className="text-gradient italic">powerful digital realities.</span>
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-primary-foreground px-12 py-5 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Let's work together
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 lg:px-12 py-16 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-xl font-display font-bold text-foreground mb-4 uppercase tracking-wider">Orangeglazz</h3>
              <p className="text-muted-foreground text-sm mb-4">hello@orangeglazz.com</p>
              <div className="flex gap-4 text-muted-foreground text-sm">
                <span>Based globally</span>
                <span>•</span>
                <span>Serving clients worldwide</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Product Design</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Development</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Garai AI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Our Work</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2025 Orangeglazz. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
