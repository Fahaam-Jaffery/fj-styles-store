import { ShellWidth } from "@/components/site";
import { articles, getArticle } from "@/data/journal";
import { longDate } from "@/lib/format";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => getArticle(params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — F&J Journal` : "Story not found — F&J Styles" },
      { name: "description", content: loaderData?.standfirst ?? "This story is no longer on the journal." },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  if (!article) {
    return (
      <ShellWidth className="py-24 text-center">
        <h1 className="font-serif text-5xl">That story has been filed away.</h1>
        <Link to="/journal" className="mt-8 inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase">
          Back to the journal
        </Link>
      </ShellWidth>
    );
  }

  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <article>
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
        <Link to="/journal" className="text-sm text-sand hover:underline">
          Journal
        </Link>
        <p className="mt-6 text-xs tracking-widest text-sand uppercase">{article.tag}</p>
        <h1 className="mt-3 font-serif text-5xl leading-none lg:text-6xl">{article.title}</h1>
        <p className="mt-4 text-sm text-mute">
          {longDate(article.date)} · {article.minutes} min read
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
        <div className="shot shot-wide">
          <img src={article.image} alt="" />
        </div>
      </div>
      <ShellWidth className="max-w-3xl">
        <p className="font-serif text-2xl">{article.standfirst}</p>
        <div className="mt-8 flex flex-col gap-6 text-lg">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {more.length > 0 ? (
          <div className="mt-16 border-t border-line pt-8">
            <p className="text-xs tracking-widest text-sand uppercase">Keep reading</p>
            <div className="mt-4 flex flex-col gap-3">
              {more.map((item) => (
                <Link key={item.slug} to="/journal/$slug" params={{ slug: item.slug }} className="font-serif text-2xl hover:text-sand">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </ShellWidth>
    </article>
  );
}
