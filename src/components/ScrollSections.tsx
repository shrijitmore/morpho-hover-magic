import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    number: '01',
    title: 'Product Design',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff'],
  },
  {
    number: '02',
    title: 'Development',
    description: 'Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.',
    services: ['Frontend Platforms (React / Next)', 'Backend APIs & Microservices', 'Mobile Apps (iOS & Android)', 'CI/CD & Cloud Ops'],
  },
  {
    number: '03',
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies—SEO, social media, paid ads, and content that drives growth and engagement.',
    services: ['SEO & Content Strategy', 'Social Media Marketing', 'Paid Advertising (PPC)', 'Analytics & Optimization'],
  },
  {
    number: '04',
    title: 'Garai - AI Solutions',
    description: 'Our flagship AI product—intelligent automation, chatbots, and custom AI solutions for modern businesses.',
    services: ['AI Chatbots & Assistants', 'Process Automation', 'Custom AI Development', 'AI Integration Services'],
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

interface ScrollSectionsProps {
  scrollProgress: number;
}

export default function ScrollSections({ scrollProgress }: ScrollSectionsProps) {
  return (
    <div className="relative z-20 pt-[100vh] pointer-events-none">
      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-start px-6 lg:px-12 py-24 pointer-events-auto snap-section"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">Our Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight max-w-3xl">
              We offer comprehensive digital solutions that transform your business.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-primary/60 text-sm font-mono">{service.number}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {service.services.map((s) => (
                      <span key={s} className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto snap-section"
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-card/30 border border-border/30 rounded-2xl p-8"
              >
                <p className="text-foreground text-lg leading-relaxed mb-8">"{testimonial.quote}"</p>
                <div>
                  <p className="text-foreground font-medium">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 lg:px-12 py-24 pointer-events-auto snap-section relative"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-10 tracking-tight">
            We turn bold ideas into
            <br />
            <span className="text-gradient italic">powerful digital realities.</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary/20 border border-primary/30 text-foreground px-12 py-5 rounded-full font-medium text-lg hover:bg-primary/30 transition-colors"
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
              <h3 className="text-xl font-display font-bold text-foreground mb-4 uppercase">Orangeglazz</h3>
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
