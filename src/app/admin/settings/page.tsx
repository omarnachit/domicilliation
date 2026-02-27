'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AlertCircle, Save, Lock, Bell, Users, Shield, MailOpen, Clock } from 'lucide-react';
import { JSX } from 'react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage(): JSX.Element {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Martech Domiciliation',
    siteEmail: 'contact@martech-domiciliation.ma',
    timezone: 'Africa/Casablanca',
    language: 'fr',
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    { id: '1', label: 'Notifications par Email', description: 'Recevoir les notifications importantes par email', enabled: true },
    { id: '2', label: 'Alertes d\'expiration', description: 'Alertes quand les contrats approchent de l\'expiration', enabled: true },
    { id: '3', label: 'Notifications de paiement', description: 'Notifications pour les nouveaux paiements', enabled: true },
    { id: '4', label: 'Rapports hebdomadaires', description: 'Recevoir les rapports chaque lundi', enabled: false },
    { id: '5', label: 'Alertes de sécurité', description: 'Alertes pour les activités de sécurité', enabled: true },
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    apiKey: '***************************',
    backupFrequency: 'weekly',
  });

  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleGeneralChange = (field: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (id: string) => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleSecurityChange = (field: string, value: string) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (section: string) => {
    setSavedMessage(`${section} sauvegardée avec succès`);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleRegenerateApiKey = () => {
    setSecuritySettings(prev => ({
      ...prev,
      apiKey: 'sk_' + Math.random().toString(36).substr(2, 30).toUpperCase()
    }));
    setSavedMessage('Clé API régénérée avec succès');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres Système</h1>
        <p className="text-gray-600 mt-2">Gérez la configuration et les préférences de l'application</p>
      </div>

      {/* Toast Notification */}
      {savedMessage && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 z-50 flex items-center gap-2">
          <Save className="h-4 w-4" />
          {savedMessage}
        </div>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Général</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <MailOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Backup</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Généraux</CardTitle>
              <CardDescription>
                Configurez les informations de base de votre système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du Site</Label>
                <Input
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                  placeholder="Nom de votre organisation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteEmail">Email Principal</Label>
                <Input
                  id="siteEmail"
                  type="email"
                  value={generalSettings.siteEmail}
                  onChange={(e) => handleGeneralChange('siteEmail', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau Horaire</Label>
                  <select
                    id="timezone"
                    value={generalSettings.timezone}
                    onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Africa/Casablanca</option>
                    <option>Europe/Paris</option>
                    <option>UTC</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <select
                    id="language"
                    value={generalSettings.language}
                    onChange={(e) => handleGeneralChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="fr">Français</option>
                    <option value="ar">Arabe</option>
                    <option value="en">Anglais</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={() => handleSave('Paramètres généraux')}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de Notification</CardTitle>
              <CardDescription>
                Configurez les notifications que vous souhaitez recevoir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{setting.label}</p>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    onChange={() => handleNotificationToggle(setting.id)}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
                  />
                </div>
              ))}

              <Button
                onClick={() => handleSave('Notifications')}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Paramètres de Sécurité
              </CardTitle>
              <CardDescription>
                Configurez les paramètres de sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="twoFactor">Authentification à Deux Facteurs</Label>
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <input
                    id="twoFactor"
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked.toString())}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Activer 2FA</p>
                    <p className="text-sm text-gray-600">Améliore la sécurité de votre compte</p>
                  </div>
                  {securitySettings.twoFactorAuth && <span className="text-green-600 text-sm font-medium">✓ Activé</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de Session (min)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Expiration Mot de Passe (jours)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Tentatives de Connexion Autorisées</Label>
                <Input
                  id="loginAttempts"
                  type="number"
                  value={securitySettings.loginAttempts}
                  onChange={(e) => handleSecurityChange('loginAttempts', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Clé API</Label>
                <div className="flex gap-2">
                  <Input value={securitySettings.apiKey} readOnly className="bg-gray-100" />
                  <Button
                    onClick={handleRegenerateApiKey}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    Régénérer
                  </Button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Important</p>
                  <p>Ces paramètres affectent la sécurité de votre système. Modifiez-les avec prudence.</p>
                </div>
              </div>

              <Button
                onClick={() => handleSave('Paramètres de sécurité')}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les Changements
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Email</CardTitle>
              <CardDescription>
                Configurez les paramètres d'envoi d'email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">Hôte SMTP</Label>
                <Input
                  id="smtpHost"
                  placeholder="smtp.gmail.com"
                  defaultValue="smtp.gmail.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Port SMTP</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    placeholder="587"
                    defaultValue="587"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpAuth">Authentification</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>Non sécurisé</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderEmail">Email Expéditeur</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  placeholder="noreply@example.com"
                  defaultValue="noreply@martech-domiciliation.ma"
                />
              </div>

              <Button
                onClick={() => handleSave('Paramètres email')}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Sauvegarde</CardTitle>
              <CardDescription>
                Configurez les sauvegardes automatiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Fréquence de Sauvegarde</Label>
                <select
                  id="backupFrequency"
                  value={securitySettings.backupFrequency}
                  onChange={(e) => handleSecurityChange('backupFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <p className="font-medium text-blue-900">Dernière sauvegarde</p>
                <p className="text-sm text-blue-800">23 février 2026 à 03:45</p>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  Télécharger la Sauvegarde
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <span className="font-medium">✓ Sauvegardes automatiques:</span> Activées
                </p>
              </div>

              <Button
                onClick={() => handleSave('Paramètres de sauvegarde')}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
