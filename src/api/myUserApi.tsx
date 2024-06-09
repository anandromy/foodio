import { User } from "@/types/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const api_base_url = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string
    email: string
}

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently()
        const res = await fetch(`${api_base_url}/api/my/user`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if(!res.ok){
            throw new Error("Failed to create user")
        }
    }

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest)
    return { createUser, isLoading, isError, isSuccess }
}
type updateMyUser = {
    name: string,
    addressLine1: string,
    city: string,
    country: string
}
export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const updateUserRequest = async(formData: updateMyUser) => {
        const accessToken = await getAccessTokenSilently()
        const res = await fetch(`${api_base_url}/api/my/user`, {
            method:  "PUT",
            headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData)
        })

        if(!res.ok){
            throw new Error("Failed to update user")
        }
    }

    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateUserRequest)
    if(isSuccess){
        toast.success("User profile updated")
    }
    if(error){
        toast.error(error.toString())
        reset();
    }
    return { updateUser, isLoading }
}

export const useCurrentUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getCurrentUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${api_base_url}/api/my/user`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        if(!response.ok){
            throw new Error("Failed to fetch user")
        }
        return response.json()
    }
    const { data: currentUser, error, isLoading } = useQuery("fetchCurrentUser", getCurrentUserRequest)
    if(error){
        toast.error(error.toString())
    }
    
    return { currentUser, isLoading }
    
}