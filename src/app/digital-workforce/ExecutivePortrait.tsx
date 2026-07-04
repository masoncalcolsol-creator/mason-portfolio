import {
  Bird,
  BookOpen,
  Cat,
  Clock3,
  Cog,
  Navigation,
  Shield,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Employee } from "./data";
import styles from "./executive-portrait.module.css";

const icons: Record<string, LucideIcon> = {
  knox: Cog,
  kaizen: TrendingUp,
  crow: Bird,
  "jiro-ladderbearer": Clock3,
  jumper: Navigation,
  eleven: Shield,
  shoji: BookOpen,
  "chairman-meow": Cat,
  rendersmith: Sparkles,
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function ExecutivePortrait({ employee }: { employee: Employee }) {
  if (employee.slug === "mason-perry") {
    return (
      <div className={`${styles.portrait} ${styles.mason}`}>
        <img
          src="https://avatars.githubusercontent.com/u/260298205?v=4"
          alt="Mason Perry"
        />
        <div className={styles.photoPlate}>NULLMASTER</div>
      </div>
    );
  }

  const Icon = icons[employee.slug] ?? Sparkles;

  return (
    <div className={`${styles.portrait} ${styles[employee.accent]}`} aria-label={`${employee.name} executive portrait`}>
      <div className={styles.grid} />
      <div className={styles.halo} />
      <div className={styles.shoulders} />
      <div className={styles.head}>
        <span>{initials(employee.name)}</span>
      </div>
      <div className={styles.emblem}><Icon size={24} /></div>
      <div className={styles.photoPlate}>{employee.name}</div>
    </div>
  );
}
