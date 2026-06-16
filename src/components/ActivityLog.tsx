import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, User, Calendar, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";

interface ActivityLogProps {
  taskId: string;
  taskName: string;
}

export function ActivityLog({ taskId, taskName }: ActivityLogProps) {
  const [open, setOpen] = useState(false);
  
  const { data: logs, isLoading } = trpc.activityLog.getByTask.useQuery(
    { taskId },
    { enabled: open } // Only fetch when dialog is open
  );

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      created: "Created task",
      updated: "Updated task",
      deleted: "Deleted task",
      progress_changed: "Changed progress",
      date_changed: "Changed dates",
      assignee_changed: "Changed assignee",
      note_added: "Added note",
      document_added: "Added document",
    };
    return labels[action] || action;
  };

  const getActionIcon = (action: string) => {
    if (action.includes("note")) return <FileText className="w-4 h-4" />;
    if (action.includes("date")) return <Calendar className="w-4 h-4" />;
    return <History className="w-4 h-4" />;
  };

  const formatValue = (value: string | null | undefined, field?: string | null) => {
    if (!value) return "—";
    
    // Try to parse as JSON first (for complex values)
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.length > 0 ? parsed.join(", ") : "—";
      }
      if (typeof parsed === "object") {
        return JSON.stringify(parsed);
      }
    } catch {
      // Not JSON, return as is
    }
    
    // Format dates
    if (field?.toLowerCase().includes("date")) {
      try {
        return format(new Date(value), "MMM dd, yyyy");
      } catch {
        return value;
      }
    }
    
    // Format progress
    if (field === "progress") {
      return `${value}%`;
    }
    
    return value;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="w-4 h-4" />
          View Activity Log
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Activity Log: {taskName}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              Loading activity history...
            </div>
          ) : !logs || logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <History className="w-12 h-12 mb-3 opacity-50" />
              <p>No activity recorded yet</p>
              <p className="text-sm">Changes to this task will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {getActionIcon(log.action)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm">
                        {getActionLabel(log.action)}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <User className="w-3 h-3" />
                      <span>{log.userName}</span>
                    </div>
                    
                    {log.field && (
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          <span className="font-medium capitalize">{log.field}:</span>
                        </p>
                        <div className="flex items-center gap-2 pl-4">
                          {log.oldValue && (
                            <>
                              <span className="text-red-600 dark:text-red-400 line-through">
                                {formatValue(log.oldValue, log.field)}
                              </span>
                              <span className="text-muted-foreground">→</span>
                            </>
                          )}
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formatValue(log.newValue, log.field)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
