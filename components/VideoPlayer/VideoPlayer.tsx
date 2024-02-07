"use client";

import { useEffect, useRef } from "react";
import { Options } from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

export default function VideoPlayer({ resources, referer, className }: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const Plyr = require("plyr");

    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    const defaultOptions: Plyr.Options = {
      controls: [
        "play-large",
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
      video.src = resources[0].url;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers

      const hls = new Hls({
        xhrSetup: (xhr, url) => {
          if (referer) xhr.setRequestHeader("Referer", referer);
        },
      });
      hls.loadSource(resources[0].url);
      const player = new Plyr(video, defaultOptions);
      hls.attachMedia(video);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }
  }, []);

  return (
    <video
      data-displaymaxtap
      ref={videoRef}
      // style={{ width: "100%", height: "100%" }}
      // className="w-12 h-12"
      // Update progress
    />
  );
}
