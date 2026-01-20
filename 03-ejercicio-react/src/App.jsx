import { Header } from './assets/components/Header.jsx'
import { Routes } from './assets/components/Routes.jsx'
import { Route } from './assets/components/Route.jsx'
import { Footer } from './assets/components/Footer.jsx'

import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { ContactPage } from './pages/Contact.jsx'


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' component={HomePage} />
                <Route path='/search' component={SearchPage}/>
                <Route path='/contact' component={ContactPage} />
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
