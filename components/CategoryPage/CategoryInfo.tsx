import ShareButton from "../common/ShareButton";

interface CategoryInfoProps {
  name: string;
  description: string;
}
const CategoryInfo = ({ name, description }: CategoryInfoProps) => {
  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto lg:pt-16 pt-6 lg:pr-10 lg:pl-16 px-4">
        <div className="flex justify-end">
          <ShareButton />
        </div>
        <h1 className="text-5xl lg:text-7xl uppercase text-primary-red tracking-wider mb-4">
          {name}
        </h1>
        <p className="lg:text-xl font-secondary max-w-5xl mb-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryInfo;
