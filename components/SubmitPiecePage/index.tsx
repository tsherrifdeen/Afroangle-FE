import OpinionSubmissionModal from "../common/SubmitOpinionPiece";
type Dict = {
  submitPiece: {
    pageTitle: string;
    heading: string;
    introTitle: string;
    introBody: string;
    downloadGuide: string;
    strongStoryTitle: string;
    strongStoryBody: string;
    readyToPitch: string;
    openForm: string;
  };
  opinionSubmission: {
    modal: {
      form: {
        title: string;
        description: string;
        fileHint: string;
      };
      success: {
        title: string;
        description: string;
      };
    };
  };
};

interface SubmitPieceProps {
  dict: Dict;
}

const SubmitPieceContent = ({ dict }: SubmitPieceProps) => {
  const { submitPiece } = dict;

  return (
    <main className="scroll-smooth">
      <section className="mx-auto w-full max-w-screen-xl px-4 pt-6 lg:pl-16 lg:pr-10 lg:pt-16">
        <header className="max-w-5xl">
          <h1 className="mb-8 text-2xl uppercase tracking-wider text-primary-red lg:text-4xl">
            {submitPiece.pageTitle}
          </h1>

          <div className="mb-10 border-l-4 border-primary-red/70 py-2 pl-4">
            <p className="font-secondary lg:text-lg">{submitPiece.heading}</p>
          </div>
        </header>

        <div className="max-w-6xl space-y-6">
          {/* CARD 1 — WHAT WE ARE LOOKING FOR */}
          <div>
            <div className="space-y-4 border border-neutral-200 bg-white p-4 lg:p-8">
              <h2 className="text-lg font-secondary lg:text-xl">
                {submitPiece.introTitle}
              </h2>

              <p className="text-lg lg:text-xl">{submitPiece.introBody}</p>

              {/* PDF Download Link */}
              <div className="pt-2">
                <a
                  href="/Official_Style_Guide_for_Afroangle_Contributors.pdf"
                  download
                  className="inline-flex items-center font-secondary font-medium text-primary-red underline hover:text-red-700"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {submitPiece.downloadGuide}
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2 — STRONG STORY & FORM TRIGGER */}
          <div>
            <div className="space-y-6 border border-neutral-200 bg-white p-4 lg:p-8">
              <div>
                <h2 className="mb-3 text-lg font-secondary lg:text-xl">
                  {submitPiece.strongStoryTitle}
                </h2>
                <p className="lg:text-xl text-lg">
                  {submitPiece.strongStoryBody}
                </p>
              </div>

              {/* HIGHLIGHT BOX - Form Trigger */}
              <div className="border border-neutral-200 bg-neutral-50 p-3 lg:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="font-secondary text-base font-medium leading-relaxed text-neutral-800 lg:text-lg">
                  {submitPiece.readyToPitch}
                </p>

                {/* Modal Trigger Component */}
                <OpinionSubmissionModal
                  trigger={
                    <button className="whitespace-nowrap bg-primary-green px-6 py-2.5 font-secondary font-medium text-white transition-colors hover:opacity-80">
                      {submitPiece.openForm}
                    </button>
                  }
                  dict={dict}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubmitPieceContent;
