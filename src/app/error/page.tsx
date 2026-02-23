'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const message = searchParams.get('message')

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="h-10 w-10 text-red-600" />
                </div>

                <h1 className="text-3xl font-bold text-zinc-900">Oups ! Une erreur est survenue</h1>
                <p className="text-zinc-500 mb-8">
                    Nous n'avons pas pu vous connecter à votre compte.
                </p>

                {error && (
                    <Alert variant="destructive" className="text-left bg-white">
                        <AlertTitle>Type d'erreur : {error}</AlertTitle>
                        <AlertDescription>
                            {message || "Veuillez vérifier vos identifiants ou contacter le support."}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex flex-col gap-2 pt-4">
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                        <Link href="/login">Réessayer la connexion</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">Retour à l'accueil</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
