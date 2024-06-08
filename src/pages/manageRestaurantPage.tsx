import { useCreateMyRestaurant } from "@/api/myRestaurantApi"
import { ManageRestaurantForm } from "../forms/manage-restaurant-form/manageRestaurantForm"

export const ManageRestaurantPage = () => {
    const { isLoading, createRestaurant } = useCreateMyRestaurant()
    return(
        <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} />
    )
}