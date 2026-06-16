import React from "react";

interface Person {
  id: number;
  name: string;
  roleId: number;
}

interface Role {
  id: number;
  name: string;
  departmentId: number;
  parentRoleId: number | null;
  hierarchyLevel: number;
}

interface Department {
  id: number;
  name: string;
  managerId: number | null;
}

interface KPI {
  id: number;
  roleId: number;
  name: string;
  targetValue: string;
  unit: string;
}

interface OrganisationPDFViewProps {
  executives: Person[];
  departments: Department[];
  roles: Role[];
  people: Person[];
  kpis: KPI[];
  orgName?: string;
}

export function OrganisationPDFView({
  executives,
  departments,
  roles,
  people,
  kpis,
  orgName = "Organisation",
}: OrganisationPDFViewProps) {
  // Get people for a specific role
  const getPeopleForRole = (roleId: number) => {
    return people.filter((p) => p.roleId === roleId);
  };

  // Get KPIs for a specific role
  const getKPIsForRole = (roleId: number) => {
    return kpis.filter((k) => k.roleId === roleId);
  };

  // Get sub-roles for a role
  const getSubRoles = (parentRoleId: number) => {
    return roles
      .filter((r) => r.parentRoleId === parentRoleId)
      .sort((a, b) => a.id - b.id);
  };

  // Get top-level roles for a department
  const getTopLevelRoles = (departmentId: number) => {
    return roles
      .filter((r) => r.departmentId === departmentId && r.parentRoleId === null)
      .sort((a, b) => a.id - b.id);
  };

  // Get manager for a department
  const getDepartmentManager = (departmentId: number) => {
    const dept = departments.find((d) => d.id === departmentId);
    if (!dept || !dept.managerId) return null;
    return people.find((p) => p.id === dept.managerId);
  };

  return (
    <div
      id="pdf-export-view"
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: "1200px",
        minHeight: "1400px",
        backgroundColor: "#ffffff",
        padding: "40px",
        paddingBottom: "120px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", borderBottom: "3px solid #1e40af", paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1e40af", margin: 0 }}>
          {orgName}
        </h1>
        <h2 style={{ fontSize: "24px", color: "#64748b", marginTop: "10px" }}>
          Organisational Structure
        </h2>
        <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "10px" }}>
          {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Executive Level */}
      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e40af", marginBottom: "20px", textAlign: "center" }}>
          Executive Management
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {executives.map((exec) => (
            <div
              key={exec.id}
              style={{
                border: "2px solid #1e40af",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#eff6ff",
                minWidth: "200px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px" }}>
                Managing Director
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1e40af" }}>
                {exec.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments Grid */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e40af", marginBottom: "20px", textAlign: "center" }}>
          Departments
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px" }}>
          {departments.filter((dept) => dept.name !== "Executive Management").map((dept) => {
            const manager = getDepartmentManager(dept.id);
            const topLevelRoles = getTopLevelRoles(dept.id);

            return (
              <div
                key={dept.id}
                style={{
                  border: "2px solid #3b82f6",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "#f8fafc",
                  breakInside: "avoid",
                }}
              >
                {/* Department Header */}
                <div style={{ marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid #cbd5e1" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e40af", margin: 0 }}>
                    {dept.name}
                  </h4>
                  {manager && (
                    <div style={{ marginTop: "8px", fontSize: "14px", color: "#64748b" }}>
                      <strong>Manager:</strong> {manager.name}
                    </div>
                  )}
                </div>

                {/* Roles */}
                {topLevelRoles.map((role) => {
                  const rolePeople = getPeopleForRole(role.id);
                  const roleKPIs = getKPIsForRole(role.id);
                  const subRoles = getSubRoles(role.id);

                  return (
                    <div key={role.id} style={{ marginBottom: "15px" }}>
                      {/* Role Name */}
                      <div
                        style={{
                          backgroundColor: "#dbeafe",
                          padding: "10px",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1e40af" }}>
                          {role.name}
                        </div>
                      </div>

                      {/* People in this role */}
                      {rolePeople.length > 0 && (
                        <div style={{ marginLeft: "15px", marginBottom: "8px" }}>
                          {rolePeople.map((person) => (
                            <div
                              key={person.id}
                              style={{
                                fontSize: "13px",
                                color: "#475569",
                                padding: "4px 0",
                              }}
                            >
                              • {person.name}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* KPIs */}
                      {roleKPIs.length > 0 && (
                        <div style={{ marginLeft: "15px", marginBottom: "8px" }}>
                          <div style={{ fontSize: "12px", fontWeight: "bold", color: "#64748b", marginBottom: "4px" }}>
                            KPIs:
                          </div>
                          {roleKPIs.map((kpi) => (
                            <div
                              key={kpi.id}
                              style={{
                                fontSize: "11px",
                                color: "#64748b",
                                padding: "2px 0",
                              }}
                            >
                              • {kpi.name}: {kpi.targetValue} {kpi.unit}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub-roles */}
                      {subRoles.map((subRole) => {
                        const subRolePeople = getPeopleForRole(subRole.id);
                        const subRoleKPIs = getKPIsForRole(subRole.id);

                        return (
                          <div key={subRole.id} style={{ marginLeft: "15px", marginBottom: "8px" }}>
                            <div
                              style={{
                                backgroundColor: "#f1f5f9",
                                padding: "8px",
                                borderRadius: "4px",
                                marginBottom: "6px",
                              }}
                            >
                              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#475569" }}>
                                {subRole.name}
                              </div>
                            </div>

                            {/* People in sub-role */}
                            {subRolePeople.length > 0 && (
                              <div style={{ marginLeft: "15px", marginBottom: "6px" }}>
                                {subRolePeople.map((person) => (
                                  <div
                                    key={person.id}
                                    style={{
                                      fontSize: "12px",
                                      color: "#64748b",
                                      padding: "3px 0",
                                    }}
                                  >
                                    • {person.name}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Sub-role KPIs */}
                            {subRoleKPIs.length > 0 && (
                              <div style={{ marginLeft: "15px", marginBottom: "6px" }}>
                                <div style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b", marginBottom: "3px" }}>
                                  KPIs:
                                </div>
                                {subRoleKPIs.map((kpi) => (
                                  <div
                                    key={kpi.id}
                                    style={{
                                      fontSize: "10px",
                                      color: "#64748b",
                                      padding: "2px 0",
                                    }}
                                  >
                                    • {kpi.name}: {kpi.targetValue} {kpi.unit}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer - positioned at absolute bottom */}
      <div style={{
        marginTop: "auto",
        paddingTop: "40px", 
        paddingBottom: "30px",
        borderTop: "4px solid #1e40af", 
        textAlign: "center",
        clear: "both",
        width: "100%",
        position: "absolute",
        bottom: "40px",
        left: "40px",
        right: "40px"
      }}>
        <p style={{ fontSize: "13px", fontWeight: "600", color: "#64748b", margin: 0 }}>
          {orgName} - Confidential Organisational Structure
        </p>
        <p style={{ fontSize: "10px", color: "#94a3b8", marginTop: "6px", margin: 0 }}>
          This document contains confidential information
        </p>
      </div>
    </div>
  );
}
