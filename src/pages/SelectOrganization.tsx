import React from 'react';
import { Button } from "@/components/ui/button";

export default function SelectOrganization({ 
  onSelect, 
  onBack 
}: { 
  onSelect: (orgId: string, orgName: string) => void; 
  onBack: () => void;
}) {
  const handleSelect = (orgId: string, orgName: string) => {
    localStorage.setItem('selectedOrganization', JSON.stringify({ id: orgId, name: orgName }));
    onSelect(orgId, orgName);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Select Organisation</h1>
            <p className="text-gray-500 mt-1">Choose the organisation you want to work in today</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Standalone Organisation */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#006AA7] rounded-xl flex items-center justify-center text-white font-bold">A</div>
              <div>
                <h3 className="font-semibold text-xl">ACME Construction</h3>
                <p className="text-sm text-gray-500">Standalone Organisation</p>
              </div>
            </div>
            <Button 
              onClick={() => handleSelect("acme-construction", "ACME Construction")}
              className="w-full bg-[#006AA7] hover:bg-[#005589] mt-2"
            >
              Enter Organisation
            </Button>
          </div>

          {/* Part of a Group */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#007A4D] rounded-xl flex items-center justify-center text-white font-bold">G</div>
              <div>
                <h3 className="font-semibold text-xl">Bedrock Construction</h3>
                <p className="text-sm text-gray-500">Part of <span className="font-medium text-[#007A4D]">GD Trade Group</span></p>
              </div>
            </div>
            <Button 
              onClick={() => handleSelect("bedrock-construction", "Bedrock Construction")}
              className="w-full bg-[#006AA7] hover:bg-[#005589] mt-2"
            >
              Enter Organisation
            </Button>
          </div>

          {/* Another in same Group */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#007A4D] rounded-xl flex items-center justify-center text-white font-bold">G</div>
              <div>
                <h3 className="font-semibold text-xl">Bedrock Logistics</h3>
                <p className="text-sm text-gray-500">Part of <span className="font-medium text-[#007A4D]">GD Trade Group</span></p>
              </div>
            </div>
            <Button 
              onClick={() => handleSelect("bedrock-logistics", "Bedrock Logistics")}
              className="w-full bg-[#006AA7] hover:bg-[#005589] mt-2"
            >
              Enter Organisation
            </Button>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Demo data — Ready to connect to real organisations and groups
        </p>
      </div>
    </div>
  );
}
