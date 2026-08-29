import type { Metadata } from "next";
import BlindRedTeamReview from "../_components/BlindRedTeamReview";

export const metadata:Metadata={
  title:"Jay Obernolte | Independent Red Team | NULLWORKS",
  description:"Private independent red-team review route.",
  robots:{index:false,follow:false},
};

export default function Page(){return <BlindRedTeamReview
  reviewerName="Jay Obernolte"
  firstName="Jay"
  artifactName="Continuity Calculus 3.0 — Longitudinal Continuity and Valid Succession"
  artifactVersion="3.0 working draft · 27 August 2026"
  responseEmail="masoncalcolsol@gmail.com"
  responseSubject="CC3 — Jay Obernolte — First-pass red team"
/>;}
