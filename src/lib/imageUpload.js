import { join } from "path"
import { writeFile } from "fs"
import { NextResponse } from "next/server"


export async function ImageUpload (file) {
    const SIZE = 5 * 1024 * 1024 // 5MB

    if (!file) {
        return NextResponse.json("Image required", {status: 400})
    }

    if(file.size > SIZE) {
        return NextResponse.json("Image to large", {status: 400})
    }

    if(file.type.split("/")[0] != "image") {
        return NextResponse.json("Invalid image", {status: 400})

    }

    const buffer = await file.arrayBuffer()    

    const filename = Date.now() + "." + file.type.split("/")[1]
    
    const path = join('./public', 'upload', filename)    

    writeFile(path, Buffer.from(buffer), (err) => {
        if(err) {
            return NextResponse.json("Failed upload", {status: 500})
        }
    })    
    
    return filename
}