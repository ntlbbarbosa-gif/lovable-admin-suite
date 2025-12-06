import { useState } from 'react';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  sites: number;
  status: 'Ativo' | 'Inativo';
}

const initialClients: Client[] = [
  { id: 1, name: 'João Silva', email: 'joao@techstore.com', phone: '(11) 99999-1234', sites: 1, status: 'Ativo' },
];

export function useClients() {
  const [clients, setClients] = useState<Client[]>(initialClients);

  const addClient = (newClient: Omit<Client, 'id'>) => {
    const id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    setClients(prev => [...prev, { ...newClient, id }]);
  };

  const getStats = () => {
    const total = clients.length;
    const active = clients.filter(c => c.status === 'Ativo').length;
    const avgSites = total > 0 ? clients.reduce((acc, c) => acc + c.sites, 0) / total : 0;
    
    return { total, active, avgSites };
  };

  return {
    clients,
    addClient,
    getStats,
  };
}
