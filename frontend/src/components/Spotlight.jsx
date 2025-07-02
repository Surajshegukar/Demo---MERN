import React, { useRef, useState, useEffect } from "react";


const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return position;
};



export default function Spotlight({ children, className = "" }) {
  const containerRef = useRef(null);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      setBoxes(Array.from(containerRef.current.children));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => initContainer();
    initContainer();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [boxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { w, h } = containerSize.current;
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;
    const inside = x > 0 && x < w && y > 0 && y < h;

    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;

      boxes.forEach((box) => {
        const boxX = -(box.getBoundingClientRect().left - rect.left) + x;
        const boxY = -(box.getBoundingClientRect().top - rect.top) + y;
        box.style.setProperty("--mouse-x", `${boxX}px`);
        box.style.setProperty("--mouse-y", `${boxY}px`);
      });
    }
  };

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}