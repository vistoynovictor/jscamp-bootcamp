import { useRouter } from "../../hooks/useRouter"

import { NotFoundPage } from '../../pages/NotFound.jsx'

export function Routes({ children}){
    const { currentPath } = useRouter()
    let routeMatch = false

    const routes =  children.map(child => {
            if (child.props.path === currentPath){
                routeMatch = true
                return child
            } else{
                return null
            }
        })

        if (routeMatch){
            return routes
        } else{
            return <NotFoundPage/>
        }
}
