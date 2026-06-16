import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileDown, Eye, Mail, MessageCircle } from "lucide-react";
import { viewPDFInApp, emailPDF, shareViaWhatsApp } from "@/lib/pdfExport";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

interface PDFExportButtonProps {
  elementId: string;
  filename: string;
  label?: string;
  simplifiedElementId?: string; // Optional element ID for simplified PDF version
}

/**
 * Reusable PDF export button component with three options:
 * 1. View in app (opens PDF in new tab)
 * 2. Email to me (sends PDF to user's email)
 * 3. Share via WhatsApp (opens WhatsApp with PDF attached on mobile, downloads on desktop)
 */
export function PDFExportButton({ elementId, filename, label = "Export PDF", simplifiedElementId }: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();
  
  const emailMutation = trpc.organisation.emailPDF.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error.message}`);
    },
  });

  const handleViewInApp = async (useSimplified = false) => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    try {
      const targetElementId = useSimplified && simplifiedElementId ? simplifiedElementId : elementId;
      const targetFilename = useSimplified ? `${filename}-simplified` : filename;
      await viewPDFInApp({ elementId: targetElementId, filename: targetFilename });
    } catch (error) {
      console.error('View PDF error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmail = async () => {
    if (isGenerating) return;
    if (!user?.email) {
      toast.error('User email not available. Please log in again.');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const pdfBase64 = (await emailPDF({ elementId, filename, userEmail: user.email })) as string;
      
      // Send email via backend
      await emailMutation.mutateAsync({
        pdfBase64,
        filename,
        recipientEmail: user.email,
      });
    } catch (error) {
      console.error('Email PDF error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsApp = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    try {
      await shareViaWhatsApp({ elementId, filename });
    } catch (error) {
      console.error('WhatsApp share error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          disabled={isGenerating}
        >
          <FileDown className="h-4 w-4" />
          {isGenerating ? 'Generating...' : label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem onClick={() => handleViewInApp(false)} disabled={isGenerating}>
          <Eye className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-medium">View Full Version</span>
            <span className="text-xs text-muted-foreground">Complete org chart with KPIs</span>
          </div>
        </DropdownMenuItem>
        
        {simplifiedElementId && (
          <DropdownMenuItem onClick={() => handleViewInApp(true)} disabled={isGenerating}>
            <Eye className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">View Simplified Version</span>
              <span className="text-xs text-muted-foreground">Names & titles only (external use)</span>
            </div>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={handleEmail} disabled={isGenerating || !user?.email}>
          <Mail className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-medium">Email to Me</span>
            <span className="text-xs text-muted-foreground">
              {user?.email ? `Send to ${user.email}` : 'Login required'}
            </span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleWhatsApp} disabled={isGenerating}>
          <MessageCircle className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-medium">Share via WhatsApp</span>
            <span className="text-xs text-muted-foreground">
              {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) 
                ? 'Open in WhatsApp' 
                : 'Download & share manually'}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
