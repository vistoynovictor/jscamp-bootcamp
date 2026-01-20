import { useRouter } from "../../hooks/useRouter"

export function Link({href, children, ...restOfProps }){

    const { navigateTo, currentPath } = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        navigateTo(href)
    }

    return(
        <a href={href} {...restOfProps} onClick={handleClick} className={currentPath === href ? 'active' : undefined}>
            {children}
        </a>
    )
}
