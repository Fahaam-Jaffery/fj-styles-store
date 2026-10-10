import { PageIntro, ShellWidth } from "@/components/site";
import { articles } from "@/data/journal";
import { longDate } from "@/lib/format";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — F&J Styles" },
      { name: "description", content: "Style guides and fashion notes from the F&J Styles house." },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  return (
    <>
      <PageIntro
        kicker="Journal"
        title="Style guides"
        lede="How the clothes are meant to be worn, and when to leave them alone."
      />
      <ShellWidth>
        <div className="grid gap-10 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug}>
              <Link to="/journal/$slug" params={{ slug: article.slug }} className="group block">
                <div className="shot shot-wide">
                  <img src={article.image} alt="" className="transition duration-300 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-xs tracking-widest text-sand uppercase">{article.tag}</p>
                <h2 className="mt-2 font-serif text-4xl group-hover:text-sand">{article.title}</h2>
                <p className="mt-3 text-mute">{article.standfirst}</p>
                <p className="mt-3 text-sm text-sand">
                  {longDate(article.date)} · {article.minutes} min read
                </p>
              </Link>
            </article>
          ))}
        </div>
      </ShellWidth>
    </>
  );
}
