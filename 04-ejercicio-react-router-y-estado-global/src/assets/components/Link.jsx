import { NavLink } from 'react-router'

export function Link({href, children, ...restOfProps }){

    return(
        <NavLink className={({isActive}) => isActive ? 'active' : ''} to={href} {...restOfProps} >
            {children}
        </NavLink>
    )
}
