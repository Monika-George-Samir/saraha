import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.resolve(`./.env.${process.env.NODE_ENV}`)})

const port = process.env.port
const databaseURI = process.env.DATABASE_URI
const salt = process.env.SALT_ROUNDS
const mood = process.env.MOOD

export const env = {
    port,
    databaseURI,
    salt,
    mood
}