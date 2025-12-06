import { useState, useEffect } from 'react';
import { SiteData } from '@/utils/promptGenerator';
import sitesData from '@/data/sites.json';

export function useSites() {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with JSON data
    const loadSites = () => {
      setTimeout(() => {
        setSites(sitesData as SiteData[]);
        setLoading(false);
      }, 500);
    };

    loadSites();
  }, []);

  const toggleSiteStatus = (id: string) => {
    setSites(prevSites =>
      prevSites.map(site =>
        site.id === id ? { ...site, active: !site.active } : site
      )
    );
  };

  const addSite = (newSite: Omit<SiteData, 'id'>) => {
    const id = `S-${String(sites.length + 1).padStart(3, '0')}`;
    setSites(prevSites => [...prevSites, { ...newSite, id }]);
  };

  const getStats = () => {
    const activeSites = sites.filter(s => s.active).length;
    const inactiveSites = sites.filter(s => !s.active).length;
    const now = new Date();
    const overduePayments = sites.filter(s => new Date(s.nextPayment) < now).length;
    const upcomingPayments = sites.filter(s => {
      const paymentDate = new Date(s.nextPayment);
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return paymentDate >= now && paymentDate <= weekFromNow;
    }).length;
    const estimatedRevenue = activeSites * 299; // R$ 299 per site

    return {
      activeSites,
      inactiveSites,
      overduePayments,
      upcomingPayments,
      estimatedRevenue,
    };
  };

  return {
    sites,
    loading,
    toggleSiteStatus,
    addSite,
    getStats,
  };
}
