import { useInView } from "../hooks/useInView";

// Fades + slides an element up into place the first time it scrolls into view.
// Pass `delay` (ms) to stagger a group of children one after another, and
// `duration` (ms) to slow down or speed up the reveal itself.
export default function Reveal({ as: Tag = "div", delay = 0, duration = 800, className = "", children, ...props }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={inView ? { animationDelay: `${delay}ms`, animationDuration: `${duration}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
