export const Footer = () => {
    return(
        <div className="bg-primary text-primary-foreground py-6">
            <div className="container flex flex-col md:flex-row justify-between items-center">
                <span className="text-xl font-semibold">
                    foodio
                </span>
                <span className="font-semibold tracking-tight flex gap-4">
                    <span>Privacy policy</span>
                    <span>Terms of service</span>
                </span>
            </div>
        </div>
    )
}