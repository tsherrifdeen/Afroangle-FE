// components/articles/ArticleImage.tsx
import Image from "next/image";

interface ArticleImageProps {
  src?: string;
  caption?: string;
}

export default function ArticleImage({ src, caption }: ArticleImageProps) {
  return (
    <figure className="w-full">
      <div className="relative w-full">
        <Image
          src={src}
          alt={caption}
          width={1024}
          height={400}
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
      </div>
      {caption && (
        <figcaption className="mt-3 tracking-wide text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
