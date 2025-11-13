import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/problem-statement", label: "Problem Statement" },
    { to: "/solution", label: "Solution" },
    { to: "/er-model", label: "ER Model" },
    { to: "/relational-model", label: "Relational Model" },
    { to: "/integrity-constraints", label: "Integrity Constraints" },
    { to: "/normalization", label: "Normalization" },
    { to: "/conclusion", label: "Conclusion" },
    { to: "/bibliography", label: "Bibliography" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-header border-b border-header-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-lg font-semibold text-foreground">DBMS Project</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                activeClassName="text-primary bg-accent"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                  activeClassName="text-primary bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
