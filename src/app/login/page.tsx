import { login } from '@/app/login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white border-zinc-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-zinc-900">Connexion</CardTitle>
                        <CardDescription className="text-zinc-500">
                            Accédez à votre espace client sécurisé.
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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-zinc-700">Mot de passe</Label>
                                    <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-700">Oublié ?</Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-white border-zinc-300 text-zinc-900 focus-visible:ring-indigo-600"
                                />
                            </div>
                            <Button formAction={login} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Se connecter
                            </Button>
                            <p className="text-xs text-center text-zinc-500 mt-4">
                                Pas encore de compte ? <Link href="/register" className="text-indigo-600 hover:underline font-medium">Créer un compte</Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
