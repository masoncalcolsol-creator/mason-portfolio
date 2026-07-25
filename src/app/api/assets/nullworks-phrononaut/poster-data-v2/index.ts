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

export const expectedByteLength = 57236;
export const expectedSha256 =
  "b1da7256bc164a5892ac859a91e3e18ba033bf72c2f88d9c822010086521d993";

const payload = [
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
].join("");

let poster: Buffer | undefined;

export function getPoster() {
  if (poster) return poster;

  const decoded = Buffer.from(payload, "base64");
  const sha256 = createHash("sha256").update(decoded).digest("hex");

  if (decoded.byteLength !== expectedByteLength || sha256 !== expectedSha256) {
    throw new Error(
      `Phrononaut poster integrity failure: ${decoded.byteLength} bytes / ${sha256}`,
    );
  }

  poster = decoded;
  return poster;
}
