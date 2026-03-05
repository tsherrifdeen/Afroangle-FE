import Image from "next/image";
import Link from "next/link";
import NewsletterModal from "./NewsLetterSignUp";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";
import LocaleLink from "./LocaleLink";

interface HeaderProps {
  locale: string;
}

const Header = async ({ locale }: HeaderProps) => {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const { navigation, footer } = dict;

  return (
    <header className="border-b font-secondary border-black/30">
      <div className="flex items-center justify-between max-w-screen-xl px-4 py-2 mx-auto lg:px-8 lg:py-6 lg:items-end">
        <div className="flex items-center lg:items-end lg:gap-3">
          <LocaleLink href="/">
            <Image
              src="/afroangle-logo.svg"
              alt="Afroangle Logo"
              className="w-30 lg:w-auto"
              width={150}
              height={30}
              priority
            />
          </LocaleLink>
          <p className="hidden mb-3 lg:inline-block">{navigation.tagline}</p>
        </div>
        <div className="flex items-center gap-1">
          <LocaleLink
            href={"/submit-piece"}
            className="hidden cursor-pointer lg:inline-block group"
          >
            <span className="block p-px slant-bottom-right bg-primary-green">
              <span className="block py-4 pl-6 pr-8 leading-none transition-colors bg-white slant-bottom-right text-primary-green font-secondary group-hover:bg-primary-green group-hover:text-white">
                {footer.links.submitOpinion}
              </span>
            </span>
          </LocaleLink>
          <NewsletterModal dict={dict} />
        </div>
      </div>
    </header>
  );
};

export default Header;
