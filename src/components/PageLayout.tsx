import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {title && (
          <h1 className="text-4xl font-bold mb-8 text-foreground border-b-2 border-primary pb-3">
            {title}
          </h1>
        )}
        <div className="prose prose-slate max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
