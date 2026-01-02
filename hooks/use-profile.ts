import { useState, useEffect } from 'react'
import type { UserProfileData } from '@/lib/firebase/models'

export function useProfile(phone: string | null) {
  const [profile, setProfile] = useState<UserProfileData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!phone) {
      setProfile(null)
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/profile/${encodeURIComponent(phone)}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`)
        }
        const data = await response.json()
        setProfile(data)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [phone])

  return { profile, loading, error }
}