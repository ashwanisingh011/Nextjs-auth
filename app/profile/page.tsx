"use client"
import axios from 'axios'
import Link from "next/link"
import {useState} from "react"
import {useRouter} from "next/navigation"
export default function ProfilePage() {
    const router = useRouter()
    const[data, setData] = useState(null)
    async function logout() {
        try {
            await axios.get('/logout')
            router.push('/login')
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error)
            console.log(message)
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return (
        <div>
            <h1>User Profile</h1>
            <p>Welcome to your profile page!</p>
            <h2 className='p-1 rounded bg-green-500'>{data === 'nothing'? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
            <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                GetUserDetails
            </button>
        </div>
    )
}