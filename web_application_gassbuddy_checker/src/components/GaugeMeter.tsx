import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface GaugeMeterProps {
  value: number; // Current value
  max: number;   // Maximum value
}

export default function GaugeMeter({ value, max }: GaugeMeterProps) {
  const [percentage, setPercentage] = useState(0);
  const gaugeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculatedPercentage = Math.min(100, Math.max(0, (value / max) * 100));
    setPercentage(calculatedPercentage);

    if (gaugeRef.current) {
      gsap.to(gaugeRef.current, {
        background: `conic-gradient(
          ${getDynamicColor(calculatedPercentage)} 0deg, 
          ${getDynamicColor(calculatedPercentage)} ${calculatedPercentage * 3.6}deg, 
          #e0e0e0 ${calculatedPercentage * 3.6}deg 360deg
        )`,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [value, max]);

  const getDynamicColor = (percentage: number) => {
    if (percentage <= 30) return `rgba(255, 77, 77, ${0.5 + percentage / 60})`; // Red with increasing opacity
    if (percentage <= 70) return `rgba(255, 204, 0, ${0.5 + (percentage - 30) / 80})`; // Yellow with increasing opacity
    return `rgba(76, 175, 80, ${0.5 + (percentage - 70) / 60})`; // Green with increasing opacity
  };

  return (
    <div className="gauge-container">
      <div className="gauge">
        <div
          className="gauge-arc"
          ref={gaugeRef}
          style={{
            background: `conic-gradient(
              ${getDynamicColor(percentage)} 0deg, 
              ${getDynamicColor(percentage)} ${percentage * 3.6}deg, 
              #e0e0e0 ${percentage * 3.6}deg 360deg
            )`,
          }}
        ></div>
        <div className="gauge-center">
          <span className="gauge-percentage">{percentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

// Styles (CSS-in-JS or external CSS can be used)
const styles = `
.gauge-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.gauge {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #e0e0e0;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.gauge-arc {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: center;
  transition: background 0.5s ease-in-out;
}

.gauge-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
}

.gauge-percentage {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  font-family: "Arial", sans-serif;
}
`;

// Inject styles into the document head (optional)
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
