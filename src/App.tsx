import { Routes, Route } from 'react-router-dom'
import { ClerkProvider, SignedIn } from '@clerk/clerk-react'
import { Home } from './components/landing-page'
import { SignUpPage } from './components/sign-up/SignUpPage'
import { LogInPage } from './components/log-in/LogInPage'
import NotFoundRedirect from './components/error-page/NotFoundRedirect'
import { Dashboard } from './components/dashboard/Dashboard'

export function App() {
    return (
        <ClerkProvider publishableKey={`pk_test_aGVscGluZy1zb2xlLTM4LmNsZXJrLmFjY291bnRzLmRldiQ`}>
            <Routes>
                <Route path="/*" element={<NotFoundRedirect />} />
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-in" element={<LogInPage />} />
                <Route
                    path="/dashboard/:userId"
                    element={
                        <SignedIn>
                            <Dashboard />
                        </SignedIn>
                    }
                />
            </Routes>
        </ClerkProvider>
    )
}