import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

interface EmployeeSelectorProps {
  roleId: number;
  onEmployeeSelected: (employeeId: number, employeeName: string) => void;
  onCancel: () => void;
}

export function EmployeeSelector({
  roleId,
  onEmployeeSelected,
  onCancel,
}: EmployeeSelectorProps) {
  const [searchText, setSearchText] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
  });

  // Fetch all employees
  const { data: employees = [] } = trpc.employee.list.useQuery();

  // Fetch people already assigned to this role
  const { data: people = [] } = trpc.organisation.people.list.useQuery();
  const assignedEmployeeIds = people
    .filter((p) => p.roleId === roleId && p.employeeId)
    .map((p) => p.employeeId as number);

  // Filter out already assigned employees
  const availableEmployees = employees.filter(
    (emp) => !assignedEmployeeIds.includes(emp.id)
  );

  // Filter by search text
  const filteredEmployees = availableEmployees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const jobTitle = emp.jobTitle?.toLowerCase() || "";
    const search = searchText.toLowerCase();
    return fullName.includes(search) || jobTitle.includes(search);
  });

  // Check if search text matches any employee exactly
  const exactMatch = filteredEmployees.some(
    (emp) =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase() === searchText.toLowerCase()
  );

  // Create new employee mutation
  const createEmployee = trpc.employee.create.useMutation({
    onSuccess: (newEmployee) => {
      toast.success("Employee created successfully");
      setShowCreateDialog(false);
      setNewEmployeeForm({ firstName: "", lastName: "", email: "", jobTitle: "" });
      setSearchText("");
      // Auto-select the newly created employee
      onEmployeeSelected(
        newEmployee.id,
        `${newEmployee.firstName} ${newEmployee.lastName} (${newEmployee.jobTitle})`
      );
    },
    onError: (error) => {
      toast.error("Failed to create employee");
      console.error(error);
    },
  });

  const handleSelect = (employee: any) => {
    onEmployeeSelected(
      employee.id,
      `${employee.firstName} ${employee.lastName} (${employee.jobTitle})`
    );
    setSearchText("");
    setShowDropdown(false);
  };

  const handleCreateNew = () => {
    // Pre-fill the first and last name from search text
    const parts = searchText.trim().split(" ");
    setNewEmployeeForm({
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
      email: "",
      jobTitle: "",
    });
    setShowCreateDialog(true);
  };

  const handleSaveNewEmployee = () => {
    if (!newEmployeeForm.firstName || !newEmployeeForm.lastName) {
      toast.error("First name and last name are required");
      return;
    }

    createEmployee.mutate({
      firstName: newEmployeeForm.firstName,
      lastName: newEmployeeForm.lastName,
      email: newEmployeeForm.email && newEmployeeForm.email.trim() ? newEmployeeForm.email.trim() : undefined,
      jobTitle: newEmployeeForm.jobTitle || "Employee",
      status: "active",
    });
  };

  return (
    <>
      <div className="flex gap-2 items-end w-full">
        <div className="flex-1 relative">
          <div className="relative">
            <Input
              placeholder="Search employees by name or job title..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="pr-8"
            />
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-md shadow-md z-50 max-h-64 overflow-y-auto">
              {filteredEmployees.length > 0 ? (
                <>
                  {filteredEmployees.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => handleSelect(emp)}
                      className="w-full text-left px-3 py-2 hover:bg-accent text-sm border-b last:border-b-0"
                    >
                      <div className="font-medium">
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {emp.jobTitle}
                      </div>
                    </button>
                  ))}
                </>
              ) : searchText.length > 0 ? (
                <div className="p-3 text-sm text-muted-foreground">
                  No employees found
                </div>
              ) : (
                <div className="p-3 text-sm text-muted-foreground">
                  Type to search employees
                </div>
              )}

              {/* Create new option */}
              {searchText.length > 0 && !exactMatch && (
                <button
                  onClick={handleCreateNew}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm border-t bg-blue-50 hover:bg-blue-100 text-blue-900 font-medium"
                >
                  + Create new employee: "{searchText}"
                </button>
              )}
            </div>
          )}
        </div>

        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {/* Create New Employee Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Employee</DialogTitle>
            <DialogDescription>
              Add a new employee (outsourced or internal) to the system. After creation, they will be assigned to this role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={newEmployeeForm.firstName}
                  onChange={(e) =>
                    setNewEmployeeForm({ ...newEmployeeForm, firstName: e.target.value })
                  }
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={newEmployeeForm.lastName}
                  onChange={(e) =>
                    setNewEmployeeForm({ ...newEmployeeForm, lastName: e.target.value })
                  }
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={newEmployeeForm.email}
                onChange={(e) =>
                  setNewEmployeeForm({ ...newEmployeeForm, email: e.target.value })
                }
                placeholder="email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={newEmployeeForm.jobTitle}
                onChange={(e) =>
                  setNewEmployeeForm({ ...newEmployeeForm, jobTitle: e.target.value })
                }
                placeholder="Job title"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveNewEmployee}
              disabled={createEmployee.isPending}
            >
              {createEmployee.isPending ? "Creating..." : "Create & Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification toast for onboarding suggestion */}
      {showCreateDialog === false && searchText === "" && (
        <div className="text-xs text-muted-foreground mt-1">
          💡 After assigning an employee, consider setting up their onboarding tasks in the Onboarding page.
        </div>
      )}
    </>
  );
}
