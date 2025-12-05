// TODO: Replace with Firebase Firestore integration
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
// import { db } from './auth'

export interface Medicine {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  manufacturer: string
  imageUrl: string
  prescription: boolean
  dosage: string
  packSize: string
}

// Mock medicine data - TODO: Replace with Firebase data
export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "A 2 RON Injection",
    description: "vial of 2 ml Injection",
    price: 75.0,
    stock: 100,
    category: "injection",
    manufacturer: "PharmaCorp",
    imageUrl: "/medicine-injection-vial.jpg",
    prescription: true,
    dosage: "2ml",
    packSize: "1 vial",
  },
  {
    id: "2",
    name: "A Artivid 150mg Injection",
    description: "vial of 2 ml Injection",
    price: 88.0,
    stock: 100,
    category: "injection",
    manufacturer: "MediLife",
    imageUrl: "/medicine-injection-vial.jpg",
    prescription: true,
    dosage: "150mg/2ml",
    packSize: "1 vial",
  },
  {
    id: "3",
    name: "Paracetamol 500mg",
    description: "Strip of 10 tablets",
    price: 25.0,
    stock: 250,
    category: "tablet",
    manufacturer: "HealthCare Ltd",
    imageUrl: "/medicine-tablets-strip.jpg",
    prescription: false,
    dosage: "500mg",
    packSize: "10 tablets",
  },
  {
    id: "4",
    name: "Amoxicillin 250mg",
    description: "Bottle of 30 capsules",
    price: 120.0,
    stock: 75,
    category: "capsule",
    manufacturer: "BioMed",
    imageUrl: "/medicine-capsules-bottle.jpg",
    prescription: true,
    dosage: "250mg",
    packSize: "30 capsules",
  },
  {
    id: "5",
    name: "Vitamin D3 1000 IU",
    description: "Bottle of 60 tablets",
    price: 180.0,
    stock: 150,
    category: "vitamin",
    manufacturer: "NutriHealth",
    imageUrl: "/vitamin-tablets-bottle.jpg",
    prescription: false,
    dosage: "1000 IU",
    packSize: "60 tablets",
  },
  {
    id: "6",
    name: "Cough Syrup 100ml",
    description: "Bottle of 100ml syrup",
    price: 65.0,
    stock: 80,
    category: "syrup",
    manufacturer: "CureCorp",
    imageUrl: "/medicine-syrup-bottle.jpg",
    prescription: false,
    dosage: "5ml",
    packSize: "100ml bottle",
  },
]

export const getMedicines = async (filters?: {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
}): Promise<Medicine[]> => {
  // TODO: Implement Firebase query
  // const medicinesRef = collection(db, 'medicines')
  // let q = query(medicinesRef, orderBy('name'))

  // if (filters?.category) {
  //   q = query(q, where('category', '==', filters.category))
  // }

  // const snapshot = await getDocs(q)
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medicine))

  // Mock filtering logic
  let filteredMedicines = [...mockMedicines]

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    filteredMedicines = filteredMedicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(searchLower) || medicine.description.toLowerCase().includes(searchLower),
    )
  }

  if (filters?.category) {
    filteredMedicines = filteredMedicines.filter((medicine) => medicine.category === filters.category)
  }

  if (filters?.minPrice !== undefined) {
    filteredMedicines = filteredMedicines.filter((medicine) => medicine.price >= filters.minPrice!)
  }

  if (filters?.maxPrice !== undefined) {
    filteredMedicines = filteredMedicines.filter((medicine) => medicine.price <= filters.maxPrice!)
  }

  return filteredMedicines
}

export const getMedicineById = async (id: string): Promise<Medicine | null> => {
  // TODO: Implement Firebase document query
  // const docRef = doc(db, 'medicines', id)
  // const docSnap = await getDoc(docRef)
  // return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Medicine : null

  return mockMedicines.find((medicine) => medicine.id === id) || null
}
