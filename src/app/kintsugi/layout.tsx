import type {Metadata} from "next";
import "./kintsugi.css";

export const metadata:Metadata={
  title:"KINTSUGI GLOBAL // NULLWORKS",
  description:"Currency-neutral, human-governed infrastructure for verifiable capital deployment."
};

export default function KintsugiLayout({children}:{children:React.ReactNode}){
  return children;
}
