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
            <CardTitle className="text-2xl text-zinc-900">
              Connexion
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Accédez à votre espace client sécurisé.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="contact@entreprise.ma"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>

              {/* Submit */}
              <Button
                formAction={login}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Se connecter
              </Button>

              {/* Register link */}
              <p className="text-xs text-center text-zinc-500 mt-4">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Créer un compte
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}