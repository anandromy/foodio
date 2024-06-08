import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { DetailsSection } from "./detailsSection"
import { Separator } from "@/components/ui/separator"
import { CuisinesSection } from "./cuisinesSection"
import { MenuSection } from "./menuSection"
import { ImageSection } from "./imageSection"
import { Button } from "@/components/ui/button"
import { LoaderIcon } from "lucide-react"

type Props = {
    onSave: ( restaurantFormData: FormData ) => void
    isLoading: boolean
}

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }),
    city: z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "",
        invalid_type_error: "Must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select atleast one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required")
    })),
    imageFile: z.instanceof(File, {
        message: "Image is required"
    })
})

export const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        // fallback values
        defaultValues: { 
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    })

    const onSubmit = (formDataJson: z.infer<typeof formSchema>) => {

        // Converting content-type = "application/json" to multipart FormData object because multipart forms can't be sent with type application/json type.
        const formData = new FormData()
        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })
        formDataJson.menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name)
            formData.append(`menuItems[${index}][price]`, (item.price * 100).toString())
        })

        formData.append("imageFile", formDataJson.imageFile)
    }

    return(
        <Form {...form}>
            {/* Usually we would do form.handleSubmit(onSave), onSave is obtained through props, 
            but here we need to convert the obtained resturant info form user inputs into a real FormData object 
            SO here form.handleSubmit will run all the zod validation and then pass it to onSubmit so that when we get the user's input
            we know that the data is valid and we can proceed to convert it into FormData
            */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-muted p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {
                    isLoading ? (
                        <Button className="animate-spin">
                            <LoaderIcon />
                        </Button>
                    ):(
                        <Button type="submit">Submit</Button>
                    )
                }
            </form>
        </Form>
    )
}