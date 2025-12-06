import { Users, UserPlus, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const clients = [
  { id: 1, name: 'João Silva', email: 'joao@techstore.com', phone: '(11) 99999-1234', sites: 2, status: 'Ativo' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@silvalaw.com', phone: '(21) 98888-5678', sites: 1, status: 'Ativo' },
  { id: 3, name: 'Carlos Santos', email: 'carlos@odontoplus.com', phone: '(31) 97777-9012', sites: 1, status: 'Inativo' },
  { id: 4, name: 'Ana Costa', email: 'ana@saborcaseiro.com', phone: '(41) 96666-3456', sites: 1, status: 'Ativo' },
  { id: 5, name: 'Pedro Almeida', email: 'pedro@casanova.com', phone: '(51) 95555-7890', sites: 3, status: 'Ativo' },
];

export default function Clientes() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie os clientes do sistema</p>
        </div>
        <Button className="gap-2 w-fit">
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'Ativo').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sites por Cliente</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(clients.reduce((acc, c) => acc + c.sites, 0) / clients.length).toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client, index) => (
          <Card key={client.id} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-base">{client.name}</CardTitle>
                <Badge variant="outline" className={client.status === 'Ativo' ? 'status-active' : 'status-inactive'}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {client.phone}
              </div>
              <CardDescription className="pt-2">
                {client.sites} {client.sites === 1 ? 'site' : 'sites'} vinculado{client.sites === 1 ? '' : 's'}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
