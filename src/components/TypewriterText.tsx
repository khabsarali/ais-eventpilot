import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Play, Square, Check, Copy } from "lucide-react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per word or character
  mode?: "word" | "char";
  onComplete?: () => void;
}

export function TypewriterText({ text, speed = 12, mode = "word", onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Split text based on mode
  const tokens = mode === "word" ? text.split(" ") : text.split("");

  useEffect(() => {
    // Reset typewriter when input text changes
    setDisplayedText("");
    indexRef.current = 0;
    setIsPlaying(true);
  }, [text]);

  useEffect(() => {
    if (!isPlaying) {
      // If paused or skipped, display everything immediately
      setDisplayedText(text);
      if (onComplete) onComplete();
      return;
    }

    if (indexRef.current >= tokens.length) {
      setIsPlaying(false);
      if (onComplete) onComplete();
      return;
    }

    const delay = mode === "word" ? speed * 4 : speed;

    timerRef.current = setTimeout(() => {
      if (mode === "word") {
        setDisplayedText((prev) => {
          const spacing = prev ? " " : "";
          return prev + spacing + tokens[indexRef.current];
        });
      } else {
        setDisplayedText((prev) => prev + tokens[indexRef.current]);
      }
      indexRef.current += 1;
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayedText, isPlaying, tokens, speed, mode, text]);

  const handleSkip = () => {
    setIsPlaying(false);
    setDisplayedText(text);
  };

  const handleRestart = () => {
    setDisplayedText("");
    indexRef.current = 0;
    setIsPlaying(true);
  };

  return (
    <div className="relative group/typewriter">
      {/* Typewriter Floating Controls */}
      <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-80 group-hover/typewriter:opacity-100 transition-opacity">
        {isPlaying ? (
          <button
            onClick={handleSkip}
            className="px-2.5 py-1 bg-brand-red/10 hover:bg-brand-red/25 border border-brand-red/30 text-brand-scarlet rounded-md text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer"
            title="Reveal complete text immediately"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
            <span>Skip Writing</span>
          </button>
        ) : (
          <button
            onClick={handleRestart}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded-md text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer"
            title="Re-run interactive simulation code"
          >
            <Play className="w-2.5 h-2.5 fill-current text-white/70" />
            <span>Re-Type</span>
          </button>
        )}
      </div>

      {/* Rendered Text Box */}
      <div className="font-mono text-xs text-[#e1e2ec] leading-relaxed whitespace-pre-wrap select-text pr-16 min-h-[120px]">
        {displayedText}
        {isPlaying && (
          <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-brand-red animate-pulse" />
        )}
      </div>
    </div>
  );
}
