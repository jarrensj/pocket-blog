import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Image from 'next/image';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-[var(--sketch-charcoal)] tracking-wide">
            pocket science
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-muted)] font-light tracking-wide">
            not advice
          </p>
        </header>
        
        <main>
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="textured-bg sketch-shadow rounded-lg p-4 sm:p-6 lg:p-8 border-[var(--border-subtle)] border transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                  <div className="w-full sm:w-48 md:w-56 lg:w-56 h-48 sm:h-36 md:h-40 lg:h-40 flex-shrink-0 rounded-lg overflow-hidden sketch-border bg-[var(--parchment)]">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={224}
                        height={160}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 stroke-[1.5]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light leading-tight text-[var(--sketch-charcoal)]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[var(--muted-ochre)] transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-base text-[var(--text-muted)] font-light">
                      <span className="text-[var(--sketch-light)]">{post.author}</span>
                      <span className="text-[var(--muted-ochre)]">🍣</span>
                      <time 
                        dateTime={post.publishDate}
                        className="text-[var(--sketch-light)]"
                      >
                        {new Date(post.publishDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="px-3 sm:px-4 py-1 sm:py-2 bg-[var(--parchment)] border border-[var(--sketch-border)] rounded-full text-xs sm:text-sm text-[var(--sketch-accent)] font-light tracking-wide hover:bg-[var(--sketch-light)] hover:text-[var(--background)] transition-colors duration-200"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                    
                    <p className="text-[var(--sketch-light)] text-base sm:text-lg leading-relaxed font-light">
                      {post.description}
                    </p>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--muted-ochre)] hover:text-[var(--sketch-charcoal)] transition-colors duration-200 font-medium tracking-wide text-sm sm:text-base"
                    >
                      Read more
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
