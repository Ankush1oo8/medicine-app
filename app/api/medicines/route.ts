import { NextRequest, NextResponse } from 'next/server'
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore'
import { firebaseClientApp } from '@/lib/firebase/client'
import { Product } from '@/lib/firebase/models'

const db = getFirestore(firebaseClientApp)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limitNum = limitParam ? parseInt(limitParam, 10) : 60

    // ✅ Fetch only products with stock > 0
    const managementQuery = query(
      collection(db, 'management'),
      where('stock', '>', 0),
      limit(limitNum)
    )

    const managementSnapshot = await getDocs(managementQuery)

    const products = managementSnapshot.docs.map((doc) =>
      Product.fromMap(doc.data(), doc.id).toJSON()
    )

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching medicines:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
