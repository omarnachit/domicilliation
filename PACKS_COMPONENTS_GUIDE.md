# 📦 Composants Packs - Guide d'Utilisation

## 📋 Vue d'ensemble

Vous disposez de **5 composants réutilisables** pour afficher vos packs et services de domiciliation:

### Composants Créés

| Composant | Fichier | Description |
|-----------|---------|-------------|
| **PackCard** | `PackCard.tsx` | Carte individuelle d'un pack avec features |
| **PacksGrid** | `PacksGrid.tsx` | Grille affichant les 4 packs avec bonus |
| **PacksComparison** | `PacksComparison.tsx` | Tableau comparatif détaillé des features |
| **PacksProcess** | `PacksProcess.tsx` | Timeline du processus d'inscription |
| **PacksFAQ** | `PacksFAQ.tsx` | Questions fréquemment posées par catégorie |

---

## 🚀 Utilisation dans votre projet

### Option 1 : Utiliser la page complète `/packs`

La page complète est déjà intégrée avec tous les composants :

```tsx
// Page automatiquement accessible à : /packs
// Contient tous les composants dans l'ordre optimal
```

**Accédez simplement à :** `http://localhost:3000/packs`

---

### Option 2 : Utiliser les composants individuellement

#### Importer dans une page ou composant :

```tsx
// Importer les composants
import { 
  PackCard, 
  PacksGrid, 
  PacksComparison, 
  PacksProcess, 
  PacksFAQ 
} from '@/components/packs';

// Ou importer individuellement :
import { PackCard } from '@/components/packs/PackCard';
import { PacksGrid } from '@/components/packs/PacksGrid';
```

#### Exemple 1 : Afficher la grille de packs

```tsx
export default function MaPage() {
  return (
    <main>
      <h1>Nos Services</h1>
      <PacksGrid />
    </main>
  );
}
```

#### Exemple 2 : Afficher un pack individuel

```tsx
import { PackCard } from '@/components/packs/PackCard';

export default function MaPage() {
  return (
    <PackCard
      title="Adresse Basique"
      description="L'essentiel pour votre présence légale"
      price="2 000 - 4 000"
      features={[
        { name: 'Siège social prestige', included: true },
        { name: 'Réception courrier', included: true },
        { name: 'Notifications SMS/WhatsApp', included: false }
      ]}
      popular={false}
      cta="Démarrer"
    />
  );
}
```

#### Exemple 3 : Tableau comparatif uniquement

```tsx
import { PacksComparison } from '@/components/packs/PacksComparison';

export default function ComparaisonPage() {
  return (
    <div>
      <h1>Comparer nos packs</h1>
      <PacksComparison />
    </div>
  );
}
```

---

## 🎨 Personnalisation

### Props de PackCard

```tsx
interface PackProps {
  title: string;              // Nom du pack
  description: string;        // Description courte
  price: string;             // Prix (ex: "2 000 - 4 000")
  period?: string;           // Période (défaut: "an")
  features: PackFeature[];   // Liste des features
  popular?: boolean;         // Afficher badge "Populaire"
  cta?: string;             // Texte du bouton CTA
  discount?: string;        // Badge réduction optionnel
}

interface PackFeature {
  name: string;      // Nom de la feature
  included: boolean; // Feature incluse ou non
}
```

### Exemple personnalisé :

```tsx
<PackCard
  title="Mon Pack Custom"
  description="Description personnalisée"
  price="3 500"
  period="mois"
  features={[
    { name: 'Feature 1', included: true },
    { name: 'Feature 2', included: true },
    { name: 'Feature 3', included: false }
  ]}
  popular={true}
  cta="Acheter maintenant"
  discount="-20% jusqu'au 31 mars"
/>
```

---

## 📍 Fichiers Créés

```
src/
├── components/
│   └── packs/                    ✅ NOUVEAU DOSSIER
│       ├── index.ts              📤 Export tous les composants
│       ├── PackCard.tsx          📊 Carte pack individuelle
│       ├── PacksGrid.tsx         🎯 Grille des 4 packs
│       ├── PacksComparison.tsx   📋 Tableau comparatif
│       ├── PacksFAQ.tsx          ❓ Questions fréquentes
│       └── PacksProcess.tsx      🔄 Timeline processus
│
└── app/
    └── packs/
        └── page.tsx              ✅ Page /packs complète
```

---

## 🎯 Contenu des Packs

### Pack 1 : Adresse Basique
- **Prix** : 2 000 - 4 000 MAD/an
- **Siège social** prestige à Casablanca/Marrakech/Fès/Rabat
- **Réception & scan** courrier
- **Notifications** email
- **Stockage** courrier 7 jours

