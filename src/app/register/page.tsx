import { signup } from '@/app/login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white border-zinc-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-zinc-900">Créer un compte</CardTitle>
                        <CardDescription className="text-zinc-500">
                            Commencez votre domiciliation en quelques clics.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-zinc-700">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="bg-white border-zinc-300 text-zinc-900 focus-visible:ring-indigo-600"
                                    placeholder="contact@votre-entreprise.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-zinc-700">Mot de passe</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-white border-zinc-300 text-zinc-900 focus-visible:ring-indigo-600 placeholder:text-zinc-400"
                                    placeholder="Minimum 8 caractères"
                                />
                            </div>
                            <Button formAction={signup} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                                Créer mon compte
                            </Button>
                            <p className="text-xs text-center text-zinc-500 mt-4">
                                Déjà un compte ? <Link href="/login" className="text-indigo-600 hover:underline font-medium">Se connecter</Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
