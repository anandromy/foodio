import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required"
    })
})


type Props = {
    onSubmit: (formData: z.infer<typeof formSchema>) => void
    placeholder: string
    onReset?: () => void
}

export const SearchBar = ({ onSubmit, placeholder, onReset }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ""
        }
    })

    const handleReset = () => {
        form.reset({
            searchQuery: ""
        })
        if(onReset){
            onReset()
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${form.formState.errors.searchQuery && "border-destructive"}`}>
                <SearchIcon strokeWidth={2.5} size={30} className="text-primary ml-1 hidden md:block" />
                <FormField control={form.control} name="searchQuery" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input {...field} className="border-none shadow-none text-xl focus-visible:ring-0" placeholder={placeholder} />
                        </FormControl>
                    </FormItem>
                )} />
                {
                    form.formState.isDirty && (
                        <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">Clear</Button>
                    )
                }
                <Button type="submit" className="rounded-full">Search</Button>
            </form>
        </Form>
    )
}