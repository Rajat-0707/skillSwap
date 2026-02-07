import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

function getEnv(name: string): string {
    const value = process.env[name]
    if (!value) throw new Error(`Missing environment variable: ${name}`)
    return value
}

const MONGO_URI = getEnv("MONGO_URI")

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}

export default connectDB
