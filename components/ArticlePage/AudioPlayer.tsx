// components/AudioPlayer.tsx

type Dict = {
  articles: {
    audio: {
      listen: string;
      noAudio: string;
      notSupported: string;
    };
  };
};

interface AudioPlayerProps {
  src: string;
  dict: Dict;
}

export default function AudioPlayer({ src, dict }: AudioPlayerProps) {
  const { audio } = dict.articles;

  if (!src)
    return (
      <div className="w-full py-4 mx-auto">
        <span className="text-sm text-center text-black/70">
          {audio.noAudio}
        </span>
      </div>
    );

  return (
    <div className="max-w-3xl py-6 mx-auto lg:px-8">
      <h3 className="mb-2 text-center uppercase font-secondary">
        {audio.listen}
      </h3>
      <audio
        controls
        preload="auto"
        className="w-full h-12"
        controlsList="nodownload"
      >
        <source src={src} type="audio/mpeg" />
        {audio.notSupported}
      </audio>
    </div>
  );
}
