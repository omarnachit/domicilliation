'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Handles user login using email and password via Supabase.
 * Redirects to dashboard on success, or to an error page with details on failure.
 * @param formData - The form data containing 'email' and 'password'.
 */
export async function login(formData: FormData) {
    const supabase = await createClient()

    // Type-casting here for convenience
    // In a real app, you might want to use Zod to validate the email and password
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error)
        redirect(`/error?error=${encodeURIComponent(error.name)}&message=${encodeURIComponent(error.message)}`)
    }

    console.log('Login success for user:', user?.email)
    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

/**
 * Handles user signup using email and password via Supabase.
 * Redirects to dashboard on success, or to an error page on failure.
 * @param formData - The form data containing 'email' and 'password'.
 */
export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

/**
 * Signs out the current user and redirects to the login page.
 */
export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
