import {NextRequest, NextResponse} from "next/server";
import {ANIME, IAnimeEpisode, META} from "@consumet/extensions";

export interface EpsResponse {
    sub: IAnimeEpisode[] | null,
    dub: IAnimeEpisode[] | null,
    provider: string,
    responseTime: number
}

export const GET = async (req: NextRequest, params: { params: { animeid: string ,type : string} }) => {
    const start = performance.now();
    
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    const animeId = params.params.animeid;

    const anilist = new META.Anilist(new ANIME.Gogoanime());
    // Get episodes
    // Subbed
    const subEps = searchParams.get("type") === "subs" ? await anilist.fetchEpisodesListById(animeId, false, true).catch(() => null):null;
    // Dubbed
    const dubEps = searchParams.get("type") === "dubs" ? await anilist.fetchEpisodesListById(animeId, true, true).catch(() => null):null;

    const data: EpsResponse = {
        sub: subEps,
        dub: dubEps,
        provider: anilist.provider.name,
        responseTime: performance.now() - start
    }

    return NextResponse.json<EpsResponse>(data, {status: 200})
}
