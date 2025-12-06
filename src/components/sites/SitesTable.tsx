import { useState } from 'react';
import { ExternalLink, Sparkles, MoreHorizontal, Power, PowerOff } from 'lucide-react';
import { SiteData, generateSitePrompt, copyToClipboard } from '@/utils/promptGenerator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SitesTableProps {
  sites: SiteData[];
  onToggleStatus: (id: string) => void;
}

export function SitesTable({ sites, onToggleStatus }: SitesTableProps) {
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const { toast } = useToast();

  const handleGeneratePrompt = (site: SiteData) => {
    const prompt = generateSitePrompt(site);
    setSelectedPrompt(prompt);
    setSelectedSite(site);
    setPromptDialogOpen(true);
  };

  const handleCopyPrompt = async () => {
    await copyToClipboard(selectedPrompt);
    toast({
      title: "Prompt copiado!",
      description: "O prompt foi copiado para a área de transferência.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const isPaymentOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Empresa</TableHead>
              <TableHead className="font-semibold">URL do Site</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Próximo Pagamento</TableHead>
              <TableHead className="text-right font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site, index) => (
              <TableRow 
                key={site.id} 
                className={cn(
                  "transition-colors animate-fade-in",
                  !site.active && "opacity-60"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {site.id}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{site.company}</div>
                  <div className="text-xs text-muted-foreground">{site.segment}</div>
                </TableCell>
                <TableCell>
                  <a
                    href={site.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <span className="truncate max-w-[200px]">{site.siteUrl}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "font-medium",
                      site.active 
                        ? "bg-success/10 text-success border-success/20" 
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    )}
                  >
                    {site.active ? 'Ativo' : 'Desativado'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={cn(
                    "text-sm",
                    isPaymentOverdue(site.nextPayment) && "text-destructive font-medium"
                  )}>
                    {formatDate(site.nextPayment)}
                    {isPaymentOverdue(site.nextPayment) && (
                      <span className="block text-xs">Atrasado</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGeneratePrompt(site)}
                      className="gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Gerar Prompt</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onToggleStatus(site.id)}>
                          {site.active ? (
                            <>
                              <PowerOff className="mr-2 h-4 w-4 text-destructive" />
                              Desativar Site
                            </>
                          ) : (
                            <>
                              <Power className="mr-2 h-4 w-4 text-success" />
                              Ativar Site
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Prompt Dialog */}
      <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Prompt Gerado - {selectedSite?.company}
            </DialogTitle>
            <DialogDescription>
              Use este prompt no Lovable.dev para criar um novo site
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap border border-border">
              {selectedPrompt}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setPromptDialogOpen(false)}>
              Fechar
            </Button>
            <Button onClick={handleCopyPrompt} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Copiar Prompt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
