import React from "react"
import { Header } from "@/components/header/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

type Props = {
    children: React.ReactNode,
    showHero?: boolean
}

export const Layout = ({ children, showHero = false }: Props) => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            {
                showHero && <Hero />
            }
            <div className="flex-1 container">
                {children}
            </div>
            <Footer />
        </div>
    )
}