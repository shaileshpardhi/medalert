import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useMedicineStore } from '../hooks/useMedicineStore';

const colors = ['#3B82F6', '#A78BFA', '#22C55E', '#F97316', '#EF4444'];

export const AddMedicineDrawer = () => {
  const addMedicine = useMedicineStore((s) => s.addMedicine);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', dosage: '', schedule: '08:00', color: colors[0] });

  const submit = async () => {
    await addMedicine(form);
    setOpen(false);
    setStep(1);
    setForm({ name: '', dosage: '', schedule: '08:00', color: colors[0] });
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        aria-label="Add medicine"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white"
      >
        <Plus size={18} /> Add Medicine
      </motion.button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-xl rounded-t-3xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="mb-4 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-accent" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
              {step === 1 && (
                <div className="space-y-3">
                  <input aria-label="Medicine name" className="w-full rounded-lg border border-white/10 bg-white/5 p-3" placeholder="Medicine name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  <input aria-label="Dosage" className="w-full rounded-lg border border-white/10 bg-white/5 p-3" placeholder="Dosage" value={form.dosage} onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))} />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-3">
                  <label className="text-sm text-slate-300">Schedule</label>
                  <input aria-label="Schedule time" type="time" className="w-full rounded-lg border border-white/10 bg-white/5 p-3" value={form.schedule} onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))} />
                </div>
              )}
              {step === 3 && (
                <div>
                  <p className="mb-2 text-sm text-slate-300">Pill color</p>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        type="button"
                        key={color}
                        aria-label={`Pick ${color} color`}
                        onClick={() => setForm((f) => ({ ...f, color }))}
                        className={`h-10 w-10 rounded-full border-2 ${form.color === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => (step > 1 ? setStep(step - 1) : setOpen(false))} aria-label="Back" className="rounded-lg border border-white/10 px-4 py-2">
                  Back
                </motion.button>
                {step < 3 ? (
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStep(step + 1)} aria-label="Continue" className="rounded-lg bg-accent px-4 py-2 text-white">
                    Continue
                  </motion.button>
                ) : (
                  <motion.button whileTap={{ scale: 0.95 }} onClick={submit} aria-label="Save medicine" className="rounded-lg bg-accent px-4 py-2 text-white">
                    Save
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
