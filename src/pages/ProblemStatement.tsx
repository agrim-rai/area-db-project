import PageLayout from "@/components/PageLayout";

const ProblemStatement = () => {
  return (
    <PageLayout title="Problem Statement">
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-foreground">
          Airports and airlines require a centralized system to manage flights, passengers, schedules, 
          and bookings. This project aims to design a normalized, consistent database that supports 
          efficient and accurate airport and airline operations.
        </p>
      </div>
    </PageLayout>
  );
};

export default ProblemStatement;
