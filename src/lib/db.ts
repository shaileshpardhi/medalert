import Dexie, { type Table } from 'dexie';

export interface Medicine {
  id?: number;
  name: string;
  dosage: string;
  color: string;
  schedule: string;
  createdAt: number;
}

export interface DoseLog {
  id?: number;
  medicineId: number;
  takenAt: number;
}

class MedAlertDB extends Dexie {
  medicines!: Table<Medicine, number>;
  doseLogs!: Table<DoseLog, number>;

  constructor() {
    super('medalert-db');
    this.version(1).stores({
      medicines: '++id, name, createdAt',
      doseLogs: '++id, medicineId, takenAt'
    });
  }
}

export const db = new MedAlertDB();
