import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BellRing, Capsule, ShieldCheck } from 'lucide-react';
import { Toaster } from 'sonner';
import { AddMedicineDrawer } from './components/AddMedicineDrawer';
import { DateScroller } from './components/ui/DateScroller';
import { SpotlightCard } from './components/ui/SpotlightCard';
import { CircularProgress } from './components/ui/CircularProgress';
import { useMedicineStore } from './hooks/useMedicineStore';
import { useReminders } from './hooks/useReminders';
import { accentText } from './lib/utils';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const MedicineItem = ({ name, dosage, color, schedule }: { name: string; dosage: string; color: string; schedule: string }) => (
  <motion.li layout className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
    <div className="flex items-center gap-3">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <div>
        <p className="font-medium text-white">{name}</p>
        <p className="text-xs text-slate-300">{dosage}</p>
      </div>
    </div>
    <span className="text-xs text-slate-300">{schedule}</span>
  </motion.li>
);

const MemoMedicineItem = React.memo(MedicineItem);

export default function App() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { medicines, loadMedicines, selectedDayOffset, setSelectedDayOffset } = useMedicineStore();

  useEffect(() => {
    loadMedicines();
  }, [loadMedicines]);

  useReminders();

  const completion = useMemo(() => Math.min(100, medicines.length * 15), [medicines.length]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 font-body text-slate-100">
      <Toaster theme="dark" position="top-right" />
      <section className="mx-auto max-w-6xl">
        <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-semibold tracking-tight">
          Meet <span className={accentText}>MedAlert</span>
        </motion.h1>
        <p className="mt-2 max-w-xl text-slate-300">Offline-first medicine reminders with a luxurious, calm interface.</p>

        <motion.div variants={container} initial="hidden" animate="visible" className="mt-8 grid gap-4 md:grid-cols-3">
          {[{ icon: BellRing, label: 'Smart Reminders' }, { icon: ShieldCheck, label: 'Offline Secure' }, { icon: Capsule, label: 'Pill Tracking' }].map((card) => (
            <motion.div key={card.label} variants={item}>
              <SpotlightCard>
                <card.icon className="mb-2 text-blue-300" />
                <p className="font-heading tracking-tight">{card.label}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section ref={sectionRef} className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-[1.5fr_1fr]">
        <motion.div animate={inView ? 'visible' : 'hidden'} variants={container} initial="hidden" className="space-y-4">
          <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl tracking-tight">Today&apos;s Dashboard</h2>
              <AddMedicineDrawer />
            </div>
            <DateScroller selected={selectedDayOffset} onSelect={setSelectedDayOffset} />
            <ul className="mt-4 space-y-2">
              {medicines.map((medicine) => (
                <MemoMedicineItem
                  key={medicine.id}
                  name={medicine.name}
                  dosage={medicine.dosage}
                  color={medicine.color}
                  schedule={medicine.schedule}
                />
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={item} animate={inView ? 'visible' : 'hidden'} initial="hidden">
          <SpotlightCard className="grid place-items-center py-8">
            <CircularProgress value={completion} />
            <p className="mt-3 text-sm text-slate-300">Completed today</p>
          </SpotlightCard>
        </motion.div>
      </section>
    </main>
  );
}
