import React from 'react';
import { Button } from "@/components/ui/button";

export default function SelectOrganization({ goToDashboard }: { goToDashboard: () => void }) {
  const handleSelect = (orgId: string, orgName: string) => {
    localStorage.setItem('selectedOrganization', JSON.stringify({ id: orgId, name: orgName }));
    goToDashboard();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Select Organisation</h1>
            <p className="text-gray-500 mt-1">Choose where you want to work today</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/"}
          >
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] transition-all">
            <h3 className="font-semibold text-lg mb-2">ACME Construction</h3>
            <p className="text-sm text-gray-500 mb-4">Standalone Organisation</p>
            <Button 
              onClick={() => handleSelect("acme-construction", "ACME Construction")}
              className="w-full bg-[#006AA7] hover:bg-[#005589]"
            >
              Enter Organisation
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] transition-all">
            <h3 className="font-semibold text-lg mb-2">Bedrock Construction</h3>
            <p className="text-sm text-gray-500 mb-1">Part of: <span className="font-medium">GD Trade Group</span></p>
            <Button 
              onClick={() => handleSelect("bedrock-construction", "Bedrock Construction")}
              className="w-full bg-[#006AA7] hover:bg-[#005589]"
            >
              Enter Organisation
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#006AA7] transition-all">
            <h3 className="font-semibold text-lg mb-2">Bedrock Logistics</h3>
            <p className="text-sm text-gray-500 mb-1">Part of: <span className="font-medium">GD Trade Group</span></p>
            <Button 
              onClick={() => handleSelect("bedrock-logistics", "Bedrock Logistics")}
              className="w-full bg-[#006AA7] hover:bg-[#005589]"
            >
              Enter Organisation
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Demo mode — Click any organisation to continue
        </p>
      </div>
    </div>
  );
}
