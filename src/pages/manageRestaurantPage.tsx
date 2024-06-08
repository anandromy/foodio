import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/myRestaurantApi"
import { ManageRestaurantForm } from "../forms/manage-restaurant-form/manageRestaurantForm"

export const ManageRestaurantPage = () => {
    const { isLoading: createLoading, createRestaurant } = useCreateMyRestaurant();
    const { isLoading: getLoading, restaurant} = useGetMyRestaurant()
    return(
        <ManageRestaurantForm isLoading={createLoading} onSave={createRestaurant} restaurant={restaurant} />
    )
}