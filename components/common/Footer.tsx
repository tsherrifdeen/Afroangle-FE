import Image from "next/image";
import NewsletterModal from "./NewsLetterSignUp";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";
import LanguageSwitcher from "./Languagewitcher";
import { localePath } from "../../utils/navigation";
import LocaleLink from "./LocaleLink";
import FooterSearch from "./FooterSearch";

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const { footer, common } = dict;

  const footerSections = [
    {
      title: footer.sections.about,
      links: [
        {
          label: footer.links.aboutAfroangle,
          href: `${localePath(locale, "/about")}`,
        },
      ],
    },
    {
      title: footer.sections.social,
      links: [
        { label: "X", href: "https://x.com/theafroangle?s=11" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/afroangle/",
        },
        {
          label: "Facebook",
          href: "https://www.facebook.com/profile.php?id=61586718135148&mibextid=wwXIfr",
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/afroangle1?igsh=emxhcjZ2YXcwM2Fl",
        },
      ],
    },
    {
      title: footer.sections.contact,
      links: [
        {
          label: footer.links.emailUs,
          href: "mailto:editorial@afroangle.com&subject=Inquiry%20from%20Afroangle%20Website&body=Hello%2C%0AI%20have%20a%20question.",
        },
        {
          label: footer.links.submitOpinion,
          href: localePath(locale, "/submit-piece"),
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#406755] mt-24 text-white antialiased">
      <div className="max-w-screen-xl px-6 pt-16 mx-auto pb-9 lg:px-8">
        {/* --- Top Section: Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 tracking-[5%]">
          {/* Column 1: Mission Statement */}
          <div className="pr-0 lg:col-span-4 lg:pr-12">
            <p className="text-sm font-light leading-loose font-secondary">
              <span className="text-lg font-medium font-primary">
                {common.seo.home.defaultTitle};
              </span>{" "}
              {footer.mission}
            </p>
          </div>

          {/* Columns 2-5: Dynamic Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="mb-6 text-lg font-bold tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-light text-gray-200 transition-colors hover:text-white font-secondary hover:underline decoration-1 underline-offset-4"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-2">
            <div className="flex gap-2">
              <FooterSearch dict={common} locale={locale} />
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-white/20 mb-9"></div>

        {/* --- Bottom Section --- */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row items-center lg:gap-4">
          {/* Left: Logo & Tagline */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <LocaleLink href={"/"}>
                <Image
                  src="/afroangle_logo_light.svg"
                  alt="Afroangle Logo"
                  className="w-30 lg:w-auto"
                  width={150}
                  height={30}
                  priority
                />
              </LocaleLink>
            </div>
            <span className="hidden font-normal font-secondary sm:block">
              {dict.navigation.tagline}
            </span>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Center: Subscribe Button */}
          <div className="w-full justify-center flex lg:w-auto">
            <NewsletterModal
              trigger={
                <button className="py-4 pl-8 pr-6 leading-none text-white bg-primary-green font-secondary ring-1 ring-white slant-top-left">
                  {common.buttons.subscribe}
                </button>
              }
              dict={dict}
            />
          </div>

          {/* Right: Copyright & Legal */}
          <div className="max-w-lg text-sm font-light leading-relaxed text-left lg:text-right">
            <p className="">{footer.legal.copyright}</p>
            <p className="text-xs opacity-90 font-secondary">
              {footer.legal.recaptcha}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
