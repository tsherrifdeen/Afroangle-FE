interface SpotlightProps {
  name: string;
  slug: string;
  bio: string;
}
const Spotlight = ({ name, slug, bio }) => {
  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto pt-16 pr-10 pl-16">
        <div className="flex justify-end">
          <button className="slant-top-left bg-neutral py-2 pr-4 pl-6 text-lg font-secondary">
            Share
          </button>
        </div>
        <h1 className="text-7xl uppercase text-primary-red tracking-wider mb-4">
          {name}
        </h1>
        <p className="text-xl font-secondary max-w-5xl mb-2">
          Writers explore the depths of our cultural heritage and how it shapes
          who we are and who we’ll be
        </p>
      </div>
    </div>
  );
};

export default Spotlight;
