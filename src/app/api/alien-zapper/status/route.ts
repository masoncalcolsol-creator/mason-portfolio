import { alienZapperStatus } from "@/lib/alien-zapper-store";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){const storage=await alienZapperStatus();return Response.json({system:"NULLWORKS_ALIEN_ZAPPER",version:"1.0",storage,writesEnabled:storage.state==="READY",truthBoundary:"A GLOBAL SCORE IS DURABLE ONLY WHEN THE SERVER RETURNS A RECEIPT."},{status:storage.state==="READY"?200:503,headers:{"Cache-Control":"no-store"}})}
