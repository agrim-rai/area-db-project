import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const IntegrityConstraints = () => {
  return (
    <PageLayout title="Implemented Integrity Constraints">
      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full" defaultValue="primary">
          <AccordionItem value="primary">
            <AccordionTrigger className="text-lg font-semibold">
              A. Primary Key Constraints
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <p className="mb-4">
                Every table includes a PRIMARY KEY to uniquely identify each record:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Passenger(PassengerID)</li>
                <li>Booking(BookingID)</li>
                <li>Flight(FlightID)</li>
                <li>Aircraft(AircraftID)</li>
                <li>Ticket(TicketID)</li>
                <li>Payment(PaymentID)</li>
                <li>CheckIn(CheckInID)</li>
                <li>BoardingPass(BoardingPassID)</li>
                <li>Schedule(ScheduleID)</li>
                <li>Route(RouteID)</li>
                <li>Airport(AirportID)</li>
                <li>Gate(GateID)</li>
                <li>Seat(SeatID)</li>
                <li>CrewMember(CrewID)</li>
                <li>CrewAssignment(AssignmentID)</li>
                <li>MaintenanceRecord(RecordID)</li>
                <li>MaintenanceTask(TaskID)</li>
                <li>PartInventory(PartID)</li>
                <li>Supplier(SupplierID)</li>
                <li>FareBasis(FareBasisID)</li>
                <li>FareRule(RuleID)</li>
                <li>LoyaltyProgram(ProgramID)</li>
              </ul>
              <p className="mt-4 font-medium">
                This ensures no duplicate entries and guarantees entity integrity.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="foreign">
            <AccordionTrigger className="text-lg font-semibold">
              B. Foreign Key Constraints
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <p className="mb-4">
                Foreign keys maintain referential integrity between related tables.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Booking.PassengerID → Passenger.PassengerID</li>
                <li>Ticket.BookingID → Booking.BookingID</li>
                <li>Ticket.FlightID → Flight.FlightID</li>
                <li>Flight.AircraftID → Aircraft.AircraftID</li>
                <li>Route.OriginAirportID → Airport.AirportID</li>
                <li>Route.DestinationAirportID → Airport.AirportID</li>
                <li>CrewAssignment.CrewID → CrewMember.CrewID</li>
                <li>CrewAssignment.FlightID → Flight.FlightID</li>
                <li>Payment.BookingID → Booking.BookingID</li>
                <li>Baggage.TicketID → Ticket.TicketID</li>
                <li>CheckIn.TicketID → Ticket.TicketID</li>
                <li>BoardingPass.CheckInID → CheckIn.CheckInID</li>
                <li>Schedule.FlightID → Flight.FlightID</li>
                <li>DelayCancellation.FlightID → Flight.FlightID</li>
                <li>Gate.AirportID → Airport.AirportID</li>
                <li>Seat.AircraftID → Aircraft.AircraftID</li>
                <li>PilotLicense.CrewID → CrewMember.CrewID</li>
                <li>FARating.CrewID → CrewMember.CrewID</li>
                <li>MaintenanceRecord.AircraftID → Aircraft.AircraftID</li>
                <li>MaintenanceTask.RecordID → MaintenanceRecord.RecordID</li>
                <li>PartInventory.SupplierID → Supplier.SupplierID</li>
                <li>FareRule.FareBasisID → FareBasis.FareBasisID</li>
                <li>LoyaltyProgram.PassengerID → Passenger.PassengerID</li>
                <li>LoyaltyProgram.FareBasisID → FareBasis.FareBasisID</li>
                <li>FeedbackComplaint.PassengerID → Passenger.PassengerID</li>
                <li>ServiceRequest.PassengerID → Passenger.PassengerID</li>
                <li>ServiceRequest.AssignedAgentID → CounterAgent.AgentID</li>
                <li>LostFound.PassengerID → Passenger.PassengerID</li>
                <li>LostFound.AgentID → CounterAgent.AgentID</li>
              </ul>
              <p className="mt-4 font-medium">
                Most foreign keys use ON DELETE CASCADE where dependent records must be removed when parent records are deleted.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="unique">
            <AccordionTrigger className="text-lg font-semibold">
              C. Unique Constraints
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <p className="mb-4">
                Unique constraints prevent duplicate values in fields that must be distinct:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Passenger.PassportNumber</li>
                <li>Booking.BookingRef</li>
                <li>Aircraft.TailNumber</li>
                <li>Airport.Code</li>
                <li>CheckIn.TicketID (one check-in per ticket)</li>
                <li>BoardingPass.CheckInID (one boarding pass per check-in)</li>
                <li>Flight.FlightNumber</li>
                <li>Gate.GateNumber (within each airport)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notnull">
            <AccordionTrigger className="text-lg font-semibold">
              D. Not Null Constraints
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <p className="mb-4">
                Critical attributes cannot be left empty:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Passenger.Name, Passenger.Contact</li>
                <li>Booking.BookingDate</li>
                <li>Flight.DepartureTime</li>
                <li>Schedule.ScheduledDeparture</li>
                <li>Aircraft.Model, Aircraft.Capacity</li>
                <li>Airport.Name, Airport.Code</li>
                <li>CrewMember.Name, CrewMember.Role</li>
                <li>Payment.Amount, Payment.PaymentDate</li>
                <li>Ticket.FlightID</li>
              </ul>
              <p className="mt-4 font-medium">
                These ensure essential information is always provided.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="check">
            <AccordionTrigger className="text-lg font-semibold">
              E. Check Constraints
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-foreground">
              <p className="mb-4">
                Check constraints enforce valid and logical values:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Booking.Status IN ('Confirmed', 'Pending', 'Cancelled')</li>
                <li>Flight.Status IN ('Scheduled', 'Departed', 'Arrived', 'Cancelled')</li>
                <li>Payment.Amount &gt; 0</li>
                <li>Seat.Class IN ('Economy', 'Business', 'First')</li>
                <li>Route.OriginAirportID &lt;&gt; DestinationAirportID</li>
                <li>LoyaltyProgram.Points &gt;= 0</li>
                <li>Aircraft.Capacity &gt; 0</li>
                <li>Baggage.Weight &gt; 0</li>
                <li>MaintenanceTask.Status IN ('Pending', 'In Progress', 'Completed')</li>
                <li>DelayCancellation.EventType IN ('Delay', 'Cancellation')</li>
              </ul>
              <p className="mt-4 font-medium">
                These restrictions maintain domain integrity across the database.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default IntegrityConstraints;
