import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type Props = {
  children: string;
  tag?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Heading that reveals word-by-word from behind a mask. */
export default function AnimatedHeading({
  children,
  tag = "h2",
  className,
  delay = 0,
  stagger = 0.08,
}: Props) {
  const words = children.split(" ");
  const MotionTag = tag === "h1" ? motion.h1 : tag === "h3" ? motion.h3 : motion.h2;

  return (
    <MotionTag className={cn("flex flex-wrap", className)} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.26em] inline-block overflow-hidden pb-[0.08em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "112%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
