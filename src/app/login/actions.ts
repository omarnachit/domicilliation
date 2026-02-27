'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * LOGIN
 */
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/error?message=Email and password required')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    console.error('Login error:', error)
    redirect('/error?message=Invalid credentials')
  }

  // 🔎 Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', data.user.id)
    .single()

  if (profileError || !profile) {
    redirect('/error?message=Profile not found')
  }

  // 🚫 Block suspended accounts
  if (profile.status === 'suspended') {
    await supabase.auth.signOut()
    redirect('/error?message=Account suspended')
  }

  revalidatePath('/', 'layout')

  // 🎯 Redirect by role
  if (profile.role === 'admin') {
    redirect('/admin/dashboard')
  }

  if (profile.role === 'staff') {
    redirect('/staff/dashboard')
  }

  redirect('/dashboard')
}

/**
 * SIGNUP
 */
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  if (!email || !password) {
    redirect('/error?message=Email and password required')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error || !data.user) {
    redirect('/error?message=Signup failed')
  }

  // ✅ Create profile with default role = client
  await supabase.from('profiles').insert({
    id: data.user.id,
    full_name: fullName || '',
    role: 'client',
    status: 'active',
  })

  revalidatePath('/', 'layout')

  redirect('/dashboard')
}

/**
 * LOGOUT
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}