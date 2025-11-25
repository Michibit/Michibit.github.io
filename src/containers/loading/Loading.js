import React, { useState, useEffect } from "react";
import "./loading.scss";

export default function Loading() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // SEQUENZA DI AVVIO ESTESA (5+ secondi)
    const sequence = [
      { text: "System Check: OK", color: "green", delay: 200 },
      { text: "Loading modules: Kernel, React, UI...", color: "cyan", delay: 800 },
      { text: "Mounting file systems (ZFS)...", color: "yellow", delay: 1400 },
      { text: "Checking firewall rules...", color: "yellow", delay: 2100 },
      { text: "Establishing secure connection...", color: "cyan", delay: 2800 },
      { text: "Verifying access privileges...", color: "yellow", delay: 3600 },
      { text: "Access Granted.", color: "green", delay: 4400, bold: true },
      { text: "Welcome, User.", color: "white", delay: 5000, bold: true }
    ];

    let timeouts = [];

    sequence.forEach(({ text, color, delay, bold }, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, { text, color, bold, id: index }]);
        const terminalContent = document.getElementById("term-content");
        if (terminalContent) terminalContent.scrollTop = terminalContent.scrollHeight;
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="loading-container">
      <div className="terminal-window">
        <div className="terminal-bar">
          <div className="dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">system@boot:~</span>
        </div>
        <div className="terminal-content" id="term-content">
          {lines.map((line) => (
            <div key={line.id} className={`log-line ${line.color} ${line.bold ? 'bold' : ''}`}>
              <span className="prompt">&gt;</span> {line.text}
            </div>
          ))}
          <div className="log-line">
            <span className="prompt">&gt;</span> <span className="cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}