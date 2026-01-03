"use client";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Afroangle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
