import React from 'react';

interface Person {
  id: number;
  name: string;
  roleId: number;
}

interface KPI {
  id: number;
  roleId: number;
  name: string;
  targetValue: string;
  unit: string;
  measurementFrequency: string;
}

interface Role {
  id: number;
  title: string;
  departmentId: number;
  parentRoleId: number | null;
  hierarchyLevel: number;
  sortOrder: number;
}

interface Department {
  id: number;
  name: string;
  managerId: number | null;
  sortOrder?: number;
}

interface OrganisationPyramidPDFProps {
  departments: Department[];
  roles: Role[];
  people: Person[];
  kpis: KPI[];
  executiveRoles: Role[];
  executivePeople: Person[];
  orgName?: string;
}

export const OrganisationPyramidPDF: React.FC<OrganisationPyramidPDFProps> = ({
  departments,
  roles,
  people,
  kpis,
  executiveRoles,
  executivePeople,
  orgName = "Organisation",
}) => {
  // Get department manager name
  const getManagerName = (managerId: number | null) => {
    if (!managerId) return null;
    const manager = people.find(p => p.id === managerId);
    return manager?.name || null;
  };

  // Get people for a role
  const getRolePeople = (roleId: number) => {
    return people.filter(p => p.roleId === roleId);
  };

  // Get KPIs for a role
  const getRoleKPIs = (roleId: number) => {
    return kpis.filter(k => k.roleId === roleId).slice(0, 2); // Max 2 KPIs per role
  };

  // Get roles for a department (only level 1 roles)
  const getDepartmentRoles = (deptId: number) => {
    return roles
      .filter(r => r.departmentId === deptId && r.hierarchyLevel === 1)
      .sort((a, b) => a.sortOrder - b.sortOrder);
      // Show all roles (removed .slice(0, 2) limit)
  };

  // Count total people in department
  const getDepartmentPeopleCount = (deptId: number) => {
    const deptRoles = roles.filter(r => r.departmentId === deptId);
    return people.filter(p => deptRoles.some(r => r.id === p.roleId)).length;
  };

  // Common style to remove all borders
  const noBorderStyle = {
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
  };

  return (
    <div 
      id="pdf-export-view" 
      style={{
        width: '297mm',
        height: '297mm',
        padding: '25px 35px',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        position: 'relative',
        ...noBorderStyle,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', ...noBorderStyle }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e40af', margin: '0 0 5px 0', ...noBorderStyle }}>
          {orgName}
        </h1>
        <h2 style={{ fontSize: '18px', color: '#64748b', margin: '0 0 3px 0', fontWeight: '500', ...noBorderStyle }}>
          Organisational Structure
        </h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0', ...noBorderStyle }}>
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Executive Management */}
      <div style={{ marginBottom: '20px', ...noBorderStyle }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1e40af', 
          textAlign: 'center', 
          marginBottom: '12px',
          margin: '0 0 12px 0',
          ...noBorderStyle,
        }}>
          Executive Management
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', ...noBorderStyle }}>
          {executiveRoles.map(role => {
            const rolePeople = executivePeople.filter(p => p.roleId === role.id);
            return (
              <div 
                key={role.id} 
                style={{
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  padding: '14px 24px',
                  minWidth: '180px',
                  textAlign: 'center',
                  ...noBorderStyle,
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6', marginBottom: '6px', ...noBorderStyle }}>
                  {role.title}
                </div>
                {rolePeople.map(person => (
                  <div key={person.id} style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', ...noBorderStyle }}>
                    {person.name}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Departments */}
      <div style={{ ...noBorderStyle }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1e40af', 
          textAlign: 'center', 
          marginBottom: '12px',
          margin: '0 0 12px 0',
          ...noBorderStyle,
        }}>
          Departments
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '10px',
          fontSize: '13px',
          ...noBorderStyle,
        }}>
          {departments
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            .map(dept => {
              const managerName = getManagerName(dept.managerId);
              const deptRoles = getDepartmentRoles(dept.id);
              const peopleCount = getDepartmentPeopleCount(dept.id);
              
              return (
                <div 
                  key={dept.id} 
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px',
                    padding: '10px',
                    minHeight: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    ...noBorderStyle,
                  }}
                >
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#1e40af', 
                    marginBottom: '6px',
                    lineHeight: '1.2',
                    ...noBorderStyle,
                  }}>
                    {dept.name}
                  </div>

                  {managerName && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#475569', 
                      marginBottom: '6px',
                      fontWeight: '600',
                      ...noBorderStyle,
                    }}>
                      Manager: {managerName}
                    </div>
                  )}

                  {deptRoles.length > 0 && (
                    <div style={{ marginTop: '4px', flex: 1, ...noBorderStyle }}>
                      {deptRoles.map(role => {
                        const rolePeople = getRolePeople(role.id);
                        const roleKPIs = getRoleKPIs(role.id);
                        return (
                          <div key={role.id} style={{ marginBottom: '5px', ...noBorderStyle }}>
                            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.3', fontWeight: '600', ...noBorderStyle }}>
                              • {role.title}
                            </div>
                            {rolePeople.slice(0, 1).map(person => (
                              <div key={person.id} style={{ 
                                fontSize: '11px', 
                                color: '#475569', 
                                paddingLeft: '10px',
                                lineHeight: '1.2',
                                fontWeight: '600',
                                ...noBorderStyle,
                              }}>
                                {person.name}
                              </div>
                            ))}
                            {roleKPIs.length > 0 && (
                              <div style={{ paddingLeft: '10px', marginTop: '2px', ...noBorderStyle }}>
                                {roleKPIs.map(kpi => (
                                  <div key={kpi.id} style={{ 
                                    fontSize: '10px', 
                                    color: '#64748b',
                                    lineHeight: '1.3',
                                    fontWeight: '500',
                                    ...noBorderStyle,
                                  }}>
                                    ▸ {kpi.name}: {kpi.targetValue} {kpi.unit}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {peopleCount > 0 && (
                    <div style={{ 
                      fontSize: '9px', 
                      color: '#94a3b8', 
                      marginTop: '4px',
                      fontStyle: 'italic',
                      paddingTop: '4px',
                      ...noBorderStyle,
                    }}>
                      Total: {peopleCount} {peopleCount === 1 ? 'person' : 'people'}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '35px',
        right: '35px',
        textAlign: 'center',
        fontSize: '10px',
        color: '#94a3b8',
        paddingTop: '8px',
        ...noBorderStyle,
      }}>
        {orgName} - Confidential Organisational Structure
      </div>
    </div>
  );
};
