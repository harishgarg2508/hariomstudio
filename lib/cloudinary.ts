export const uploadImageToCloudinary = async (data: FormData) => {
  const response = await fetch("https://api.cloudinary.com/v1_1/dhmvsvwbt/image/upload", {
    method: "POST",
    body: data,
  })

  return response.json()
}

export const uploadMultipleImagesToCloudinary = async (files: FileList): Promise<any[]> => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "gallery")
    return uploadImageToCloudinary(formData)
  })

  return Promise.all(uploadPromises)
}
