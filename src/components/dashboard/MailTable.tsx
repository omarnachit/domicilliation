'use client';

import { useState, useMemo } from 'react';
import { Mail, MailCategory, MailStatus } from '@/lib/mail-data';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MailTableProps {
  mails: Mail[];
}

export function MailTable({ mails }: MailTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MailCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<MailStatus | 'all'>('all');

  const categories: (MailCategory | 'all')[] = [
    'all',
    'Fiscal',
    'Recommandé',
    'Commercial',
    'Administratif',
  ];
  const statuses: (MailStatus | 'all')[] = ['all', 'unread', 'read', 'archived'];

  const filteredMails = useMemo(() => {
    return mails.filter((mail) => {
      const matchesSearch =
        searchQuery === '' ||
        mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mail.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || mail.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || mail.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [mails, searchQuery, selectedCategory, selectedStatus]);

  const getCategoryColor = (category: MailCategory) => {
    switch (category) {
      case 'Fiscal':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Recommandé':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Commercial':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Administratif':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getStatusColor = (status: MailStatus) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'read':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'archived':
        return 'bg-zinc-100 text-zinc-800 border-zinc-200';
    }
  };

  const getStatusLabel = (status: MailStatus) => {
    switch (status) {
      case 'unread':
        return 'Non lu';
      case 'read':
        return 'Lu';
      case 'archived':
        return 'Archivé';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Rechercher par expéditeur ou sujet..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-medium text-zinc-600">Catégorie:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs"
            >
              {cat === 'all' ? 'Toutes' : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <span className="text-sm font-medium text-zinc-600">Statut:</span>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className="text-xs"
            >
              {status === 'all'
                ? 'Tous'
                : status === 'unread'
                  ? 'Non lu'
                  : status === 'read'
                    ? 'Lu'
                    : 'Archivé'}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-zinc-500">
        {filteredMails.length} courrier{filteredMails.length !== 1 ? 's' : ''}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="border-zinc-200 hover:bg-zinc-50">
              <TableHead className="h-10 text-zinc-700">Date</TableHead>
              <TableHead className="h-10 text-zinc-700">Expéditeur</TableHead>
              <TableHead className="h-10 text-zinc-700">Catégorie</TableHead>
              <TableHead className="h-10 text-zinc-700">Sujet</TableHead>
              <TableHead className="h-10 text-zinc-700">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMails.length > 0 ? (
              filteredMails.map((mail) => (
                <TableRow
                  key={mail.id}
                  className="border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  <TableCell className="text-sm text-zinc-900">
                    {formatDate(mail.date)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-900">
                    {mail.sender}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getCategoryColor(mail.category)}`}
                    >
                      {mail.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs text-sm text-zinc-700 truncate">
                    {mail.subject}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(mail.status)}`}
                    >
                      {getStatusLabel(mail.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-zinc-50">
                <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
                  Aucun courrier trouvé matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
