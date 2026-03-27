import { motion } from 'motion/react';

export function NewsDetailView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 pb-12">
      <section className="relative h-[618px] w-full overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN8ssSqTSlVoY1fyimAT-o5sYuegGFLNQ59pUX2ACOrX6aixStQ3ETrRrU3FXTw2cVmDtx_RWKTaIG_XbV05b7iVeQsTDg1ydcLoUL0gUflh6S3--HTVLol3xUE0JmqCuz5FaQ5Nc9PQ--X8492QmeAvGkdc0G3aJtuexGMK1t29_a2usRjsdnvFu5lxTQbEkLxgoVCMxVH4s_es6Fy9yPGdQKAr2AT3jXR1vpu2Wjl0Nu6TdpluXfaqg8Jxx2ligAvK-PL4I2-3e6"
          alt="Training"
          className="w-full h-full object-cover grayscale-[0.2] brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="inline-block bg-primary-red text-white font-label font-bold text-xs tracking-widest px-3 py-1 mb-4 uppercase">
            EXCLUSIVE ACCESS
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9] max-w-4xl text-white">
            INSIDE TRAINING: FOCUS ON THE FRONT THREE
          </h1>
          <div className="mt-6 flex items-center gap-4 font-label text-sm tracking-widest text-text-muted uppercase">
            <span className="text-primary-red font-bold">BY LFC MEDIA</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>24 OCT 2023</span>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-3xl mx-auto space-y-8">
        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          The intensity at the AXA Training Centre has reached a new fever pitch this week. As the squad prepares for the upcoming high-stakes clash,
          the focus from the coaching staff has pivoted sharply toward the clinical efficiency of the front three.
        </p>
        <div className="py-12 relative">
          <span className="absolute top-0 left-0 text-9xl text-primary-red/10 font-black leading-none pointer-events-none -translate-x-8 -translate-y-4">
            "
          </span>
          <blockquote className="border-l-4 border-primary-red pl-8 py-2">
            <p className="text-3xl md:text-5xl text-white italic tracking-tight uppercase leading-[1.1]">
              The front three aren't just attackers; they are the first line of defense and the architects of chaos.
            </p>
            <cite className="block mt-6 font-label text-sm font-bold text-primary-red uppercase tracking-widest not-italic">
              — ASSISTANT COACH REFLECTION
            </cite>
          </blockquote>
        </div>
      </section>
    </motion.div>
  );
}

