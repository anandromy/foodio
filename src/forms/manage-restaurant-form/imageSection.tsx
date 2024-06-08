import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export const ImageSection = () => {
    const { control, watch } = useFormContext()
    const existingImageUrl = watch("imageUrl")
    return(
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>Add an image that will be displayed on your restaurant listing in the search results. Adding a new image will overwrite the existing one.
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                { existingImageUrl && (
                    <AspectRatio ratio={16/9}>
                        <img src={existingImageUrl} className="rounded-md object-fill h-full w-full" />
                    </AspectRatio>
                )}
                <FormField control={control} name="imageFile" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="file" accept=".jpeg, .jpg, .png" onChange={(e) => field.onChange(e.target.files? e.target.files[0] : null)} />
                        </FormControl>
                    </FormItem>
                )} />
            </div>
        </div>
    )
}