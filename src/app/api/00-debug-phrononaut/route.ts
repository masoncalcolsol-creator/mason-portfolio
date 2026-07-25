import chunk01 from "../assets/nullworks-phrononaut/poster-data-v2/chunk01";
import chunk02 from "../assets/nullworks-phrononaut/poster-data-v2/chunk02";
import chunk03 from "../assets/nullworks-phrononaut/poster-data-v2/chunk03";
import chunk04 from "../assets/nullworks-phrononaut/poster-data-v2/chunk04";
import chunk05 from "../assets/nullworks-phrononaut/poster-data-v2/chunk05";
import chunk06 from "../assets/nullworks-phrononaut/poster-data-v2/chunk06";
import chunk07 from "../assets/nullworks-phrononaut/poster-data-v2/chunk07";
import chunk08 from "../assets/nullworks-phrononaut/poster-data-v2/chunk08";
import chunk09 from "../assets/nullworks-phrononaut/poster-data-v2/chunk09";
import chunk10 from "../assets/nullworks-phrononaut/poster-data-v2/chunk10";

const payload = [chunk01, chunk02, chunk03, chunk04, chunk05, chunk06, chunk07, chunk08, chunk09, chunk10].join("");
for (let offset = 0; offset < payload.length; offset += 3000) {
  console.error(`POSTER_PAYLOAD_${String(offset).padStart(6, "0")}:${payload.slice(offset, offset + 3000)}`);
}
console.error(`POSTER_PAYLOAD_LENGTH:${payload.length}`);

export async function GET() {
  return new Response("temporary debug route");
}
