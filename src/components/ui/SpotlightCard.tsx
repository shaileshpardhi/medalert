import { type MouseEvent, useState } from 'react';
import { cn } from '../../lib/utils';

interface SpotlightCardProps {
  className?: string;
  children: React.ReactNode;
}

export const SpotlightCard = ({ className, children }: SpotlightCardProps) => {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(59,130,246,0.2), transparent 35%)`
      }}
    >
      {children}
    </div>
  );
};
