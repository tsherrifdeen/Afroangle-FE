import Image from "next/image";
import SocialLink, { PlatformType } from "./SocialLink";

// 1. Define the interface for a single social object
interface SocialItem {
  platform: PlatformType;
  url: string;
}

// 2. Define the Author structure
interface Author {
  name: string;
  bio?: string; // Optional field
  socials: SocialItem[];
  image?: string;
  alt?: string;
}

// 3. Define the Props for this component
interface AuthorHeroProps {
  author: Author;
}

const AuthorHero = ({ author }: AuthorHeroProps) => {
  return (
    <section className="w-full max-w-screen-xl px-4 pb-2 mx-auto mb-8 space-y-6 border-b lg:px-24 border-b-gray-400">
      <header className="space-y-3">
        <h1 className="font-bold uppercase text-4xl lg:text-6xl">
          {author.name}
        </h1>

        {author.bio && (
          <p className="max-w-5xl text-gray-700 font-secondary">{author.bio}</p>
        )}
      </header>

      <div className="flex items-center gap-4">
        {author.socials?.map((social, index) => (
          <SocialLink
            key={`${social.platform}-${index}`}
            platform={social.platform}
            url={social.url}
          />
        ))}
      </div>

      {author.image && (
        <figure className="space-y-4">
          <Image
            src={author.image}
            alt={author.alt || author.name || "Author photo"}
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-contain w-full h-auto max-w-xl"
            loading="lazy"
          />

          {author.alt && (
            <figcaption className="w-full max-w-2xl italic text-gray-600 capitalize font-secondary">
              {author.alt}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
};

export default AuthorHero;
