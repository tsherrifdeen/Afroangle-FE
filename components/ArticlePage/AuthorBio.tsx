import LocaleLink from "../common/LocaleLink";
import { getAuthorById } from "@/sanity/services/authorService";

interface AuthorBioProps {
  articleId: string;
}

const AuthorBio = async ({ articleId }: AuthorBioProps) => {
  const author = await getAuthorById(articleId);

  if (!author) {
    return null;
  }

  return (
    <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-3 bg-neutral-200 px-6 pt-6 pb-10 lg:px-8 rounded-xs">
      <LocaleLink href={`/authors/${author.slug}`} activeClassName="">
        <h5 className="text-2xl font-semibold capitalize text-gray-900 hover:underline decoration-primary-red">
          {author.name}
        </h5>
      </LocaleLink>

      {/* Added leading-relaxed for line height and text-gray-800 for softer contrast */}
      <p className="text-gray-800 leading-relaxed font-secondary">
        {author.bio}
      </p>
    </div>
  );
};

export default AuthorBio;
