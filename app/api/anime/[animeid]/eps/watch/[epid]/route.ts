import {NextRequest, NextResponse} from "next/server";
import {ANIME, ISource, META} from "@consumet/extensions";

export interface WatchResponse {
    sources: ISource | null
    provider: string,
    responseTime: number
}

export const GET = async (req: NextRequest, params: { params: { epid: string } }) => {
    const start = performance.now();
    console.log("yesssss")
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);

    const anilist = new META.Anilist(new ANIME.Gogoanime());

    // Get episode sources
    const currentEpSource: ISource | null = await anilist.fetchEpisodeSources(params.params.epid || "").catch(() => null);

    if (!currentEpSource) return NextResponse.json({error: "Episode not found", epId: params.params.epid || ""}, {status: 404})

    const data: WatchResponse = {
        sources: currentEpSource,
        provider: anilist.provider.name,
        responseTime: performance.now() - start
    }

    return NextResponse.json<WatchResponse>(data, {status: 200})
}
