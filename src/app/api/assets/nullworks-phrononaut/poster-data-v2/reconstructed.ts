import { createHash } from "node:crypto";
import chunk01 from "./chunk01";
import chunk02 from "./chunk02";
import chunk03 from "./chunk03";
import chunk04 from "./chunk04";
import chunk05 from "./chunk05";
import chunk06 from "./chunk06";
import chunk07 from "./chunk07";
import chunk08 from "./chunk08";
import chunk09 from "./chunk09";
import chunk10 from "./chunk10";

const expectedByteLength = 57236;
export const expectedSha256 =
  "b1da7256bc164a5892ac859a91e3e18ba033bf72c2f88d9c822010086521d993";

const expectedChunkLengths = [
  8000,
  8000,
  8000,
  8000,
  8000,
  8000,
  8000,
  8000,
  8000,
  4316,
] as const;

const transportedChunks = [
  chunk01,
  chunk02,
  chunk03,
  chunk04,
  chunk05,
  chunk06,
  chunk07,
  chunk08,
  chunk09,
  chunk10,
] as const;

let poster: Buffer | undefined;

export function getReconstructedPoster() {
  if (poster) return poster;

  const payload = transportedChunks
    .map((chunk, index) => chunk.slice(0, expectedChunkLengths[index]))
    .join("");
  const decoded = Buffer.from(payload, "base64");
  const sha256 = createHash("sha256").update(decoded).digest("hex");

  if (decoded.byteLength !== expectedByteLength || sha256 !== expectedSha256) {
    throw new Error(
      `Phrononaut poster recovery integrity failure: ${decoded.byteLength} bytes / ${sha256}`,
    );
  }

  poster = decoded;
  return poster;
}
