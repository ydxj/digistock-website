import { renderOgImage, ogSize } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/content";

export const alt = "Guide DigiStock";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({ eyebrow: post?.category ?? "Guide", title: post?.title ?? "Guides DigiStock" });
}
