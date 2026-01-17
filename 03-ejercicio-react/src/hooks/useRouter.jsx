import { useEffect, useState } from "react"

export function useRouter(){

    const [currentPath, setCurrentPath] = useState(window.location.pathname)


    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', handleLocationChange)

        return () => {
            window.removeEventListener('popstate', handleLocationChange)
        }

    },[])

    function navigateTo(href){
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return {currentPath, navigateTo}
}
