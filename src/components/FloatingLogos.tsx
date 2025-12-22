import { motion } from 'framer-motion';

// Sample partner logos - using colored circles with initials as placeholders
const partners = [
  { id: 1, name: 'Safe', color: '#10B981', x: 15, y: 20 },
  { id: 2, name: 'Ledger', color: '#6366F1', x: 75, y: 15 },
  { id: 3, name: 'Coinbase', color: '#3B82F6', x: 85, y: 45 },
  { id: 4, name: 'Gemini', color: '#06B6D4', x: 20, y: 55 },
  { id: 5, name: 'Trust', color: '#22C55E', x: 35, y: 30 },
  { id: 6, name: 'Robinhood', color: '#F59E0B', x: 65, y: 35 },
  { id: 7, name: 'Block', color: '#10B981', x: 45, y: 65 },
  { id: 8, name: 'Circle', color: '#8B5CF6', x: 80, y: 70 },
  { id: 9, name: 'Lemon', color: '#EF4444', x: 25, y: 75 },
  { id: 10, name: 'Bitpanda', color: '#14B8A6', x: 55, y: 55 },
  { id: 11, name: 'MEV', color: '#6B7280', x: 90, y: 60 },
  { id: 12, name: 'Frax', color: '#1F2937', x: 10, y: 40 },
];

interface FloatingLogosProps {
  scrollProgress: number;
}

export default function FloatingLogos({ scrollProgress }: FloatingLogosProps) {
  // Logos start appearing at 40% scroll, fully visible at 70%
  const logoProgress = Math.max(0, (scrollProgress - 0.4) / 0.3);
  
  if (logoProgress <= 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {partners.map((partner, index) => {
        // Stagger the appearance
        const staggerDelay = index * 0.05;
        const individualProgress = Math.max(0, Math.min(1, logoProgress - staggerDelay));
        
        // Subtle floating animation offset
        const floatOffset = Math.sin(Date.now() / 2000 + index) * 5;
        
        return (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: individualProgress,
              scale: 0.8 + individualProgress * 0.2,
            }}
            style={{
              position: 'absolute',
              left: `${partner.x}%`,
              top: `${partner.y}%`,
              transform: `translate(-50%, -50%) translateY(${floatOffset}px)`,
            }}
            className="flex items-center justify-center"
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{
                backgroundColor: partner.color,
                boxShadow: `0 0 20px ${partner.color}40`,
              }}
            >
              {partner.name.charAt(0)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
