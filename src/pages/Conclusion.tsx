import PageLayout from "@/components/PageLayout";

const Conclusion = () => {
  return (
    <PageLayout title="Conclusion">
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-foreground">
          The airline management database system was successfully designed using systematic analysis, 
          ER modeling, and relational schema construction. The final schema covers all major operational areas, 
          including passenger management, flight scheduling, ticketing, crew assignment, fare rules, maintenance, 
          and customer service.
        </p>
        
        <p className="text-lg leading-relaxed text-foreground">
          The database has been normalized up to Third Normal Form (3NF) to eliminate redundancy and maintain 
          data consistency. Various integrity constraints such as primary keys, foreign keys, unique constraints, 
          check constraints, and cascading rules ensure reliable and accurate data handling.
        </p>
        
        <p className="text-lg leading-relaxed text-foreground">
          Overall, the designed system provides a scalable and robust structure that supports core airline operations, 
          ensures smooth data flow between modules, and allows efficient management of real-world airline processes.
        </p>
      </div>
    </PageLayout>
  );
};

export default Conclusion;
