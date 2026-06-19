import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

type Organisation = {
  id: string;
  name: string;
  groupId?: string;
  groupName?: string;
};

const initialOrgs: Organisation[] = [
  { id: "acme", name: "ACME Construction" },
  { id: "bedrock-const", name: "Bedrock Construction", groupId: "gd-trade", groupName: "GD Trade Group" },
  { id: "bedrock-log", name: "Bedrock Logistics", groupId: "gd-trade", groupName: "GD Trade Group" },
  { id: "sunrise", name: "Sunrise Mining" },
];

export default function SelectOrganization({ 
  onSelect, 
  onBack 
}: { 
  onSelect: (orgId: string, orgName: string) => void; 
  onBack: () => void;
}) {
  
  const [organisations, setOrganisations] = useState<Organisation[]>(initialOrgs);
  const [showCreate, setShowCreate] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  const handleSelect = (org: Organisation) => {
    localStorage.setItem('selectedOrganization', JSON.stringify({
      id: org.id,
      name: org.name,
      groupId: org.groupId,
      groupName: org.groupName,
    }));
    onSelect(org.id, org.name);
  };

  const handleCreateOrganisation = () => {
    if (!newOrgName.trim()) return;

    const newOrg: Organisation = {
      id: "org-" + Date.now(),
      name: newOrgName.trim(),
      groupName: newGroupName.trim() || undefined,
      groupId: newGroupName.trim() ? "group-" + Date.now() : undefined,
    };

    setOrganisations([...organisations, newOrg]);
    setNewOrgName("");
    setNewGroupName("");
    setShowCreate(false);

    handleSelect(newOrg);
  };

  const standaloneOrgs = organisations.filter(org => !org.groupId);
  const groupedOrgs = organisations.filter(org => org.groupId);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Select Organisation</h1>
            <p className="text-gray-500 mt-1">Choose where you want to work today</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
            <Button onClick={() => setShowCreate(true)} className="bg-[#007A4D] hover:bg-[#00663f]">
              + Create Organisation
            </Button>
          </div>
        </div>

        {/* Standalone Organisations */}
        {standaloneOrgs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Standalone Organisations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standaloneOrgs.map((org) => (
                <div key={org.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-[#006AA7] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{org.name}</h3>
                      <p className="text-sm text-gray-500">Standalone</p>
                    </div>
                  </div>
                  <Button onClick={() => handleSelect(org)} className="w-full bg-[#006AA7] hover:bg-[#005589]">
                    Enter Organisation
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organisations in Groups */}
        {groupedOrgs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Part of a Group</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedOrgs.map((org) => (
                <div key={org.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#007A4D] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-[#007A4D] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{org.name}</h3>
                      <p className="text-sm text-gray-500">Part of <span className="font-medium text-[#007A4D]">{org.groupName}</span></p>
                    </div>
                  </div>
                  <Button onClick={() => handleSelect(org)} className="w-full bg-[#006AA7] hover:bg-[#005589]">
                    Enter Organisation
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Organisation Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Create New Organisation</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Organisation Name</label>
                  <input 
                    type="text" 
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    placeholder="e.g. Horizon Logistics"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Group Name (optional)</label>
                  <input 
                    type="text" 
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    placeholder="e.g. Horizon Group (leave blank for standalone)"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={() => setShowCreate(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateOrganisation} 
                  disabled={!newOrgName.trim()}
                  className="flex-1 bg-[#007A4D] hover:bg-[#00663f]"
                >
                  Create & Enter
                </Button>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-10">
          Demo mode — New organisations are temporary for this session
        </p>
      </div>
    </div>
  );
}
