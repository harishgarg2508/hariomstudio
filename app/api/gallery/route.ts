import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'app/api/gallery/galleryData.json')

function readGalleryData() {
  if (!fs.existsSync(dataFilePath)) {
    return []
  }
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(fileContents)
}

function writeGalleryData(data: any[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

export async function GET() {
  const galleryData = readGalleryData()
  return NextResponse.json(galleryData)
}

export async function POST(request: Request) {
  const newItem = await request.json()
  const galleryData = readGalleryData()
  newItem.id = galleryData.length + 1
  galleryData.push(newItem)
  writeGalleryData(galleryData)
  return NextResponse.json(newItem)
}

