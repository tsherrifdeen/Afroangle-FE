// components/articles/ArticleImage.tsx
import Image from "next/image";

interface ArticleImageProps {
  src: string;
  caption: string;
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
          className="object-contain w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-gray-700 capitalize font-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
