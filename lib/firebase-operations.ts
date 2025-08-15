import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type { MediaItem, Tag, FilterOptions } from "./types"

// Media operations
export const addMediaItem = async (mediaData: Omit<MediaItem, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "media"), {
      ...mediaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding media item:", error)
    throw error
  }
}

export const getMediaItems = async (filters?: FilterOptions): Promise<MediaItem[]> => {
  try {
    let q = query(collection(db, "media"))

    // Apply filters
    if (filters?.mediaType && filters.mediaType !== "all") {
      q = query(q, where("type", "==", filters.mediaType))
    }

    if (filters?.tags && filters.tags.length > 0) {
      q = query(q, where("tags", "array-contains-any", filters.tags))
    }

    // Apply sorting
    const sortField = filters?.sortBy === "title" ? "title" : "createdAt"
    const sortDirection = filters?.sortBy === "oldest" ? "asc" : "desc"
    q = query(q, orderBy(sortField, sortDirection))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
      updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
    })) as MediaItem[]
  } catch (error) {
    console.error("Error getting media items:", error)
    throw error
  }
}

// Tag operations
export const addTag = async (tagName: string) => {
  try {
    const docRef = await addDoc(collection(db, "tags"), {
      name: tagName,
      count: 1,
      createdAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding tag:", error)
    throw error
  }
}

export const getTags = async (): Promise<Tag[]> => {
  try {
    const q = query(collection(db, "tags"), orderBy("name"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
    })) as Tag[]
  } catch (error) {
    console.error("Error getting tags:", error)
    throw error
  }
}

export const updateTagCount = async (tagName: string, increment = 1) => {
  try {
    const q = query(collection(db, "tags"), where("name", "==", tagName))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const tagDoc = querySnapshot.docs[0]
      const currentCount = tagDoc.data().count || 0
      await updateDoc(doc(db, "tags", tagDoc.id), {
        count: currentCount + increment,
      })
    } else {
      // Create new tag if it doesn't exist
      await addTag(tagName)
    }
  } catch (error) {
    console.error("Error updating tag count:", error)
    throw error
  }
}
