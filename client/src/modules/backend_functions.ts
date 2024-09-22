import { User } from "firebase/auth";
import { UserData } from "server/src/middleware/auth";
import { auth } from "./firebase";
import { Chat } from "server/src/routers/chats";

function getStartingPoint()
{
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        return "http://localhost:8080"
    else 
        return "https://motivibe.live"
}

async function getProfile(user: User): Promise<UserData | null>
{
    const starting_point = getStartingPoint();

    const response = await fetch(`${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`)
    if (!response.ok)
    {
        return null
    }
    const json = await (response.json())
    console.log("profile", json)
    return json
}

async function setProfileBio(user: User, new_bio: string) {
    const starting_point = getStartingPoint();
    const url = `${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "bio": new_bio
        })
    })
}

async function getChat(chat_id?: string): Promise<Chat | null>
{
    if (!chat_id || !auth.currentUser)
        return null

    const starting_point = getStartingPoint();
    const response = await fetch(`${starting_point}/chats/${chat_id}?id_token=${encodeURIComponent(await auth.currentUser.getIdToken(true))}`)
    if (!response.ok)
        return null

    const json = await (response.json())
    return json
}

export { getProfile, setProfileBio, getStartingPoint, getChat }
