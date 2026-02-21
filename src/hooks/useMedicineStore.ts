import { create } from 'zustand';
import { db, type Medicine } from '../lib/db';

interface MedicineState {
  medicines: Medicine[];
  selectedDayOffset: number;
  loading: boolean;
  loadMedicines: () => Promise<void>;
  addMedicine: (medicine: Omit<Medicine, 'id' | 'createdAt'>) => Promise<void>;
  setSelectedDayOffset: (offset: number) => void;
}

export const useMedicineStore = create<MedicineState>((set) => ({
  medicines: [],
  selectedDayOffset: 0,
  loading: false,
  setSelectedDayOffset: (offset) => set({ selectedDayOffset: offset }),
  loadMedicines: async () => {
    set({ loading: true });
    const medicines = await db.medicines.orderBy('createdAt').reverse().toArray();
    set({ medicines, loading: false });
  },
  addMedicine: async (medicine) => {
    await db.medicines.add({ ...medicine, createdAt: Date.now() });
    const medicines = await db.medicines.orderBy('createdAt').reverse().toArray();
    set({ medicines });
  }
}));
