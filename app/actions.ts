// 'use server'

// import { put } from '@vercel/blob'
// import { revalidatePath } from 'next/cache'

// const UPLOAD_PASSWORD = "hariom"
// const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

// export async function uploadFile(formData: FormData) {
//   const file = formData.get('file') as File
//   const title = formData.get('title') as string
//   const description = formData.get('description') as string
//   const category = formData.get('category') as string
//   const password = formData.get('password') as string
//   const type = formData.get('type') as 'image' | 'video'

//   if (password !== UPLOAD_PASSWORD) {
//     return { success: false, message: 'Invalid password' }
//   }

//   if (!file || !title || !description || !category || !type) {
//     return { success: false, message: 'Missing required fields' }
//   }

//   try {
//     const blob = await put(file.name, file, {
//       access: 'public',
//       token: BLOB_READ_WRITE_TOKEN,
//     })

//     const newItem = {
//       url: blob.url,
//       title,
//       description,
//       category,
//       type,
//     }

//     const response = await fetch('/api/gallery', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newItem),
//     })

//     if (!response.ok) {
//       throw new Error('Failed to save item to gallery')
//     }

//     revalidatePath('/gallery')

//     return { success: true, url: blob.url, type }
//   } catch (error) {
//     console.error('Upload error:', error)
//     return { success: false, message: 'Upload failed' }
//   }
// }

