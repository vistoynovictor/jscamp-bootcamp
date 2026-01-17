import { Header } from './assets/components/Header.jsx'
import { Route } from './assets/components/Route.jsx'
import { Footer } from './assets/components/Footer.jsx'

import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { ContactPage } from './pages/Contact.jsx'
import { NotFoundPage } from './pages/NotFound.jsx'


function App() {
    return (
        <>
            <Header/>
            <Route path='/' component={HomePage} />
            <Route path='/search' component={SearchPage}/>
            <Route path='/contact' component={ContactPage} />
            <Route path='/*' element={NotFoundPage} />
            <Footer/>
        </>
    );
}

export default App;
