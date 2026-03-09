import ShareButton from "../common/ShareButton";

type Dict = {
  common: {
    buttons: {
      share: string;
      copied: string;
    };
  };
  articles: {
    metadata: {
      writer: string;
    };
  };
};

interface AuthorNavProps {
  dict: Dict;
}

export default function AuthorNav({ dict }: AuthorNavProps) {
  return (
    <div className="w-full max-w-screen-xl mx-auto justify-between flex items-center px-4 lg:py-10 py-6 lg:pl-24 lg:pr-8">
      <h3 className="text-2xl text-primary-red">
        {dict.articles.metadata.writer}
      </h3>
      <ShareButton dict={dict} />
    </div>
  );
}