### Pack 2 : Adresse + Gestion ⭐
- **Prix** : +2 000 MAD/an (soit 4 000-6 000 total)
- Tout du pack Basique +
- **Réexpédition** mensuelle
- **Notifications illimitées** SMS/WhatsApp/Email
- **Scans illimités**
- **Stockage** courrier 30 jours

### Pack 3 : Création Société
- **Prix** : 5 000 - 10 000 MAD (prestation)
- Adresse + Gestion + 
- **Certificat négatif**
- **Rédaction statuts**
- **Immatriculation** RC/IF/CNSS
- **Obtention ICE**
- **Publication presse**
- **Traitement** 7-14 jours

### Pack 4 : Formalités Complètes
- **Prix** : À la demande
- Modifications statuts
- Transfert de siège
- Cession de parts
- Liquidation société
- Augmentation capital
- Consulting juridique
- Support prioritaire 24/7

### 🎁 Bonus Tous les Packs
- **-25% de réduction** sur salles de réunion
- **-25%** sur bureaux privatifs et partagés

---

## ✨ Styles & Thème

Tous les composants utilisent :
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Palette de couleurs** :
  - Primaire : Indigo (`indigo-600`)
  - Neutre : Zinc
  - Succès : Green
  - Fond : Zinc-50, White

---

## 🔗 Intégration dans le menu

Pour ajouter un lien "Nos Packs" dans la Navbar, modifiez `Navbar.tsx` :

```tsx
<Link href="/packs" className="text-sm font-medium text-zinc-600 hover:text-indigo-600">
  Nos Packs
</Link>
```

---

## 📱 Responsive Design

Tous les composants sont **100% responsive** :
- **Mobile** (375px) : 1 colonne
- **Tablet** (768px) : 2 colonnes
- **Desktop** (1920px) : 4 colonnes (pour grille packs)

---

## 🎨 Scénarios de Personnalisation

### Scénario 1 : Afficher uniquement la grille de packs

```tsx
import { PacksGrid } from '@/components/packs';

export default function MonAccueil() {
  return (
    <section>
      <PacksGrid />
    </section>
  );
}
```

### Scénario 2 : Créer une page dédiée aux packs avancés

```tsx
import { PacksGrid, PacksComparison, PacksFAQ } from '@/components/packs';

export default function PagesAvancee() {
  return (
    <main>
      <PacksGrid />
      <PacksComparison />
      <PacksFAQ />
    </main>
  );
}
```

### Scénario 3 : Intégrer dans une landing page existante

```tsx
// Dans votre page existante (ex: page.tsx)
import { PacksGrid } from '@/components/packs';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <PacksGrid />  {/* Nouveau composant */}
      <Footer />
    </main>
  );
}
```

---

## 🔧 Configuration Avancée

### Modifier les textes des boutons CTA

Accédez à `PacksGrid.tsx` et modifiez la property `cta` dans `PACKS_DATA` :

```tsx
const PACKS_DATA = [
  {
    title: 'Adresse Basique',
    // ...
    cta: 'Démarrer'  // ← Modifier ici
  },
  // ...
];
```

### Modifier les features des packs

Accédez à `PacksGrid.tsx` et modifiez le array `features` de chaque pack.

### Modifier les questions FAQ

Accédez à `PacksFAQ.tsx` et modifiez l'array `FAQ_ITEMS`.

---

## 🎯 Bonne Pratique

### ✅ À faire
- Importer depuis `@/components/packs` pour utiliser l'index
- Utiliser les composants comme React components (`<PacksGrid />`)
- Personnaliser via les props plutôt que modifier le code

### ❌ À ne pas faire
- Modifier directement les fichiers de composants
- Importer les styles Tailwind manuellement (déjà inclus)
- Dupliquer les composants (réutiliser à la place)

---

## 📚 Architecture des Composants

```
PacksPage (Page Next.js)
├── Navbar
├── Hero Section (Manuel)
├── PacksGrid (Affiche tous les packs)
│   ├── PackCard (Pack 1)
│   ├── PackCard (Pack 2)
│   ├── PackCard (Pack 3)
│   └── PackCard (Pack 4)
├── PacksComparison (Tableau détaillé)
│   └── Sections comparatives
├── PacksProcess (Timeline)
│   └── 5 étapes du processus
├── PacksFAQ (Questions)
│   ├── Catégories
│   ├── Questions 1-8
│   └── Contact CTA
└── Footer
```

---

## 🚀 Déploiement

Les composants sont **prêts pour production** :
- ✅ Pas de dépendances externes (utilise Tailwind + Lucide)
- ✅ Optimisés pour performance
- ✅ Responsive et accessible
- ✅ Code TypeScript type-safe
- ✅ Aucune modification requise de fichiers existants

---

## 📞 Fichiers Source

Tous les fichiers sont dans : `src/components/packs/`

Pour ajouter de nouveaux packs ou modifier les existants, modifiez le fichier source correspondant.

**Status** : ✅ Prêt à l'emploi
