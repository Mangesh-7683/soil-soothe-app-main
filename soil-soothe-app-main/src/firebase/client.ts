import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, Database } from "firebase/database";
import { FIREBASE_CONFIG, FIREBASE_ENABLED, DEVICE_ID } from "./config";

let app: FirebaseApp | null = null;
let db: Database | null = null;

function getDb(): Database | null {
  if (!FIREBASE_ENABLED) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
    db = getDatabase(app);
  }
  return db;
}

export type SensorSnapshot = {
  moisture: number;
  motor: "ON" | "OFF";
  lastSeen: number;
};

export function subscribeSensor(cb: (s: SensorSnapshot) => void): () => void {
  const database = getDb();
  if (!database) return () => {};
  const r = ref(database, `devices/${DEVICE_ID}`);
  const unsub = onValue(r, (snap) => {
    const v = snap.val() || {};
    cb({
      moisture: typeof v.moisture === "number" ? v.moisture : 0,
      motor: v.motor === "ON" ? "ON" : "OFF",
      lastSeen: typeof v.lastSeen === "number" ? v.lastSeen : Date.now(),
    });
  });
  return unsub;
}

export async function setMotor(state: "ON" | "OFF"): Promise<void> {
  const database = getDb();
  if (!database) return;
  await set(ref(database, `devices/${DEVICE_ID}/motor`), state);
}

export async function pushHistoryPoint(moisture: number, motor: "ON" | "OFF"): Promise<void> {
  const database = getDb();
  if (!database) return;
  await push(ref(database, `devices/${DEVICE_ID}/history`), {
    moisture,
    motor,
    ts: Date.now(),
  });
}

export { FIREBASE_ENABLED };
