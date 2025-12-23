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
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 pointer-events-auto"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Powered by Morpho
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Enterprises connect with Morpho to power any lending or borrowing use case at scale.
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
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 pointer-events-auto"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm uppercase tracking-wider mb-4">Built for scale</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Enterprise-grade infrastructure
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Launch in weeks, not months. Our infrastructure handles billions in daily volume with
            enterprise security and reliability.
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
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 pointer-events-auto"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6">
              Solutions for every use case
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Embed custom earn products
              </h3>
              <p className="text-muted-foreground">
                Give your users access to yield on any asset and across any risk profile or
                compliance requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Launch credit products
              </h3>
              <p className="text-muted-foreground">
                Enable your users to borrow against their assets with flexible terms and
                competitive rates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Build DeFi protocols
              </h3>
              <p className="text-muted-foreground">
                Leverage our battle-tested smart contracts to build new financial primitives
                and protocols.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Institutional solutions
              </h3>
              <p className="text-muted-foreground">
                Custom integrations and dedicated support for institutions managing significant
                capital.
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
        className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 pointer-events-auto"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join the enterprises already building on Morpho.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent text-accent-foreground px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-accent/20"
          >
            Launch App
          </motion.button>
        </div>
      </motion.section>

      {/* Spacer for smooth scroll end */}
      <div className="h-24" />
    </div>
  );
}
