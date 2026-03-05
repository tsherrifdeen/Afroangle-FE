type Dict = {
  about: {
    pageTitle: string;
    heading: string;
    aboutTitle: string;
    aboutBody: string;
    convictionTitle: string;
    convictionBody: string;
    missionTitle: string;
    missionBody: string;
    closing: string;
  };
};

interface AboutPageProps {
  dict: Dict;
}

const AboutPageContent = ({ dict }: AboutPageProps) => {
  const { about } = dict;

  return (
    <main className="scroll-smooth">
      <section className="mx-auto w-full max-w-screen-xl px-4 pt-6 lg:pl-16 lg:pr-10 lg:pt-16">
        <header className="max-w-5xl">
          <h1 className="mb-8 text-2xl uppercase tracking-wider text-primary-red lg:text-4xl">
            {about.pageTitle}
          </h1>
          <div className="mb-10 border-l-4 border-primary-red/70 py-2 pl-4">
            <p className="text-lg font-secondary font-normal  ">
              {about.heading}
            </p>
          </div>
        </header>

        <div className="max-w-6xl space-y-6 lg:space-y-6">
          {/* CARD 1 — WHO WE ARE */}
          <div>
            <div className="space-y-5 rounded border border-neutral-200 bg-white p-6 lg:p-8">
              <h2 className="text-lg font-secondary lg:text-xl">
                {about.aboutTitle}
              </h2>

              <p className="text-base leading-relaxed lg:text-lg first-letter:text-6xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:-mt-2">
                {about.aboutBody}
              </p>
            </div>
          </div>

          {/* CARD 2 — VISION & MISSION */}
          <div>
            <div className="space-y-8 rounded border border-neutral-200 bg-white p-6 lg:p-8">
              {/* Conviction Block */}
              <div>
                <h2 className="text-lg mb-4 font-secondary lg:text-xl">
                  {about.convictionTitle}
                </h2>
                <p className="text-base leading-relaxed lg:text-lg first-letter:text-6xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:-mt-2">
                  {about.convictionBody}
                </p>
              </div>

              {/* Mission Block */}
              <div>
                <h2 className="text-lg mb-4 font-secondary lg:text-xl">
                  {about.missionTitle}
                </h2>
                <p className="text-base leading-relaxed lg:text-lg first-letter:text-6xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:-mt-2">
                  {about.missionBody}
                </p>
              </div>

              {/* HIGHLIGHT BOX - Closing */}
              <div className="rounded border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-base font-medium leading-relaxed text-primary-green lg:text-lg">
                  {about.closing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPageContent;
