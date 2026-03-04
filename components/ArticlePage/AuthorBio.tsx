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
    <div className="flex flex-col w-full max-w-3xl gap-3 px-4 pt-4 pb-10 mx-auto mt-8 bg-neutral lg:px-6">
      <LocaleLink href={`/authors/${author.slug}`} activeClassName="">
        <h5 className="text-2xl font-medium capitalize hover:underline decoration-primary-red">
          {author.name}
        </h5>
      </LocaleLink>
      <p className="text-sm font-secondary">{author.bio}</p>
    </div>
  );
};

export default AuthorBio;
