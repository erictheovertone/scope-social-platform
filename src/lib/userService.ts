import { supabase } from './supabase'
import type { User, Profile } from './supabase'

// Sync Privy user with Supabase
export const syncUserWithSupabase = async (privyUser: { id: string; wallet?: { address: string } }): Promise<User | null> => {
  console.log('syncUserWithSupabase called with:', privyUser);
  
  try {
    // Check if user already exists
    console.log('Checking if user exists with Privy ID:', privyUser.id);
    const existingUser = await getUserByPrivyId(privyUser.id);
    if (existingUser) {
      console.log('User already exists in Supabase:', existingUser);
      return existingUser;
    }

    console.log('Creating new user in Supabase...');
    // Create new user using service role
    const { data, error } = await supabase
      .from('users')
      .insert({
        privy_id: privyUser.id,
        wallet_address: privyUser.wallet?.address || null
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    console.log('User synced to Supabase:', data);
    return data;
  } catch (error) {
    console.error('Error syncing user with Supabase:', error);
    return null;
  }
}

// Save profile data to Supabase
export const saveProfile = async (userId: string, profileData: {
  displayName: string
  username: string
  bio: string
  profileImageUrl?: string
}) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: userId,
        display_name: profileData.displayName,
        username: profileData.username,
        bio: profileData.bio,
        profile_image_url: profileData.profileImageUrl
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving profile:', error)
    throw error
  }
}

// Get profile by user ID
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
    console.error('Error fetching profile:', error)
    return null
  }
}

// Get profile by username
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
    console.error('Error fetching profile by username:', error)
    return null
  }
}

// Upload image to Supabase Storage
export const uploadImage = async (file: File, bucket: string = 'profile-images'): Promise<string | null> => {
  try {
    // Get current user to create user-specific folder
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.error('No authenticated user for image upload')
      return null
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

// Get user by Privy ID
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
    console.error('Error fetching user by Privy ID:', error)
    return null
  }
}
