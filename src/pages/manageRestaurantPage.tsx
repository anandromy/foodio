import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/myRestaurantApi"
import { ManageRestaurantForm } from "../forms/manage-restaurant-form/manageRestaurantForm"

export const ManageRestaurantPage = () => {
    const { isLoading: createLoading, createRestaurant } = useCreateMyRestaurant();
    const { restaurant} = useGetMyRestaurant()
    const { isLoading: updateLoading, updateRestaurant } = useUpdateMyRestaurant()

    //truthy value of restaurant, i.e if there is restaurant !!restaurant is true else if restaurant is undefined or null, then !!restaurant is false
    const isEditing = !!restaurant
    return(
        <ManageRestaurantForm isLoading={createLoading || updateLoading } onSave={isEditing ? updateRestaurant: createRestaurant} restaurant={restaurant} />
    )
}