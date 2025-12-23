import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

interface ScrollSectionsProps {
  scrollProgress: number;
}

export default function ScrollSections({ scrollProgress }: ScrollSectionsProps) {
  return (
    <div className="relative z-20 pt-[100vh] pointer-events-none">
      {/* Section 1 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 pointer-events-auto snap-section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter">
            Web Engineering
          </h2>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            From high-performance React applications to complex enterprise systems, 
            we build web experiences that are fast, secure, and infinitely scalable.
          </p>
        </div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 pointer-events-auto snap-section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-6 font-bold">Native & Cross-Platform</p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter">
            App Development
          </h2>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            We transform ideas into premium iOS and Android applications. 
            Focused on intuitive UX and robust performance that keeps users coming back.
          </p>
        </div>
      </motion.section>

      {/* Section 3 - Feature Cards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        variants={fadeInUp}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 pointer-events-auto snap-section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter">
              Full-Stack Solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/30 backdrop-blur-xl border border-white/5 rounded-3xl p-10 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                UI/UX Strategy
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                User-centric design combined with strategic business goals to create 
                interfaces that convert and delight.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card/30 backdrop-blur-xl border border-white/5 rounded-3xl p-10 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                Scalable Architecture
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cloud-native backend systems designed to handle millions of requests 
                while maintaining maximum uptime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card/30 backdrop-blur-xl border border-white/5 rounded-3xl p-10 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                API Integration
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Seamlessly connecting your product with third-party services, payment 
                gateways, and legacy systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card/30 backdrop-blur-xl border border-white/5 rounded-3xl p-10 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                Ongoing Support
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We don't just launch and leave. We provide continuous maintenance, 
                updates, and performance monitoring.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 pointer-events-auto snap-section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-10 tracking-tighter">
            Ready to build?
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl mb-12 max-w-xl mx-auto">
            Let's discuss how we can bring your next digital product to life.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-primary-foreground px-12 py-5 rounded-full font-bold text-xl shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            Get a Quote
          </motion.button>
        </div>
      </motion.section>

      {/* Spacer for smooth scroll end */}
      <div className="h-24" />
    </div>
  );
}
