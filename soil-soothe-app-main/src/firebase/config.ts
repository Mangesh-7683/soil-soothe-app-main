/**
 * Firebase configuration for Smart Irrigation.
 *
 * To connect your real Arduino feed:
 *   1. Create a Firebase project (https://console.firebase.google.com)
 *   2. Enable Realtime Database
 *   3. Set rules to allow read/write for testing (or auth-protected for production)
 *   4. Replace the placeholder values below with your project's config
 *   5. Set ENABLED = true
 *
 * Expected database structure (write from Arduino, read from website):
 *   /devices/{deviceId}/moisture        -> number (0-100)
 *   /devices/{deviceId}/motor           -> "ON" | "OFF"  (Arduino reads this)
 *   /devices/{deviceId}/lastSeen        -> timestamp (ms)
 *   /devices/{deviceId}/history/{ts}    -> { moisture, motor }  (optional)
 *
 * While ENABLED = false, the dashboard uses smooth simulated data so your
 * UI works perfectly for demos / viva.
 */

export const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export const FIREBASE_ENABLED = false;
export const DEVICE_ID = "device-1";
