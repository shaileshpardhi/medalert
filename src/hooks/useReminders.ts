import { useEffect } from 'react';
import { toast } from 'sonner';
import { db } from '../lib/db';

export const useReminders = () => {
  useEffect(() => {
    const interval = window.setInterval(async () => {
      const now = new Date();
      const currentMinute = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      const medicines = await db.medicines.toArray();

      medicines.forEach((medicine) => {
        if (medicine.schedule === currentMinute) {
          toast(`Time for ${medicine.name}`, {
            description: `Dose: ${medicine.dosage}`,
            action: {
              label: 'Mark taken',
              onClick: () => {
                if (!medicine.id) return;
                db.doseLogs.add({ medicineId: medicine.id, takenAt: Date.now() });
              }
            }
          });
        }
      });
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);
};
