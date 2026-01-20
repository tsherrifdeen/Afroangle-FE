// components/AudioPlayer.tsx
interface AudioPlayerProps {
  src: string;
}
export default function AudioPlayer({ src }: AudioPlayerProps) {
  if (!src)
    return (
      <div className="py-4 w-full mx-auto">
        <span className="text-black/70 text-sm text-center">
          No Audio available for this article
        </span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto lg:px-8 py-6">
      <h3 className="text-sm text-center uppercase mb-2">
        Listen to this article
      </h3>
      <audio
        controls
        preload="auto"
        className="w-full h-12"
        controlsList="nodownload"
      >
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
