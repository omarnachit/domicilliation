# 🎯 Référence Rapide - Composants Packs

## 📦 Composants Disponibles

### 1️⃣ PackCard
**Affiche une carte de pack individuelle**
```tsx
import { PackCard } from '@/components/packs/PackCard';

<PackCard
  title="Adresse Basique"
  description="Description du pack"
  price="2 000 - 4 000"
  features={[...]}
  popular={false}
/>
```

### 2️⃣ PacksGrid
**Affiche la grille complète des 4 packs + bonus**
```tsx
import { PacksGrid } from '@/components/packs/PacksGrid';

<PacksGrid />
```

### 3️⃣ PacksComparison
**Tableau comparatif détaillé par catégorie**
```tsx
import { PacksComparison } from '@/components/packs/PacksComparison';

<PacksComparison />
```

### 4️⃣ PacksProcess
**Timeline : comment ça fonctionne (5 étapes)**
```tsx
import { PacksProcess } from '@/components/packs/PacksProcess';

<PacksProcess />
```

### 5️⃣ PacksFAQ
**Questions fréquentes par catégorie**
```tsx
import { PacksFAQ } from '@/components/packs/PacksFAQ';

<PacksFAQ />
```

---

## 🎨 Contenu des Packs

```
┌─────────────────────────────────────────────────────────┐
│ Adresse Basique          Adresse + Gestion ⭐
│ 2-4K MAD/an              +2K MAD/an
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      
│ • Siège social           • Réexpédition mensuelle
│ • Scan courrier          • SMS/WhatsApp illimité
│ • Email notifications    • Scans illimités
│ • Stockage 7j            • Stockage 30j
│
│ Création Société         Formalités Complètes
│ 5-10K MAD (prestation)   À la demande
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ • Certificat négatif     • Modifications statuts
│ • Statuts + RC/IF/CNSS   • Transfert siège
│ • ICE                    • Cession parts
│ • 7-14 jours             • Support 24/7
│
│ 🎁 TOUS LES PACKS : -25% salles & bureaux
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Structure Créée

```
src/components/packs/
├── index.ts                  // Export des composants
├── PackCard.tsx              // Carte pack
├── PacksGrid.tsx             // Grille 4 packs
├── PacksComparison.tsx       // Tableau comparatif
├── PacksFAQ.tsx              // Q&A
└── PacksProcess.tsx          // Timeline

src/app/packs/
└── page.tsx                  // Page /packs complète
```

---

## 🚀 Utilisation Rapide

### Page Complète
```tsx
// Accessible à : http://localhost:3000/packs
import PacksPage from '@/app/packs/page';
```

### Dans votre page
```tsx
import { PacksGrid, PacksComparison } from '@/components/packs';

export default function Home() {
  return (
    <>
      <PacksGrid />
      <PacksComparison />
    </>
  );
}
```

### Importer tout d'une fois
```tsx
import * as Packs from '@/components/packs';

<Packs.PacksGrid />
<Packs.PacksComparison />
```

---

## 🎯 Cas d'Usage

| Besoin | Composant |
|--------|-----------|
| Afficher 4 packs | `<PacksGrid />` |
| Comparer les packs | `<PacksComparison />` |
| FAQ du client | `<PacksFAQ />` |
| Montrer processus | `<PacksProcess />` |
| Pack unique custom | `<PackCard />` |
| Tout ensemble | Page `/packs` |

---

## 📝 Propriétés PackCard

```typescript
interface PackProps {
  title: string;              // "Adresse Basique"
  description: string;        // "Description..."
  price: string;             // "2 000 - 4 000"
  period?: string;           // "an" (défaut)
  features: Array<{          // Liste des features
    name: string;
    included: boolean;
  }>;
  popular?: boolean;         // true = badge "Populaire"
  cta?: string;             // "Démarrer" (défaut)
  discount?: string;        // "-25% salles & bureaux"
}
```

---

## ✨ Features Clés

✅ Responsive (mobile, tablet, desktop)
✅ Tous les packs inclus (4 packs)
✅ Tableau comparatif complet
✅ Timeline visuelle
✅ FAQ avec accordéon
✅ Bonus -25% mis en avant
✅ TypeScript type-safe
✅ Tailwind CSS
✅ Lucide icons
✅ Aucune dépendance externe

---

## 🔗 Liens Rapides

- **Page complète** : `/packs`
- **Composants** : `/src/components/packs/`
- **Guide détaillé** : `PACKS_COMPONENTS_GUIDE.md`
- **Fichier config** : `package.json` (aucun changement)

---

## 💡 Conseil

Utilisez `<PacksGrid />` comme point d'entrée. C'est le composant principal qui regroupe :
- Titre & description
- 4 cartes de packs
- Badge bonus -25%
- Section contact CTA

---

**Créé le** : 13 février 2026
**Status** : ✅ Prêt à l'emploi
**Modifications nécessaires** : AUCUNE sur fichiers existants
