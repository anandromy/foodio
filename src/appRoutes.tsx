import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./layouts/layout"
import { Home } from "./pages/home"
import { AuthCallbackPage } from "./pages/authCallbackPage"
import { UserProfilePage } from "./pages/userProfilePage"
import { ProtectedRoute } from "./auth/protectedRoutes"
import { ManageRestaurantPage } from "./pages/manageRestaurantPage"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout showHero={true}>
                <Home />
            </Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout>
                    <UserProfilePage />
                </Layout>} />
                <Route path="/manage-restaurant" element={<Layout>
                    <ManageRestaurantPage />
                </Layout>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}