export const duration = {
  instant: 0.12,
  fast: 0.18,
  normal: 0.28,
  slow: 0.4,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  spring: { type: "spring" as const, stiffness: 400, damping: 28 },
  softSpring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.fast },
  },
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.out },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    transition: { duration: duration.fast, ease: ease.inOut },
  }),
};
