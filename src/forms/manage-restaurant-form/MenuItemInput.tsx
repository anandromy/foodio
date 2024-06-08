import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

type Props = {
    index: number,
    removeMenuItem: () => void
}

export const MenuItemInput = ({ index, removeMenuItem }: Props) => {
    const { control } = useFormContext()
    return(
        <div className="flex flex-row items-end gap-2">
            <FormField name={`menuItems.${index}.name`} control={control} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        Name
                        <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Chesse pizza" />
                    </FormControl>
                </FormItem>
            )} />
            <FormField name={`menuItems.${index}.price`} control={control} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        Price (in rupees)
                        <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="8.00" />
                    </FormControl>
                </FormItem>
            )} />
            <Button variant="destructive" onClick={removeMenuItem}>Remove</Button>
        </div>
    )
}