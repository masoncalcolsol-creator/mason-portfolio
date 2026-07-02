import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

const HITESH_LINKEDIN_POST =
  "https://www.linkedin.com/posts/jain-hitesh_aitinkerers-share-7478103608933105665-YD1-/?utm_source=share&utm_medium=member_android&rcm=ACoAAFkqbQUBGKLAGhj7Y8TVjaU1DKwScLLC3tc";

export default function FieldNoteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-[#19170f] px-4 py-3 text-[#fffaf0]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="font-semibold leading-relaxed text-[#ddd2bc]">
            Source receipt: Hitesh Jain&apos;s LinkedIn share linking the AI Tinkerers discussion that helped trigger this field note.
          </div>
          <a
            href={HITESH_LINKEDIN_POST}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-black text-[#d7b96f] no-underline"
          >
            Open source post <ExternalLink size={15} />
          </a>
        </div>
      </div>
      {children}
    </>
  );
}
