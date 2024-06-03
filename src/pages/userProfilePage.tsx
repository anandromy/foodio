import { useCurrentUser, useUpdateMyUser } from "@/api/myUserApi"
import { UserProfileForm } from "@/forms/user-profile-form/userProfileForm"

export const UserProfilePage = () => {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()
    const { currentUser, isLoading: isGetLoading } = useCurrentUser()
    if(isGetLoading){
        return(
            <span>Loading...</span>
        )
    }
    if(!currentUser){
        return(
            <span>Unable to load user profile</span>
        )
    }
    return(
        <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} currentUser={currentUser} />
    )
}