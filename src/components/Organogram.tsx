import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface OrgNode {
  id: number;
  name: string;
  title: string;
  level: "executive" | "head" | "member";
  department?: string;
  sopLink?: string;
  children?: OrgNode[];
}

interface OrganogramProps {
  data: OrgNode;
}

function OrgNodeCard({ node }: { node: OrgNode }) {
  const levelColors = {
    executive: "bg-blue-100 border-blue-300 text-blue-900",
    head: "bg-green-100 border-green-300 text-green-900",
    member: "bg-gray-100 border-gray-300 text-gray-900",
  };

  return (
    <Card
      className={`p-4 min-w-[200px] ${levelColors[node.level]} border-2 hover:shadow-lg transition-shadow`}
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">{node.name}</h3>
        <p className="text-xs opacity-80">{node.title}</p>
        {node.department && (
          <Badge variant="outline" className="text-xs">
            {node.department}
          </Badge>
        )}
        {node.sopLink && (
          <a
            href={node.sopLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            View SOP
          </a>
        )}
      </div>
    </Card>
  );
}

function OrgLevel({ nodes }: { nodes: OrgNode[] }) {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {nodes.map((node) => (
        <div key={node.id} className="flex flex-col items-center gap-4">
          <OrgNodeCard node={node} />
          {node.children && node.children.length > 0 && (
            <>
              {/* Connector line */}
              <div className="w-px h-8 bg-border" />
              <OrgLevel nodes={node.children} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Organogram({ data }: OrganogramProps) {
  return (
    <div className="w-full overflow-auto p-8">
      <div className="min-w-max">
        <OrgLevel nodes={[data]} />
      </div>
    </div>
  );
}
