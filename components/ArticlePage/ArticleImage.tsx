// components/articles/ArticleImage.tsx
import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ArticleImage({ src, alt, caption }: ArticleImageProps) {
  return (
    <figure className="w-full">
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={600}
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm tracking-wide text-gray-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
