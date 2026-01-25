import { lazy, Suspense } from 'react'

import { Header } from './assets/components/Header.jsx'
import { Route, Routes } from 'react-router'
import { Footer } from './assets/components/Footer.jsx'
import { Spinner } from './assets/components/Spinner.jsx'
import { ProtectedRoute } from './assets/components/ProtectedRoute.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const ContactPage = lazy(() => import('./pages/Contact.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFound.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))
const ProfilePage = lazy(() => import('./pages/Profile.jsx'))
const LoginPage = lazy(() => import('./pages/Login.jsx'))
const RegisterPage = lazy(() => import('./pages/Register.jsx'))



function App() {
    return (
        <>
            <Header />
            <Suspense fallback={<Spinner loadTarget='página'/>}>            
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path='/job/:jobId' element={<JobDetail />}/>
                    <Route path='/contact' element={<ContactPage/>} />
                    <Route path='/profile' element={
                        <ProtectedRoute redirectTo='/login'>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='/register' element={<RegisterPage/>} />
                    <Route path='*' element={<NotFoundPage/>} />
                </Routes>
            </Suspense>
            <Footer/>
        </>
    );
}

export default App;
