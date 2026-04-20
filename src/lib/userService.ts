import { supabase } from './supabase/client'
import type { User, Profile } from './supabase'

function sbErr(error: unknown): string {
  if (!error || typeof error !== 'object') return String(error);
  const e = error as Record<string, unknown>;
  return [e.message, e.code, e.details, e.hint].filter(Boolean).join(' | ') || JSON.stringify(error);
}

export const syncUserWithSupabase = async (privyUser: { id: string; wallet?: { address: string } }): Promise<User | null> => {
  console.log('syncUserWithSupabase called with:', privyUser);

  try {
    const existingUser = await getUserByPrivyId(privyUser.id);
    if (existingUser) {
      console.log('User already exists in Supabase:', existingUser);
      return existingUser;
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        privy_id: privyUser.id,
        wallet_address: privyUser.wallet?.address || null
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', sbErr(error));
      throw error;
    }

    console.log('User synced to Supabase:', data);
    return data;
  } catch (error) {
    console.error('Error syncing user with Supabase:', sbErr(error));
    return null;
  }
}

export const saveProfile = async (userId: string, profileData: {
  displayName: string
  username: string
  bio: string
  profileImageUrl?: string
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      user_id: userId,
      display_name: profileData.displayName,
      username: profileData.username,
      bio: profileData.bio,
      profile_image_url: profileData.profileImageUrl
    }, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) throw error
  return data
}

export const saveGridLayout = async (userId: string, gridLayout: string): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id: userId, grid_layout: gridLayout }, { onConflict: 'user_id' })
  if (error) throw error
}

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return data || null
  } catch (error) {
    console.error('Error fetching profile:', sbErr(error))
    return null
  }
}

export const getProfileByUsername = async (username: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return data || null
  } catch (error) {
    console.error('Error fetching profile by username:', sbErr(error))
    return null
  }
}

export const uploadImage = async (file: File, bucket: string = 'profile-images', privyUserId?: string): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const prefix = privyUserId ? privyUserId.replace(/[^a-zA-Z0-9-]/g, '_') : 'public'
  const fileName = `${prefix}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName)
  return publicUrl
}

export const getUserByPrivyId = async (privyId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('privy_id', privyId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return data || null
  } catch (error) {
    console.error('Error fetching user by Privy ID:', sbErr(error))
    return null
  }
}
