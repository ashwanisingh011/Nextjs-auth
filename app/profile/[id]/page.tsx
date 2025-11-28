export default async function UserProfile({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <div>
            <h1>User Profile</h1>
            <p className="text-4xl">Welcome to your profile page!
                <span className="p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
            </p>
        </div>
    )
}