import ShareButton from "../common/ShareButton";

interface CategoryInfoProps {
  name: string | null;
  description: string;
  dict: {
    common: {
      buttons: {
        share: string;
        copied: string;
      };
    };
  };
}
const CategoryInfo = ({ name, description, dict }: CategoryInfoProps) => {
  return (
    <div>
      <div className="w-full max-w-screen-xl px-4 pt-6 mx-auto lg:pt-16 lg:pr-10 lg:pl-16">
        <div className="flex justify-end">
          <ShareButton dict={dict} />
        </div>
        <h1 className="mb-4 text-5xl tracking-wider uppercase lg:text-7xl text-primary-red">
          {name}
        </h1>
        <p className="max-w-5xl mb-2 lg:text-xl font-secondary">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryInfo;
