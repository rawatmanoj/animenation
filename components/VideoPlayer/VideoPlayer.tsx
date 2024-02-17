"use client";

import { useEffect, useRef, useState } from "react";
import { Options } from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import VideoPlayerLoader from "./VideoPlayerLoader";
import { IAnimeEpisode } from "@consumet/extensions";

export default function VideoPlayer({
  resources,
  referer,
  className,
  isPendingTrans,
  epsiodes,
  epId,
  type,
}: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [video, setVideo] = useState({
    isLoaded: false,
    currentEpisode: null,
  });

  if (type === "dubs") {
    console.log(epId, "epId");
    epId = epId?.replace("dub-episode", "episode") || null;
    console.log(epId, "epId");
  }

  const currentEpisode = (epsiodes as IAnimeEpisode[])?.find(
    (ep) => ep.id === epId
  );

  console.log(currentEpisode?.image, "currentEpisode?.image");

  // useEffect(() => {

  // }, [epsiodes, epId]);

  useEffect(() => {
    const Plyr = require("plyr");
    let player: any;
    const handleLoadedData = () => {
      console.log("Video loaded!");
      setVideo((state) => ({ ...state, isLoaded: true }));
      // Do something when the video is loaded
    };
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    const defaultOptions: Plyr.Options = {
      controls: [
        // "play-large",
        "play",
        "rewind",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      seekTime: 10,
      keyboard: {
        focused: true,
        global: true,
      },
    };
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // This will run in safari, where HLS is supported natively
      video.src = resources[2].url;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers

      const hls = new Hls({
        xhrSetup: (xhr, url) => {
          if (referer) xhr.setRequestHeader("Referer", referer);
        },
      });
      hls.loadSource(resources[2].url);
      player = new Plyr(video, defaultOptions);

      player.on("loadeddata", handleLoadedData);

      hls.attachMedia(video);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }
    return () => {
      // player.off("loadeddata", handleLoadedData);
      // player.destroy();
    };
  }, [resources, referer]);
  if (isPendingTrans && video.isLoaded) {
    return <VideoPlayerLoader />;
  }

  return (
    <div>
      {!isPendingTrans ? (
        <div>
          <video
            data-displaymaxtap
            ref={videoRef}
            data-poster={currentEpisode?.image}
            // style={{ width: "100%", height: "100%" }}
            // className="w-12 h-12"
            // Update progress
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
