import { NextRequest, NextResponse } from 'next/server'
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { firebaseClientApp } from '@/lib/firebase/client'
import { OrderDetail, OrderDetailData } from '@/lib/firebase/models'

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

    // Query orders collection where client or userNumber field matches
    const clientQuery = query(
      collection(db, "orders"),
      where("client", "==", phone)
    )
    const userNumberQuery = query(
      collection(db, "orders"),
      where("userNumber", "==", phone)
    )

    const [clientSnapshot, userNumberSnapshot] = await Promise.all([
      getDocs(clientQuery),
      getDocs(userNumberQuery)
    ])

    const allDocs = [...clientSnapshot.docs, ...userNumberSnapshot.docs]
    const uniqueDocs = allDocs.filter((doc, index, self) =>
      index === self.findIndex(d => d.id === doc.id)
    )

    const orders = uniqueDocs.map(doc => {
      const orderData = doc.data()
      const order = OrderDetail.fromMap(orderData, doc.id)
      return order.toJSON()
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
