import { useEffect, useRef, useState, useCallback } from "react";
import { FIREBASE_ENABLED, subscribeSensor, setMotor as fbSetMotor } from "@/firebase/client";

export type MoistureStatus = "happy" | "okay" | "dry";
export type MotorState = "ON" | "OFF";

export type HistoryPoint = { t: number; moisture: number };

export function getMoistureStatus(m: number): MoistureStatus {
  if (m >= 50) return "happy";
  if (m >= 30) return "okay";
  return "dry";
}

const MAX_POINTS = 60;

/**
 * Combined hook: live sensor data with Firebase OR simulated mock.
 */
export function useSensorData() {
  const [moisture, setMoisture] = useState<number>(55);
  const [motor, setMotorState] = useState<MotorState>("OFF");
  const [lastSeen, setLastSeen] = useState<number>(Date.now());
  const [history, setHistory] = useState<HistoryPoint[]>(() => {
    const now = Date.now();
    return Array.from({ length: 30 }, (_, i) => ({
      t: now - (29 - i) * 60_000,
      moisture: 50 + Math.sin(i / 3) * 12 + Math.random() * 6,
    }));
  });
  const motorRef = useRef<MotorState>("OFF");

  // --- LIVE Firebase mode ---
  useEffect(() => {
    if (!FIREBASE_ENABLED) return;
    const unsub = subscribeSensor((s) => {
      setMoisture(s.moisture);
      setMotorState(s.motor);
      motorRef.current = s.motor;
      setLastSeen(s.lastSeen);
      setHistory((h) => {
        const next = [...h, { t: Date.now(), moisture: s.moisture }];
        return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
      });
    });
    return unsub;
  }, []);

  // --- MOCK simulation (when Firebase disabled) ---
  useEffect(() => {
    if (FIREBASE_ENABLED) return;
    let m = moisture;
    const interval = setInterval(() => {
      // motor ON -> moisture rises; motor OFF -> slowly dries
      const delta =
        motorRef.current === "ON"
          ? 1.8 + Math.random() * 1.2
          : -0.6 - Math.random() * 0.5;
      m = Math.max(8, Math.min(95, m + delta));
      const now = Date.now();
      setMoisture(m);
      setLastSeen(now);
      setHistory((h) => {
        const next = [...h, { t: now, moisture: m }];
        return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
      });
    }, 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMotor = useCallback(async (state: MotorState) => {
    motorRef.current = state;
    setMotorState(state);
    if (FIREBASE_ENABLED) {
      try {
        await fbSetMotor(state);
      } catch (e) {
        console.error("Failed to set motor", e);
      }
    }
  }, []);

  return {
    moisture,
    motor,
    lastSeen,
    history,
    setMotor,
    status: getMoistureStatus(moisture),
    isLive: FIREBASE_ENABLED,
  };
}
