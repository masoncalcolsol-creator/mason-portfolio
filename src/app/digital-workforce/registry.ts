import {
  executives as baseExecutives,
  provisionals as baseProvisionals,
  type Employee,
} from "./data";

const renderSmithBase = baseProvisionals.find((employee) => employee.slug === "rendersmith");

const renderSmithExecutive: Employee = renderSmithBase
  ? {
      ...renderSmithBase,
      id: "NW-E010",
      title: "Visual Master Builder",
      status: "EXECUTIVE",
      registryState: "RECOVERED",
      reportsTo: "Mason Perry",
      mission:
        "Lead NULLWORKS visual production by creating cinematic masters, premium public imagery, and a coherent visual operating language before structure is layered around the work.",
      about:
        "RenderSmith is the ninth digital executive and the visual master builder for NULLWORKS. The role emerged from direct failure telemetry: when structure-first production produced weak visual work, RenderSmith established the opposite operating doctrine—make the master first, then build the system around it.",
      skills: [
        "Cinematic rendering",
        "Luxury visual direction",
        "Poster composition",
        "Brand atmosphere",
      ],
      motto: "Make the master first. Then build the system around it.",
      accent: "gold",
    }
  : {
      id: "NW-E010",
      slug: "rendersmith",
      name: "RenderSmith",
      title: "Visual Master Builder",
      department: "Visual Production",
      status: "EXECUTIVE",
      registryState: "RECOVERED",
      mission:
        "Lead NULLWORKS visual production by creating cinematic masters, premium public imagery, and a coherent visual operating language before structure is layered around the work.",
      about:
        "RenderSmith is the ninth digital executive and the visual master builder for NULLWORKS. The role emerged from direct failure telemetry and owns cinematic visual execution under Mason's final authority.",
      skills: [
        "Cinematic rendering",
        "Luxury visual direction",
        "Poster composition",
        "Brand atmosphere",
      ],
      reportsTo: "Mason Perry",
      motto: "Make the master first. Then build the system around it.",
      accent: "gold",
    };

const flowwright: Employee = {
  id: "NW-P066",
  slug: "flowwright",
  name: "Flowwright",
  title: "Workflow and Organizational Map Specialist",
  department: "Corporate Systems",
  status: "PROVISIONAL",
  registryState: "RECOVERED",
  mission:
    "Translate operating structure, ownership, work cells, handoffs, and escalation paths into human-readable maps without turning the map into authority.",
  about:
    "Flowwright is a recovered provisional NULLWORKS specialist assigned to organizational visualization and workflow mapping. The role makes the company's structure inspectable while preserving the distinction between a diagram, the underlying receipts, and Mason's final authority.",
  skills: [
    "Organizational mapping",
    "Workflow visualization",
    "Handoff design",
    "Interactive systems diagrams",
  ],
  reportsTo: "Knox",
  motto: "The map should reveal the work, not become the work.",
  accent: "teal",
};

export const founder = baseExecutives.find((employee) => employee.slug === "mason-perry")!;

export const digitalExecutives: Employee[] = [
  ...baseExecutives.filter((employee) => employee.slug !== "mason-perry"),
  renderSmithExecutive,
];

export const executives: Employee[] = [founder, ...digitalExecutives];

export const provisionals: Employee[] = [
  ...baseProvisionals.filter((employee) => employee.slug !== "rendersmith"),
  flowwright,
];

export const employees: Employee[] = [...executives, ...provisionals];

export const departments = Array.from(
  new Set(employees.map((employee) => employee.department)),
).sort();

export const getEmployee = (slug: string) =>
  employees.find((employee) => employee.slug === slug);

export const workforceCounts = {
  founder: 1,
  digitalExecutives: digitalExecutives.length,
  leadership: executives.length,
  provisionals: provisionals.length,
  total: employees.length,
};

export function resolveExecutive(employee: Employee): Employee | undefined {
  if (employee.status === "EXECUTIVE") {
    return employee.slug === founder.slug ? undefined : employee;
  }

  let currentName = employee.reportsTo;
  const visited = new Set<string>();

  while (currentName && !visited.has(currentName)) {
    visited.add(currentName);
    const current = employees.find((candidate) => candidate.name === currentName);

    if (!current) {
      return undefined;
    }

    if (current.status === "EXECUTIVE") {
      return current.slug === founder.slug ? undefined : current;
    }

    currentName = current.reportsTo;
  }

  return undefined;
}
