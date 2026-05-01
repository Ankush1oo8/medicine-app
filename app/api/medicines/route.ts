import { NextRequest, NextResponse } from 'next/server'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  documentId
} from 'firebase/firestore'
import { firebaseClientApp } from '@/lib/firebase/client'
import { Product } from '@/lib/firebase/models'

const db = getFirestore(firebaseClientApp)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const limitParam = searchParams.get('limit')
    const lastDocId = searchParams.get('lastDocId')
    const field = searchParams.get('field') || 'Name'
    const ascending = searchParams.get('ascending') !== 'false'

    const limitNum = limitParam ? parseInt(limitParam, 10) : 10

    let lastDocSnap = null

    // 🔹 Convert lastDocId → DocumentSnapshot (for pagination)
    if (lastDocId) {
      const docRef = doc(db, 'management', lastDocId)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        lastDocSnap = snap
      }
    }

    let products: any[] = []

    // 🔹 Step 1: Fetch promoted (ONLY when first page)
    if (!lastDocSnap) {
      const promotedQuery = query(
        collection(db, 'management'),
        where('type', '==', 'feature'),
        where('stock', '>', 0),
        where('promotion', '>', -1),
        orderBy('promotion', 'asc'),
                orderBy('stock'),

        orderBy(documentId())
      )

      const promotedSnap = await getDocs(promotedQuery)

      const promotedProducts = promotedSnap.docs.map((doc) => {
        const p = Product.fromMap(doc.data(), doc.id).toJSON()
        return {
          ...p,
          lastDocId: doc.id
        }
      })

      products.push(...promotedProducts)
    }

    // 🔹 Step 2: Remaining limit
    const remainingLimit = limitNum - products.length

    if (remainingLimit > 0) {
      let nonPromotedQuery = query(
        collection(db, 'management'),
        where('type', '==', 'feature'),
        where('stock', '>', 0),

                orderBy('stock'),

        orderBy(documentId()),
        limit(remainingLimit)
      )

      // 🔹 Pagination
      if (lastDocSnap) {
        nonPromotedQuery = query(
          nonPromotedQuery,
          startAfter(lastDocSnap)
        )
      }

      const nonPromotedSnap = await getDocs(nonPromotedQuery)

      const otherProducts = nonPromotedSnap.docs.map((doc) => {
        const p = Product.fromMap(doc.data(), doc.id).toJSON()
        return {
          ...p,
          lastDocId: doc.id // 👈 send for next pagination
        }
      })

      products.push(...otherProducts)
    }

    return NextResponse.json({
      data: products,
    lastDocId: products.length
      ? products[products.length - 1].lastDocId || products[products.length - 1].id
      : null
    })

  } catch (error) {
    console.error('Error fetching medicines:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}