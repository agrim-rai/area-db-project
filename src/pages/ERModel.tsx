import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const ERModel = () => {
  return (
    <PageLayout title="ER Model">
      <div className="space-y-8">
        {/* ER Diagram Placeholder */}
        <Card className="p-8 bg-muted/30">
          <div className="text-center text-muted-foreground">
            <p className="mb-2 font-semibold">ER Diagram</p>
            <p className="text-sm">Placeholder for ER Model diagram image</p>
            <p className="text-xs mt-2">(Upload your ER diagram here)</p>
          </div>
        </Card>

        <div className="prose prose-slate max-w-none">
          <p className="text-foreground leading-relaxed mb-6">
            The ER model represents a complete airline management system. It covers five major domains:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
            <li>Booking & Passenger Flow</li>
            <li>Flight Operations & Scheduling</li>
            <li>Crew Management</li>
            <li>Maintenance & Inventory</li>
            <li>Rules & Fares</li>
          </ol>
          <p className="text-foreground leading-relaxed mb-8">
            Each block handles one major subsystem, and the relationships show how data moves between them.
          </p>
        </div>

        {/* Domain Details */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="booking">
            <AccordionTrigger className="text-lg font-semibold">
              1. Booking & Passenger Flow
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <div>
                <h4 className="font-semibold mb-2">Passenger</h4>
                <p>Stores passenger identity details.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Booking</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Linked to Passenger (1–N): One passenger can have many bookings.</li>
                  <li>Attributes include booking reference, status, date.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Payment</h4>
                <p>Each booking can have multiple payments (1–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ticket</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Generated from a booking (1–1).</li>
                  <li>Linked to Baggage and Check-in.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Baggage</h4>
                <p>Each ticket can have multiple baggage items (1–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Check-in</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Linked to Ticket (1–1).</li>
                  <li>Generates a BoardingPass (1–1).</li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-accent rounded">
                <p className="font-semibold">Flow:</p>
                <p>Passenger → Booking → Ticket → Check-in → Boarding Pass</p>
                <p className="text-sm mt-2">Plus Payment and Baggage.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flight">
            <AccordionTrigger className="text-lg font-semibold">
              2. Flight Operations & Scheduling
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <div>
                <h4 className="font-semibold mb-2">Flight</h4>
                <p>Core entity of operations.</p>
                <p>Attributes: FlightNumber, Status, DepartureTime.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Schedule</h4>
                <p>One flight has one scheduled time (1–1).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Delay/Cancellation</h4>
                <p>Zero or many delay/cancellation events for a flight (0–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Aircraft</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>One aircraft operates many flights (1–N).</li>
                  <li>Attributes: TailNumber, Model, Capacity.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Route</h4>
                <p>Defines a flight's origin and destination.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Seat</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Aircraft has many seats (1–N).</li>
                  <li>Mapped to flights for seat allocation.</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="crew">
            <AccordionTrigger className="text-lg font-semibold">
              3. Crew Management
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <div>
                <h4 className="font-semibold mb-2">CrewMember</h4>
                <p>A person working on flights (pilot, cabin crew, etc.)</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">CrewAssignment</h4>
                <p>Maps crew members to flights (1–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">PilotLicense / FARating</h4>
                <p>A crew member can have multiple licenses and ratings (1–N each).</p>
              </div>
              <div className="mt-4 p-4 bg-accent rounded">
                <p>This block ensures each flight has the required certified staff.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="maintenance">
            <AccordionTrigger className="text-lg font-semibold">
              4. Maintenance & Inventory
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <div>
                <h4 className="font-semibold mb-2">MaintenanceRecord</h4>
                <p>Linked to Aircraft (1–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">MaintenanceTask</h4>
                <p>Each record contains multiple tasks (1–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">PartInventory</h4>
                <p>Tracks spare parts used in tasks (N–M).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Supplier</h4>
                <p>Each part is supplied by a vendor (N–1).</p>
              </div>
              <div className="mt-4 p-4 bg-accent rounded">
                <p>This ensures safe and compliant aircraft operation.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rules">
            <AccordionTrigger className="text-lg font-semibold">
              5. Rules & Fares
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <div>
                <h4 className="font-semibold mb-2">FareBasis</h4>
                <p>Defines ticket pricing codes.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">FareRule</h4>
                <p>Each fare basis has multiple rules (1–N).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">LoyaltyProgram</h4>
                <p>Links passengers to fare benefits and point accumulation.</p>
              </div>
              <div className="mt-4 p-4 bg-accent rounded">
                <p>This block manages ticket pricing, discounts, and customer rewards.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default ERModel;
