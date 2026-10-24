"use client";

import {
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export function FleetScroller({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  const carousel = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
    const move = (pointerEvent: globalThis.PointerEvent) => {
      const current = drag.current;
      const element = carousel.current;
      if (!current || !element || current.pointerId !== pointerEvent.pointerId)
        return;
      const delta = pointerEvent.clientX - current.startX;
      if (!current.moved && Math.abs(delta) < 10) return;
      current.moved = true;
      element.dataset.dragging = "true";
      element.scrollLeft = current.startScrollLeft - delta;
    };
    const finish = (pointerEvent: globalThis.PointerEvent) => {
      const current = drag.current;
      const element = carousel.current;
      if (!current || current.pointerId !== pointerEvent.pointerId) return;
      if (current.moved) {
        suppressClick.current = true;
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 250);
      }
      drag.current = null;
      if (element) delete element.dataset.dragging;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
  }

  return (
    <div
      {...props}
      ref={carousel}
      onPointerDown={startDrag}
      onClickCapture={(event) => {
        if (!suppressClick.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
      }}
    >
      {children}
    </div>
  );
}
