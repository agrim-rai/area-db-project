import PageLayout from "@/components/PageLayout";

const Solution = () => {
  return (
    <PageLayout title="Solution">
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-foreground">
          The system is designed using a normalized database storing airlines, aircraft, flights, 
          schedules, passengers, and bookings. Proper relationships and integrity constraints ensure 
          accurate, conflict-free operations. The final database structure supports reliable data entry, 
          efficient retrieval, and smooth airport and airline management.
        </p>
      </div>
    </PageLayout>
  );
};

export default Solution;
