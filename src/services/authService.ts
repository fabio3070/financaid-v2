export const logIn = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })

  if (error) throw error
  return user
} 