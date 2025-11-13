import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const pages = [
    { to: "/problem-statement", label: "Problem Statement", description: "Understanding the need for airport and airline management" },
    { to: "/solution", label: "Solution", description: "Database design approach and system overview" },
    { to: "/er-model", label: "ER Model", description: "Entity-Relationship diagram and domain descriptions" },
    { to: "/relational-model", label: "Relational Model", description: "Complete relational schema with all entities and attributes" },
    { to: "/integrity-constraints", label: "Integrity Constraints", description: "Primary keys, foreign keys, and validation rules" },
    { to: "/normalization", label: "Normalization", description: "1NF, 2NF, and 3NF analysis" },
    { to: "/conclusion", label: "Conclusion", description: "Project summary and final remarks" },
    { to: "/bibliography", label: "Bibliography", description: "References and sources" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            DBMS Minor Project
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-primary">
            Airport and Airline Management System
          </h2>
          
          {/* Team Details */}
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Team 12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="font-semibold">Name: Agrim Rai</p>
                  <p className="text-muted-foreground">Roll No: 2024UCD3027</p>
                </div>
                <div>
                  <p className="font-semibold">Name: Aditya Singh</p>
                  <p className="text-muted-foreground">Roll No: 2024UCD2156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Summary */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-foreground leading-relaxed">
                A database management project implementing design, ER modeling, relational schema creation, 
                normalization, and integrity constraints for an Airport and Airline Management System. 
                This comprehensive system addresses the complexities of managing flights, passengers, 
                schedules, bookings, crew assignments, and maintenance operations in a centralized, 
                normalized database structure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-foreground text-center">
            Project Contents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <Link key={page.to} to={page.to}>
                <Card className="h-full hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{page.label}</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
