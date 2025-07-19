import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Dynamically import the MDX content
  const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`));

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="mb-8 sm:mb-10 lg:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--muted-ochre)] hover:text-[var(--sketch-charcoal)] transition-colors duration-200 font-medium tracking-wide text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to all posts
          </Link>
        </nav>

        <article className="textured-bg sketch-shadow rounded-lg p-4 sm:p-6 lg:p-8 xl:p-12 border-[var(--border-subtle)] border">
          <header className="mb-8 sm:mb-10 lg:mb-12">
            {post.image && (
              <div className="w-full h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden sketch-border bg-[var(--parchment)] mb-6 sm:mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={896}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-6 sm:mb-8 text-[var(--sketch-charcoal)] leading-tight tracking-wide">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-base text-[var(--text-muted)] font-light mb-6 sm:mb-8">
              <span className="text-[var(--sketch-light)]">{post.author}</span>
              <span className="text-[var(--muted-ochre)]">🍣</span>
              <time 
                dateTime={post.publishDate}
                className="text-[var(--sketch-light)]"
              >
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-[var(--parchment)] border border-[var(--sketch-border)] rounded-full text-xs sm:text-sm text-[var(--sketch-accent)] font-light tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-[var(--sketch-charcoal)] prose-headings:font-light prose-headings:tracking-wide prose-p:text-[var(--sketch-light)] prose-p:font-light prose-p:leading-relaxed prose-a:text-[var(--muted-ochre)] prose-a:no-underline hover:prose-a:text-[var(--sketch-charcoal)] prose-a:transition-colors prose-a:duration-200 prose-strong:text-[var(--sketch-charcoal)] prose-strong:font-medium prose-code:text-[var(--sketch-accent)] prose-code:bg-[var(--parchment)] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:border prose-code:border-[var(--sketch-border)] prose-code:text-sm prose-pre:bg-[var(--parchment)] prose-pre:border prose-pre:border-[var(--sketch-border)] prose-pre:text-sm prose-blockquote:text-[var(--sketch-light)] prose-blockquote:border-l-[var(--muted-ochre)] prose-li:text-[var(--sketch-light)] prose-img:rounded-lg prose-img:border prose-img:border-[var(--sketch-border)]">
            <MDXContent />
          </div>
        </article>

        <footer className="mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-[var(--border-subtle)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--muted-ochre)] hover:text-[var(--sketch-charcoal)] transition-colors duration-200 font-medium tracking-wide text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const metadata: Metadata = {
    title: `${post.title} | pocket science`,
    description: post.description,
    keywords: post.tags,
  };

  if (post.image) {
    metadata.openGraph = {
      title: post.title,
      description: post.description,
      images: [post.image],
    };
  }

  return metadata;
}
