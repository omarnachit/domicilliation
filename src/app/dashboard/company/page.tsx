"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const companySchema = z.object({
    name: z.string().min(2, "Le nom de la société est requis"),
    legal_form: z.string().min(1, "Forme juridique requise"),
    rc_number: z.string().optional(),
    ice_number: z.string().min(1, "Numéro ICE requis (ou 'En cours')"),
    tax_id: z.string().optional(),
    address: z.string().min(5, "Adresse actuelle requise (ou adresse du gérant)"),
});

export default function CompanyPage(): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            legal_form: "SARL",
            rc_number: "",
            ice_number: "",
            tax_id: "",
            address: "",
        },
    });

    async function onSubmit(values: z.infer<typeof companySchema>) {
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setIsLoading(false);
            return;
        }

        // 1. Get Client ID
        const { data: client, error: clientError } = await supabase
            .from('clients')
            .select('id')
            .eq('user_id', user.id)
            .single();

        let clientId = client?.id;

        // Create client if not exists (first time setup)
        if (!clientId) {
            const { data: newClient, error: createError } = await supabase
                .from('clients')
                .insert([{
                    user_id: user.id,
                    email: user.email,
                    full_name: "Gérant (À compléter)" // Placeholder
                }])
                .select('id')
                .single();

            if (createError) {
                console.error(createError);
                setIsLoading(false);
                return;
            }
            clientId = newClient.id;
        }

        // 2. Insert Company
        const { error: companyError } = await supabase
            .from('companies')
            .insert([{
                client_id: clientId,
                name: values.name,
                rc_number: values.rc_number,
                ice_number: values.ice_number,
                tax_id: values.tax_id,
                legal_address: values.address,
                is_active: false // Pending validation
            }]);

        if (companyError) {
            console.error(companyError);
        } else {
            router.refresh();
            router.push('/dashboard/contracts'); // Next step
        }

        setIsLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900">Informations de la Société</h1>
                <p className="text-zinc-500">
                    Ces informations figureront sur votre contrat de domiciliation.
                </p>
            </div>

            <Card className="border-zinc-200 shadow-sm bg-white">
                <CardHeader>
                    <CardTitle>Détails de l'entreprise</CardTitle>
                    <CardDescription>
                        Si votre société est en cours de création, indiquez "En cours" pour les numéros non attribués.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dénomination Sociale</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: MARTECH SOLUTIONS" {...field} className="bg-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="legal_form"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Forme Juridique</FormLabel>
                                            <FormControl>
                                                <Input placeholder="SARL, SARL AU, SA..." {...field} className="bg-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="ice_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Numéro ICE</FormLabel>
                                            <FormControl>
                                                <Input placeholder="001234567890000" {...field} className="bg-white" />
                                            </FormControl>
                                            <FormDescription className="text-xs">Ou "En cours"</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rc_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>N° RC (Registre Commerce)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12345" {...field} className="bg-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tax_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Identifiant Fiscal</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12345678" {...field} className="bg-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adresse Actuelle (Gérant)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Adresse personnelle du gérant si création" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[150px]">
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enregistrer et Continuer"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
