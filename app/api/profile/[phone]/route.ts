import { NextRequest, NextResponse } from 'next/server'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { firebaseClientApp } from '@/lib/firebase/client'
import { UserProfile } from '@/lib/firebase/models'

const db = getFirestore(firebaseClientApp)

export async function GET(
  request: NextRequest,
  { params }: { params: { phone: string } }
) {
  try {
    const phone = params.phone

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Query clients collection where phone field matches
    const clientsQuery = query(collection(db, 'clients'), where('phone', '==', phone))
    const querySnapshot = await getDocs(clientsQuery)

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Assuming only one document per phone
    const doc = querySnapshot.docs[0]
    const profileData = doc.data()
    const profile = UserProfile.fromMap(profileData, phone)

    return NextResponse.json(profile.toMap())
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}