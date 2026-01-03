interface CategoryInfoProps {
  name: string;
  slug: string;
  description: string;
}
const CategoryInfo = ({ name, slug, description }) => {
  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto lg:pt-16 pt-6 lg:pr-10 lg:pl-16 px-4">
        <div className="flex justify-end">
          <button className="slant-top-left bg-neutral py-1.5 pr-4 pl-6 lg:text-lg font-secondary">
            Share
          </button>
        </div>
        <h1 className="text-5xl lg:text-7xl uppercase text-primary-red tracking-wider mb-4">
          {name}
        </h1>
        <p className="lg:text-xl font-secondary max-w-5xl mb-2">
          Writers explore the depths of our cultural heritage and how it shapes
          who we are and who we’ll be
        </p>
      </div>
    </div>
  );
};

export default CategoryInfo;
