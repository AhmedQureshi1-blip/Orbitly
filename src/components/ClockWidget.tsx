import { useState, useEffect } from "react";

export default function ClockWidget() {
  const [sfTime, setSfTime] = useState("");
  const [zurichTime, setZurichTime] = useState("");
  const [sfStatus, setSfStatus] = useState("Closed");
  const [zurichStatus, setZurichStatus] = useState("Available");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // San Francisco Time (UTC -7 or -8, let's format matching US PST/PDT)
      const sfString = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setSfTime(sfString);

      // San Francisco Business Hours (9 AM - 6 PM PST)
      const sfHour = parseInt(now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        hour12: false,
      }), 10);
      const sfDay = now.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "short",
      });
      const isSfWeekend = sfDay === "Sat" || sfDay === "Sun";
      if (sfHour >= 9 && sfHour < 18 && !isSfWeekend) {
        setSfStatus("Active");
      } else {
        setSfStatus("Closed");
      }

      // Zurich Time (UTC +1 or +2)
      const zurichString = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Zurich",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setZurichTime(zurichString);

      const zHour = parseInt(now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Zurich",
        hour: "numeric",
        hour12: false,
      }), 10);
      const zDay = now.toLocaleDateString("en-US", {
        timeZone: "Europe/Zurich",
        weekday: "short",
      });
      const isZWeekend = zDay === "Sat" || zDay === "Sun";
      if (zHour >= 9 && zHour < 18 && !isZWeekend) {
        setZurichStatus("Active");
      } else {
        setZurichStatus("Closed");
      }
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 max-w-sm pt-4">
      {/* SF Clock */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#FF5A00] font-mono block mb-1">
            — San Francisco
          </span>
          <span className="text-xl font-light tracking-tight font-mono text-white block">
            {sfTime || "Loading..."}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <span className={`w-1.5 h-1.5 rounded-full ${sfStatus === "Active" ? "bg-emerald-500 animate-pulse" : "bg-neutral-600"}`} />
          <span className="text-xs text-neutral-400 font-light font-mono">
            HQ • {sfStatus}
          </span>
        </div>
      </div>

      {/* Zurich Clock */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono block mb-1">
            — Zurich Satellite
          </span>
          <span className="text-xl font-light tracking-tight font-mono text-white block">
            {zurichTime || "Loading..."}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <span className={`w-1.5 h-1.5 rounded-full ${zurichStatus === "Active" ? "bg-emerald-500 animate-pulse" : "bg-neutral-600"}`} />
          <span className="text-xs text-neutral-400 font-light font-mono">
            ZRH • {zurichStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
