import Image from "next/image";
const Header = () => {
  return (
    <header className="font-secondary border-b border-b-[#0000004D]">
      <div className="mx-auto px-8 py-6 max-w-screen-xl flex justify-between items-end">
        <div className="flex items-end">
          <Image
            src="/afroangle-logo.svg"
            alt="Afroangle Logo"
            className="mr-4"
            width={150} // 1. REQUIRED: Set the intrinsic width of the SVG
            height={30} // 1. REQUIRED: Set the intrinsic height of the SVG
            priority // 2. RECOMMENDED: Preloads the image since it's a logo (LCP)
          />
          <p className="mb-3">The African lens for all global issues</p>
        </div>
        <button className="bg-primary-green py-3 pl-8 pr-6 text-white [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)] ">
          Get the daily digest
        </button>
      </div>
    </header>
  );
};
export default Header;
