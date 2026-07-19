import { Music } from "lucide-react";
import { DATA } from "@/data/resume";
import {
  Timeline,
  TimelineItem,
  TimelineConnectItem,
} from "@/components/timeline";

function soundcloudEmbedSrc(url: string) {
  const params = new URLSearchParams({
    url,
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export default function MusicSection() {
  return (
    <section id="music" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Music</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              I make music too
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Aside from programming, I also compose music. Here are some of
              them.
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.music.map((track) => (
            <TimelineItem
              key={track.title + track.date}
              className="w-full flex items-start justify-between gap-10"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                <div className="size-10 bg-card z-10 shrink-0 flex items-center justify-center border rounded-full shadow ring-2 ring-border flex-none">
                  <Music className="size-4 text-muted-foreground" aria-hidden />
                </div>
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {track.date && (
                  <time className="text-xs text-muted-foreground">
                    {track.date}
                  </time>
                )}
                {track.title && (
                  <h3 className="font-semibold leading-none">{track.title}</h3>
                )}
                {track.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {track.description}
                  </p>
                )}
                {track.url && (
                  <div className="mt-1 overflow-hidden rounded-xl border">
                    <iframe
                      title={track.title}
                      width="100%"
                      height="120"
                      allow="autoplay"
                      loading="lazy"
                      src={soundcloudEmbedSrc(track.url)}
                      className="block"
                    />
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
