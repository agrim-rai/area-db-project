import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Normalization = () => {
  return (
    <PageLayout title="Normalization">
      <div className="space-y-8">
        <p className="text-foreground leading-relaxed">
          The database has been normalized to ensure minimal redundancy, consistent data, and efficient query performance. 
          The normalization process includes the following steps:
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">1. First Normal Form (1NF)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium text-foreground">All tables satisfy 1NF because:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-foreground">
              <li>Each table has a primary key.</li>
              <li>All attributes hold atomic (indivisible) values.</li>
              <li>There are no repeating groups or multi-valued attributes.</li>
            </ul>
            <div className="mt-4 p-4 bg-accent rounded">
              <p className="font-semibold mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Passenger contact and passport details are stored as individual fields.</li>
                <li>Baggage entries are stored as separate records instead of multiple weights in one field.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">2. Second Normal Form (2NF)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium text-foreground">All tables are in 2NF because:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-foreground">
              <li>They are already in 1NF.</li>
              <li>Every non-key attribute is fully functionally dependent on the primary key.</li>
              <li>No partial dependencies exist, since no table uses a composite primary key.</li>
            </ul>
            <div className="mt-4 p-4 bg-accent rounded">
              <p className="font-semibold mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Booking details depend entirely on BookingID.</li>
                <li>Flight attributes depend entirely on FlightID.</li>
                <li>Seat details depend entirely on SeatID.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">3. Third Normal Form (3NF)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium text-foreground">The database satisfies 3NF because:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-foreground">
              <li>All tables are in 2NF.</li>
              <li>There are no transitive dependencies (non-key attributes do not depend on other non-key attributes).</li>
              <li>Derived values are not stored; instead, they are computed when needed.</li>
            </ul>
            <div className="mt-4 p-4 bg-accent rounded">
              <p className="font-semibold mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Airport city/country does not depend on Route; it is stored only in the Airport table.</li>
                <li>Aircraft model details are stored once in Aircraft, not repeated in each Flight record.</li>
                <li>Crew member information is centralized, not duplicated across multiple assignments.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Final Result</CardTitle>
            <CardDescription>Key Benefits of Normalization</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 pl-4 text-foreground">
              <li><strong>Eliminates data redundancy:</strong> Information is stored once and referenced where needed.</li>
              <li><strong>Maintains data consistency:</strong> Updates in one place automatically reflect everywhere.</li>
              <li><strong>Improves data integrity:</strong> Relationships are enforced through foreign keys.</li>
              <li><strong>Optimizes storage:</strong> Reduces unnecessary duplication of data.</li>
              <li><strong>Simplifies updates:</strong> Changes are made in a single location.</li>
              <li><strong>Enhances query performance:</strong> Well-structured tables allow for efficient data retrieval.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Normalization;
