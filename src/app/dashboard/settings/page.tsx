"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Loader2, Building2, ShieldCheck, BellRing, UserCircle2 } from "lucide-react";
import { JSX } from "react";

type SettingsState = {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  rc: string;
  ice: string;
  legalAddress: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  notifMail: boolean;
  notifSms: boolean;
  notifWhatsapp: boolean;
};

export default function SettingsPage(): JSX.Element {
  const [savedSection, setSavedSection] = useState<"profile" | "company" | null>(null);
  const [savingSection, setSavingSection] = useState<"profile" | "company" | null>(null);
  const [settings, setSettings] = useState<SettingsState>({
    fullName: "Gerant",
    email: "client@exemple.com",
    phone: "+212600000000",
    companyName: "Ma Societe",
    rc: "",
    ice: "",
    legalAddress: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifMail: true,
    notifSms: false,
    notifWhatsapp: true,
  });

  const updateField = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSavedSection(null);
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (section: "profile" | "company") => {
    setSavingSection(section);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSavingSection(null);
    setSavedSection(section);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Parametres du compte</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Profil, entreprise, notifications et securite.
        </p>
      </div>

      {savedSection && (
        <Alert className="border-green-200 bg-green-50 text-green-900">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Mise a jour enregistree</AlertTitle>
          <AlertDescription>
            La section {savedSection === "profile" ? "Profil" : "Entreprise"} a ete sauvegardee.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-900">
            <UserCircle2 className="h-5 w-5 text-indigo-600" />
            Profil
          </CardTitle>
          <CardDescription>Informations de base visibles sur votre espace client.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              value={settings.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Telephone</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button
              onClick={() => handleSave("profile")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]"
            >
              {savingSection === "profile" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                "Sauvegarder"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-900">
            <Building2 className="h-5 w-5 text-indigo-600" />
            Entreprise
          </CardTitle>
          <CardDescription>Informations legales de votre societe.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de la societe</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rc">RC</Label>
            <Input id="rc" value={settings.rc} onChange={(e) => updateField("rc", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ice">ICE</Label>
            <Input id="ice" value={settings.ice} onChange={(e) => updateField("ice", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="legalAddress">Adresse legale</Label>
            <Input
              id="legalAddress"
              value={settings.legalAddress}
              onChange={(e) => updateField("legalAddress", e.target.value)}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button
              onClick={() => handleSave("company")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]"
            >
              {savingSection === "company" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                "Sauvegarder"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-900">
            <BellRing className="h-5 w-5 text-indigo-600" />
            Notifications
          </CardTitle>
          <CardDescription>Choisissez vos canaux de reception.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <label className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2">
            <span className="text-sm text-zinc-700">Courrier recu</span>
            <input
              type="checkbox"
              checked={settings.notifMail}
              onChange={(e) => updateField("notifMail", e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2">
            <span className="text-sm text-zinc-700">Alertes SMS</span>
            <input
              type="checkbox"
              checked={settings.notifSms}
              onChange={(e) => updateField("notifSms", e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2">
            <span className="text-sm text-zinc-700">Notifications WhatsApp</span>
            <input
              type="checkbox"
              checked={settings.notifWhatsapp}
              onChange={(e) => updateField("notifWhatsapp", e.target.checked)}
            />
          </label>
        </CardContent>
      </Card>

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-900">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            Securite
          </CardTitle>
          <CardDescription>Modifiez votre mot de passe.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <Input
              id="currentPassword"
              type="password"
              value={settings.currentPassword}
              onChange={(e) => updateField("currentPassword", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              id="newPassword"
              type="password"
              value={settings.newPassword}
              onChange={(e) => updateField("newPassword", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={settings.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-100">
          Changer mot de passe
        </Button>
      </div>
    </div>
  );
}
