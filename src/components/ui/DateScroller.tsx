import { motion } from 'framer-motion';

interface DateScrollerProps {
  selected: number;
  onSelect: (offset: number) => void;
}

const days = Array.from({ length: 7 }).map((_, index) => index - 3);

export const DateScroller = ({ selected, onSelect }: DateScrollerProps) => {
  const now = new Date();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {days.map((offset) => {
        const date = new Date(now);
        date.setDate(now.getDate() + offset);
        const isSelected = selected === offset;

        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={offset}
            onClick={() => onSelect(offset)}
            aria-label={`Select ${date.toDateString()}`}
            className={`relative rounded-xl border px-4 py-2 text-sm ${
              isSelected ? 'border-blue-400 bg-blue-500/20 text-white' : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            {isSelected && <motion.div layoutId="date-pill" className="absolute inset-0 rounded-xl bg-white/10" />}
            <span className="relative">{date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
