import { DocsSidebar, type SidebarSection } from "@/components/docs/docs-sidebar";
import { docsNav } from "@/config/docs";
import { getAllDocs } from "@/lib/content";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllDocs();
  const sections: SidebarSection[] = docsNav.map((section) => ({
    title: section.title,
    items: section.slugs.map((slug) => ({ slug, title: docs.find((d) => d.slug === slug)?.title ?? slug })),
  }));

  return (
    <div className="border-t border-line">
      <div className="container-wide grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
        <DocsSidebar sections={sections} />
        <div className="min-w-0 lg:border-l lg:border-line lg:pl-10 xl:pl-14">{children}</div>
      </div>
    </div>
  );
}
