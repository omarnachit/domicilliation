"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Users, FileCheck, BellRing, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { JSX } from "react";

const services = [
    {
        icon: Building2,
        title: "Adresse de Prestige",
        description: "Une adresse commerciale stratégique au cœur de Casablanca pour renforcer votre crédibilité.",
    },
    {
        icon: Mail,
        title: "Gestion du Courrier",
        description: "Réception, numérisation et réexpédition de votre courrier. Notifications en temps réel.",
    },
    {
        icon: FileCheck,
        title: "100% Conforme",
        description: "Contrats validés pour la création d'entreprise, conformes à la nouvelle loi sur la domiciliation.",
    },
    {
        icon: BellRing,
        title: "Alertes Intelligentes",
        description: "Ne manquez jamais un courrier important ou une échéance fiscale grâce à nos alertes WhatsApp.",
    },
    {
        icon: Users,
        title: "Espaces de Travail",
        description: "Accès à nos bureaux et salles de réunion pour recevoir vos clients et partenaires.",
    },
    {
        icon: Smartphone,
        title: "Digital Workplace",
        description: "Gérez votre entreprise à distance : factures, contrats, et courrier depuis notre app.",
    },
];

export function Services(): JSX.Element {
    return (
        <section id="services" className="py-24 bg-zinc-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">
                        Une infrastructure complète
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
                        Bien plus qu'une simple adresse. Nous vous offrons tous les outils pour gérer votre entreprise sereinement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 h-full group">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors duration-300">
                                        <service.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <CardTitle className="text-xl text-zinc-900">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-zinc-600 text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
