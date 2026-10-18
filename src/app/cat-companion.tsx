"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Activity = "idle" | "walking" | "curious" | "grooming" | "sleeping";

const CAT_SIZE = 44;
const thoughts = ["有罐罐吗？", "这里挺舒服。", "巡逻中…", "你在看什么？", "喵。"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function CatCompanion() {
  const [position, setPosition] = useState<Point>(() => typeof window === "undefined"
    ? { x: -100, y: -100 }
    : { x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [activity, setActivity] = useState<Activity>("idle");
  const [thought, setThought] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const positionRef = useRef(position);
  const destinationRef = useRef<Point | null>(null);
  const activityRef = useRef<Activity>("idle");
  const activityUntilRef = useRef(0);
  const nextWanderRef = useRef(0);
  const thoughtUntilRef = useRef(0);

  const changeActivity = useCallback((next: Activity, duration = 0) => {
    activityRef.current = next;
    activityUntilRef.current = Date.now() + duration;
    setActivity(next);
  }, []);

  const say = useCallback((message: string) => {
    setThought(message);
    thoughtUntilRef.current = Date.now() + 2400;
  }, []);

  const moveTo = useCallback((point: Point, mood: Activity = "walking") => {
    const destination = {
      x: Math.max(CAT_SIZE / 2, Math.min(window.innerWidth - CAT_SIZE / 2, point.x)),
      y: Math.max(CAT_SIZE / 2, Math.min(window.innerHeight - CAT_SIZE / 2, point.y)),
    };
    destinationRef.current = destination;
    changeActivity(mood, mood === "curious" ? 1200 : 0);
  }, [changeActivity]);

  const handleCatClick = () => {
    destinationRef.current = null;
    say(thoughts[Math.floor(Math.random() * thoughts.length)]);
    changeActivity("curious", 1300);
  };

  useEffect(() => {
    const home = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    positionRef.current = home;
    setPosition(home);
    nextWanderRef.current = Date.now() + randomBetween(1200, 2600);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    const handlePageClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("a, button, input, textarea, select, [role='button'], [contenteditable='true'], .oneko-cat")) return;
      moveTo({ x: event.clientX, y: event.clientY }, "curious");
      say("嗯？我来看看");
    };
    window.addEventListener("click", handlePageClick);

    const timer = window.setInterval(() => {
      const now = Date.now();
      if (thoughtUntilRef.current && now > thoughtUntilRef.current) {
        thoughtUntilRef.current = 0;
        setThought("");
      }

      if (motionQuery.matches) return;

      const destination = destinationRef.current;
      if (destination) {
        const current = positionRef.current;
        const dx = destination.x - current.x;
        const dy = destination.y - current.y;
        if (Math.abs(dx) + Math.abs(dy) < 2) {
          positionRef.current = destination;
          destinationRef.current = null;
          setPosition(destination);
          changeActivity("idle");
          nextWanderRef.current = now + randomBetween(1300, 2800);
        } else {
          const next = { x: current.x + dx * 0.11, y: current.y + dy * 0.11 };
          positionRef.current = next;
          setPosition(next);
        }
        return;
      }

      if ((activityRef.current === "sleeping" || activityRef.current === "grooming") && now < activityUntilRef.current) return;
      if (activityRef.current === "curious" && now < activityUntilRef.current) return;
      if (now < nextWanderRef.current) return;

      if (activityRef.current === "idle") {
        const roll = Math.random();
        if (roll < 0.2) {
          changeActivity("sleeping", randomBetween(2600, 4800));
          say("Z z z");
          thoughtUntilRef.current = now + randomBetween(1800, 3000);
          nextWanderRef.current = activityUntilRef.current;
          return;
        }
        if (roll < 0.48) {
          changeActivity("grooming", randomBetween(1100, 1900));
          nextWanderRef.current = activityUntilRef.current;
          return;
        }
      }

      const current = positionRef.current;
      const margin = CAT_SIZE;
      const destinationPoint = {
        x: randomBetween(margin, Math.max(margin, window.innerWidth - margin)),
        y: randomBetween(margin, Math.max(margin, window.innerHeight - margin)),
      };
      if (Math.hypot(destinationPoint.x - current.x, destinationPoint.y - current.y) < 90) {
        destinationPoint.x = Math.max(margin, Math.min(window.innerWidth - margin, current.x + 140));
      }
      moveTo(destinationPoint);
    }, 100);

    return () => {
      window.clearInterval(timer);
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("click", handlePageClick);
    };
  }, [changeActivity, moveTo, say]);

  const restingFace = activity === "sleeping";

  return (
    <button
      type="button"
      className={`oneko-cat oneko-cat-${activity}${reducedMotion ? " oneko-cat-resting" : ""}`}
      aria-label="拍拍小猫"
      onClick={handleCatClick}
      style={{ left: position.x, top: position.y }}
    >
      {thought && <span className="oneko-thought" aria-hidden="true">{thought}</span>}
      {activity === "sleeping" && !thought && <span className="oneko-zzz" aria-hidden="true">z z z</span>}
      <svg viewBox="0 0 32 32" shapeRendering="crispEdges" focusable="false" aria-hidden="true">
        <g className="oneko-tail">
          <rect x="23" y="17" width="3" height="3" fill="#b85e32" />
          <rect x="26" y="14" width="3" height="4" fill="#d98248" />
          <rect x="27" y="11" width="3" height="4" fill="#d98248" />
          <rect x="25" y="9" width="3" height="3" fill="#b85e32" />
        </g>
        <rect x="7" y="10" width="3" height="4" fill="#b85e32" />
        <rect x="8" y="7" width="4" height="5" fill="#e49a5d" />
        <rect x="11" y="9" width="10" height="3" fill="#e49a5d" />
        <rect x="20" y="10" width="4" height="7" fill="#e49a5d" />
        <rect x="9" y="12" width="15" height="10" fill="#e49a5d" />
        <rect x="12" y="14" width="9" height="7" fill="#f0b77e" />
        <rect x="10" y="20" width="4" height="5" fill="#e49a5d" />
        <rect x="20" y="20" width="4" height="5" fill="#e49a5d" />
        <rect x="8" y="24" width="6" height="2" fill="#b85e32" />
        <rect x="19" y="24" width="6" height="2" fill="#b85e32" />
        {restingFace ? (
          <>
            <rect x="11" y="14" width="3" height="1" fill="#34302d" />
            <rect x="19" y="14" width="3" height="1" fill="#34302d" />
          </>
        ) : (
          <>
            <rect x="11" y="13" width="2" height="2" fill="#34302d" />
            <rect x="20" y="13" width="2" height="2" fill="#34302d" />
          </>
        )}
        <rect x="15" y="16" width="2" height="1" fill="#a84c45" />
        <rect x="14" y="17" width="4" height="1" fill="#a84c45" />
        <rect x="5" y="17" width="5" height="1" fill="#d7c7b5" />
        <rect x="5" y="19" width="4" height="1" fill="#d7c7b5" />
        <rect x="22" y="17" width="5" height="1" fill="#d7c7b5" />
        <rect x="23" y="19" width="4" height="1" fill="#d7c7b5" />
      </svg>
    </button>
  );
}
