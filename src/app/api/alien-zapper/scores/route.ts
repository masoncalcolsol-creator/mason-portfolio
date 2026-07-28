import { alienZapperErrorResponse, listAlienScores, saveAlienScore } from "@/lib/alien-zapper-store";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(request:Request){try{const limit=Number(new URL(request.url).searchParams.get("limit")||50);const scores=await listAlienScores(limit);return Response.json({ok:true,scores},{headers:{"Cache-Control":"no-store"}})}catch(e){return alienZapperErrorResponse(e)}}
export async function POST(request:Request){try{const score=await saveAlienScore(request,await request.json());return Response.json({ok:true,score,storage:"SERVER_DURABLE"},{status:201,headers:{"Cache-Control":"no-store"}})}catch(e){return alienZapperErrorResponse(e)}}
