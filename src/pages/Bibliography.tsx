import PageLayout from "@/components/PageLayout";

const Bibliography = () => {
  return (
    <PageLayout title="Bibliography">
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-4 text-foreground text-lg">
          <li className="pl-2">
            Connolly, T., & Begg, C. <em>Database Systems: A Practical Approach to Design, Implementation, and Management.</em> Pearson.
          </li>
          <li className="pl-2">
            Ullman, J. D., & Widom, J. <em>A First Course in Database Systems.</em> Pearson.
          </li>
          <li className="pl-2">
            Official MySQL Documentation — <a href="https://dev.mysql.com/doc/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://dev.mysql.com/doc/</a>
          </li>
          <li className="pl-2">
            ERD and schema references prepared from project requirements and logical modeling principles.
          </li>
        </ol>
      </div>
    </PageLayout>
  );
};

export default Bibliography;
