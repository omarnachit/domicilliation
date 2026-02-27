'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Key, AlertCircle, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { JSX } from 'react';

interface LoginLog {
  id: string;
  user: string;
  email: string;
  loginTime: Date;
  ipAddress: string;
  device: string;
  status: 'success' | 'failed';
}

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  critical: boolean;
}

export default function SecurityPage(): JSX.Element {
  const [showApiKey, setShowApiKey] = useState(false);
  const [loginLogs] = useState<LoginLog[]>([
    {
      id: '1',
      user: 'Admin Principal',
      email: 'admin@martech.ma',
      loginTime: new Date(),
      ipAddress: '192.168.1.100',
      device: 'Windows 10 - Chrome',
      status: 'success',
    },
    {
      id: '2',
      user: 'Gestionnaire Contrats',
      email: 'contracts@martech.ma',
      loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      ipAddress: '192.168.1.105',
      device: 'macOS - Safari',
      status: 'success',
    },
    {
      id: '3',
      user: 'Assistant Support',
      email: 'support@martech.ma',
      loginTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      ipAddress: '192.168.1.110',
      device: 'iOS - Safari',
      status: 'success',
    },
    {
      id: '4',
      user: 'Unknown User',
      email: 'unknown@example.com',
      loginTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      ipAddress: '203.0.113.45',
      device: 'Unknown',
      status: 'failed',
    },
  ]);

  const [securitySettings] = useState<SecuritySetting[]>([
    {
      id: '1',
      name: 'Authentification à Deux Facteurs',
      description: 'Exiger 2FA pour tous les administrateurs',
      enabled: true,
      critical: true,
    },
    {
      id: '2',
      name: 'Verrouillage de Compte',
      description: 'Verrouiller après 5 tentatives échouées',
      enabled: true,
      critical: true,
    },
    {
      id: '3',
      name: 'Chiffrement SSL/TLS',
      description: 'Chiffrer toutes les Communications',
      enabled: true,
      critical: true,
    },
    {
      id: '4',
      name: 'Journalisation d\'Audit',
      description: 'Enregistrer toutes les actions système',
      enabled: true,
      critical: false,
    },
    {
      id: '5',
      name: 'Alertes de Sécurité',
      description: 'Notifications pour les tentatives suspectes',
      enabled: true,
      critical: false,
    },
    {
      id: '6',
      name: 'Mode de Maintenance',
      description: 'Restreindre l\'accès pendant la maintenance',
      enabled: false,
      critical: false,
    },
  ]);

  const failedLoginAttempts = loginLogs.filter(l => l.status === 'failed').length;
  const successLoginCount = loginLogs.filter(l => l.status === 'success').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sécurité et Conformité</h1>
        <p className="text-gray-600 mt-2">Gestion avancée de la sécurité du système</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">État de Sécurité: Bon</p>
          <p>Tous les paramètres essentiels sont configurés correctement.</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Connexions Réussies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successLoginCount}</div>
            <p className="text-xs text-gray-500 mt-1">aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Tentatives Échouées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedLoginAttempts}</div>
            <p className="text-xs text-gray-500 mt-1">détectées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              Paramètres Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {securitySettings.filter(s => s.enabled).length}/6
            </div>
            <p className="text-xs text-gray-500 mt-1">fonctionnalités activées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Key className="h-4 w-4 text-blue-600" />
              Clés API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-gray-500 mt-1">actives</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Tabs */}
      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
          <TabsTrigger value="logs">Logs Connexion</TabsTrigger>
          <TabsTrigger value="keys">Clés API</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {securitySettings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{setting.name}</p>
                      {setting.critical && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 border">Critique</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    disabled
                    className="h-5 w-5 rounded border-gray-300 text-green-600 cursor-not-allowed"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal des Connexions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date/Heure</TableHead>
                      <TableHead>Adresse IP</TableHead>
                      <TableHead>Appareil</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginLogs.map(log => (
                      <TableRow key={log.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">{log.user}</TableCell>
                        <TableCell className="text-gray-600">{log.email}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {log.loginTime.toLocaleDateString('fr-FR')} {log.loginTime.toLocaleTimeString('fr-FR')}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-gray-600">{log.ipAddress}</TableCell>
                        <TableCell className="text-sm text-gray-600">{log.device}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              log.status === 'success'
                                ? 'bg-green-100 text-green-800 border-green-200 border'
                                : 'bg-red-100 text-red-800 border-red-200 border'
                            }
                          >
                            {log.status === 'success' ? 'Réussi' : 'Échoué'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clés API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { name: 'Production API', key: 'sk_prod_', lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000) },
                  { name: 'Staging API', key: 'sk_stg_', lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000) },
                  { name: 'Development API', key: 'sk_dev_', lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
                ].map((api, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{api.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Dernière utilisation: {api.lastUsed.toLocaleDateString('fr-FR')}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded font-mono text-xs text-gray-600 break-all">
                      {showApiKey ? api.key + '*'.repeat(30) : api.key + '*'.repeat(30)}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Key className="mr-2 h-4 w-4" />
                Générer Nouvelle Clé API
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Avancés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Limite de Taux (Rate Limiting)</p>
                  <p className="text-sm text-gray-600 mb-4">1000 requêtes par heure par IP</p>
                  <Button variant="outline">Configurer</Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">CORS (Cross-Origin Resource Sharing)</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Domaines autorisés: localhost, martech-domiciliation.ma
                  </p>
                  <Button variant="outline">Configurer</Button>
                </div>

                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <p className="font-medium text-orange-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Supprimer les Données
                  </p>
                  <p className="text-sm text-orange-800 mb-4">
                    Cette action supprimera définitivement toutes les données du système
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Supprimer Toutes les Données
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
