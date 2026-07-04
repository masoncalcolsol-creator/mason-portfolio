"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, UserRoundCheck } from "lucide-react";
import { departments, employees } from "./registry";
import type { EmployeeStatus } from "./data";
import styles from "./directory.module.css";

const statusOptions: Array<"ALL" | EmployeeStatus> = ["ALL", "EXECUTIVE", "PROVISIONAL"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function DirectoryClient() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("ALL");
  const [department, setDepartment] = useState("ALL");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return employees.filter((employee) => {
      const statusMatch = status === "ALL" || employee.status === status;
      const departmentMatch = department === "ALL" || employee.department === department;
      const textMatch =
        needle.length === 0 ||
        [employee.name, employee.title, employee.department, employee.mission, ...employee.skills]
          .join(" ")
          .toLowerCase()
          .includes(needle);

      return statusMatch && departmentMatch && textMatch;
    });
  }, [department, query, status]);

  return (
    <>
      <section className={styles.controls} aria-label="Employee directory controls">
        <label className={styles.searchBox}>
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search people, roles, skills, or departments"
            aria-label="Search employee directory"
          />
        </label>

        <div className={styles.filterGroup}>
          <SlidersHorizontal size={17} />
          {statusOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={status === option ? styles.activeFilter : undefined}
              onClick={() => setStatus(option)}
            >
              {option === "ALL" ? "Everyone" : option === "EXECUTIVE" ? "Leadership" : "Provisional"}
            </button>
          ))}
        </div>

        <label className={styles.departmentSelect}>
          <span>Department</span>
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            <option value="ALL">All departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </section>

      <div className={styles.resultBar}>
        <span>{filtered.length} profiles visible</span>
        <strong>Click any employee to open their operating profile.</strong>
      </div>

      <section className={styles.directoryGrid} aria-label="NULLWORKS employee profiles">
        {filtered.map((employee) => (
          <Link
            key={employee.id}
            href={`/digital-workforce/${employee.slug}`}
            className={`${styles.card} ${styles[employee.accent]}`}
          >
            <div className={styles.banner}>
              <span>{employee.department}</span>
              <b>{employee.id}</b>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.avatar} aria-hidden="true">{initials(employee.name)}</div>
              <div className={styles.cardStatusRow}>
                <span className={employee.status === "EXECUTIVE" ? styles.executivePill : styles.provisionalPill}>
                  {employee.slug === "mason-perry" ? "FOUNDER" : employee.status}
                </span>
                <span className={styles.registryPill}>{employee.registryState}</span>
              </div>
              <h2>{employee.name}</h2>
              <h3>{employee.title}</h3>
              <p>{employee.mission}</p>
              <div className={styles.skillRow}>
                {employee.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              <div className={styles.openProfile}>
                <UserRoundCheck size={16} /> Open operating profile
              </div>
            </div>
          </Link>
        ))}
      </section>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          No employee profile matches the current search and filters.
        </div>
      ) : null}
    </>
  );
}
