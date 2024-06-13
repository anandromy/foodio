import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"


type Props = {
    onChange: (value: string) => void
    sortOption: string
}

export const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
    const sort_options = [{
        label: "Best match",
        value: "bestMatch"
    }, {
        label: "Deliver price",
        value: "deliveryPrice"
    }, {
        label: "Estimated delivery time",
        value: "estimatedDelvieryTime"
    }]

    const selectedSortLabel = sort_options.find((option) => option.value === sortOption)?.label || sort_options[0].label
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" className="w-full">Sorted by: {selectedSortLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    sort_options.map((option) => (
                        <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
                            {option.label}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}