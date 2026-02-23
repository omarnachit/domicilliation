import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

// Fallback data if DB is empty or connection fails
const defaultPlans = [
    {
        id: "1",
        name: "Essentiel",
        price: 150,
        description: "Pour démarrer votre activité en toute légalité.",
        features: ["Siège social", "Contrat 12 mois", "Réception courrier"],
        is_featured: false
    },
    {
        id: "2",
        name: "Adresse Basique",
        price: 2500,
        description: "Siège social prestige avec accès numérique basique",
        features: ["Siège social prestige", "Scans quotidiens", "Accès portail 24/7", "Stockage sécurisé 30j", "Notifications Email"],
        is_featured: false
    },
    {
        id: "3",
        name: "Adresse + Gestion",
        price: 4500,
        description: "Portail client complet avec gestion intelligente du courrier",
        features: ["Siège social", "Tri automatique par catégorie", "Historique infini", "OCR & Recherche full-text", "SMS/WhatsApp", "Réexpédition incluse", "Accès physique 6j/7", "Support prioritaire"],
        is_featured: true
    },
    {
        id: "4",
        name: "Création Société",
        price: 7500,
        description: "Services de création + gestion administrative",
        features: ["Adresse + Gestion inclus", "Certificat négatif", "Immatriculation RC/IF/CNSS/ICE", "Publication BO", "Traitement 7-14j", "Déclarations TVA/IR", "Support prioritaire"],
        is_featured: false
    }
];

export async function Pricing(): Promise<JSX.Element> {
    const supabase = await createClient();
    const { data: plans } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

    const displayPlans = plans?.length ? plans : defaultPlans;

    return (
        <section id="pricing" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-50 to-transparent -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">
                        Tarifs clairs et transparents
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
                        Choisissez le pack qui correspond à vos besoins.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {displayPlans.map((plan: any, index: number) => (
                        <div
                            key={plan.id}
                            className={`relative ${plan.is_featured ? 'md:-mt-4' : ''}`}
                        >
                            {plan.is_featured && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-200">
                                        Recommandé
                                    </span>
                                </div>
                            )}

                            <Card className={`flex flex-col h-full transition-all duration-300 ${plan.is_featured
                                    ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100 scale-105 z-10'
                                    : 'bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300'
                                }`}>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-zinc-900">{plan.name}</CardTitle>
                                    <div className="mt-4 flex items-baseline text-zinc-900">
                                        <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                                        <span className="text-xl font-semibold text-zinc-500 ml-1">DH</span>
                                        <span className="text-zinc-500 ml-1">/mois</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 mt-2">{plan.description}</p>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-4 mt-4">
                                        {Array.isArray(plan.features) && plan.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className={`w-5 h-5 shrink-0 ${plan.is_featured ? 'text-indigo-600' : 'text-zinc-400'}`} />
                                                <span className="text-zinc-700 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        asChild
                                        className={`w-full h-12 text-base shadow-sm ${plan.is_featured
                                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                                                : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50'
                                            }`}
                                    >
                                        <Link href={`/register?plan=${plan.id}`}>Choisir ce pack</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
