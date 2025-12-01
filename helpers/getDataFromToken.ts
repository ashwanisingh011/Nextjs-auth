import {NextRequest} from "next/server"
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        throw new Error(message)
    }
}