"use client";

import Link from "next/link";
import {
  Maximize2,
  Minus,
  Move,
  Plus,
  RotateCcw,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  digitalExecutives,
  founder,
  provisionals,
  resolveExecutive,
  workforceCounts,
} from "../registry";
import type { Employee } from "../data";
import styles from "./company-map.module.css";

const MIN_SCALE = 0.22;
const MAX_SCALE = 1.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function EmployeeNode({ employee, kind }: { employee: Employee; kind: "founder" | "executive" | "specialist" }) {
  return (
    <Link
      href={`/digital-workforce/${employee.slug}`}
      className={`${styles.employeeNode} ${styles[kind]} ${styles[employee.accent]}`}
      title={`Open ${employee.name}'s profile`}
    >
      <div className={styles.nodeAvatar}>{initials(employee.name)}</div>
      <div className={styles.nodeCopy}>
        <span>{kind === "founder" ? "Founder / final human authority" : employee.department}</span>
        <strong>{employee.name}</strong>
        <small>{employee.title}</small>
      </div>
      <div className={styles.nodeMeta}>
        <b>{employee.id}</b>
        <i>{employee.registryState}</i>
      </div>
    </Link>
  );
}

export default function CompanyMapClient() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, x: 0, y: 0, startX: 0, startY: 0 });
  const [scale, setScale] = useState(0.48);
  const [offset, setOffset] = useState({ x: 18, y: 24 });

  useEffect(() => {
    const mobile = window.innerWidth < 760;
    setScale(mobile ? 0.29 : window.innerWidth < 1100 ? 0.38 : 0.48);
    setOffset({ x: mobile ? 8 : 18, y: 24 });
  }, []);

  const branches = useMemo(() => {
    return digitalExecutives.map((executive) => ({
      executive,
      members: provisionals
        .filter((employee) => resolveExecutive(employee)?.slug === executive.slug)
        .sort((a, b) => a.department.localeCompare(b.department) || a.name.localeCompare(b.name)),
    }));
  }, []);

  const unassigned = useMemo(
    () => provisionals.filter((employee) => !resolveExecutive(employee)),
    [],
  );

  const changeScale = (delta: number) => {
    setScale((current) => clamp(Number((current + delta).toFixed(2)), MIN_SCALE, MAX_SCALE));
  };

  const fitMap = () => {
    const width = viewportRef.current?.clientWidth ?? 1200;
    const fitted = clamp((width - 40) / 3300, MIN_SCALE, 0.62);
    setScale(Number(fitted.toFixed(2)));
    setOffset({ x: 14, y: 24 });
  };

  const resetMap = () => {
    const mobile = window.innerWidth < 760;
    setScale(mobile ? 0.29 : window.innerWidth < 1100 ? 0.38 : 0.48);
    setOffset({ x: mobile ? 8 : 18, y: 24 });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button")) return;

    drag.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      startX: offset.x,
      startY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    setOffset({
      x: drag.current.startX + event.clientX - drag.current.x,
      y: drag.current.startY + event.clientY - drag.current.y,
    });
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    changeScale(event.deltaY > 0 ? -0.04 : 0.04);
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarIntro}>
          <Move size={17} />
          <div>
            <strong>Drag to pan. Use controls or mouse wheel to zoom.</strong>
            <span>Every employee name opens the corresponding profile.</span>
          </div>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => changeScale(-0.08)} aria-label="Zoom out"><Minus size={18} /></button>
          <span>{Math.round(scale * 100)}%</span>
          <button type="button" onClick={() => changeScale(0.08)} aria-label="Zoom in"><Plus size={18} /></button>
          <button type="button" onClick={fitMap} aria-label="Fit map"><Maximize2 size={17} /></button>
          <button type="button" onClick={resetMap} aria-label="Reset map"><RotateCcw size={17} /></button>
        </div>
      </div>

      <div className={styles.legend}>
        <span><i className={styles.founderDot} /> Founder / final authority</span>
        <span><i className={styles.executiveDot} /> Digital executive</span>
        <span><i className={styles.recoveredDot} /> Recovered identity</span>
        <span><i className={styles.scaffoldDot} /> Provisional scaffold</span>
        <strong>{workforceCounts.total} clickable employee profiles</strong>
      </div>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onWheel={onWheel}
      >
        <div
          className={styles.canvas}
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
        >
          <div className={styles.founderStack}>
            <EmployeeNode employee={founder} kind="founder" />
            <div className={styles.verticalConnector} />
            <div className={styles.neuraxisNode}>
              <div className={styles.neuraxisIcon}><UsersRound size={31} /></div>
              <div>
                <span>NULLWORKS NEURAXIS // Persistent company brain + nervous system</span>
                <strong>Intake • context compilation • routing • coordination • truth-state receipts</strong>
                <small>Temporary specialists connect through the operating system; they do not create independent canon.</small>
              </div>
            </div>
            <div className={styles.verticalConnectorLong} />
          </div>

          <div className={styles.executiveBus}>
            <span>{workforceCounts.digitalExecutives} digital executive lanes</span>
          </div>

          <div className={styles.branchGrid}>
            {branches.map(({ executive, members }) => (
              <section key={executive.id} className={styles.branch}>
                <div className={styles.branchConnector} />
                <EmployeeNode employee={executive} kind="executive" />
                <div className={styles.branchStem} />
                <div className={styles.memberCount}>{members.length} specialist{members.length === 1 ? "" : "s"}</div>
                <div className={styles.memberList}>
                  {members.map((employee) => (
                    <EmployeeNode key={employee.id} employee={employee} kind="specialist" />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {unassigned.length > 0 ? (
            <section className={styles.unassignedLane}>
              <h2>Founder-routed provisional specialists</h2>
              <div>
                {unassigned.map((employee) => (
                  <EmployeeNode key={employee.id} employee={employee} kind="specialist" />
                ))}
              </div>
            </section>
          ) : null}

          <div className={styles.reviewGate}>
            <ShieldCheck size={25} />
            <strong>Review gate → authorized human action → telemetry → continuous improvement</strong>
          </div>

          <div className={styles.mapFooter}>
            <span>AI is the workforce</span>
            <b>•</b>
            <span>OI is the operating system</span>
            <b>•</b>
            <strong>Human authority remains final</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
