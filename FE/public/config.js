// RUNTIME CONFIG — ganti IP/port BE tanpa rebuild.
// File ini ikut deploy statis. Edit di tiap host (Vercel/CF/GH) lalu reload.
// BE dan FE boleh beda device: localhost | IP LAN | domain.
window.__APP_CONFIG__ = {
  beProtocol: "http",
  beHost: "localhost",
  bePort: "3000",
  beBasePath: "/api/v1",
  cdnBaseUrl: "",
  waNumber: "085649400339",
  waEmail: "smktelkomdujbg@gmail.com",
  appVersion: "L0-full"
};
