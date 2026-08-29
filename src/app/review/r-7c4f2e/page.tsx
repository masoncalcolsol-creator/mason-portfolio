import type { Metadata } from "next";
import BlindRedTeamReview from "../../_components/BlindRedTeamReview";

export const metadata:Metadata={title:"Independent Red Team | NULLWORKS",description:"Private independent red-team review route.",robots:{index:false,follow:false}};

export default function Page(){return <BlindRedTeamReview
  reviewerName="Jay Obernolte"
  firstName="Jay"
  artifactName="Continuity Calculus 3.1 — Longitudinal Continuity and Valid Succession"
  artifactVersion="3.1 locked review release · 29 August 2026"
  artifactUrl="/artifact/cc3-1"
  responseEmail="masoncalcolsol@gmail.com"
  responseSubject="CC3.1 — First-pass red team"
/>;}
