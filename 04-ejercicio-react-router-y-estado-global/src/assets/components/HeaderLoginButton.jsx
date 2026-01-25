import { useAuthStore } from '../../store/authStore.js';
import { useFavoritesStore } from '../../store/favoritesStore.js';

import styles from './Header.module.css'

export function HeaderLoginButton(){
    const {isLoggedIn, login, logout} = useAuthStore()
    const clearFavorites = useFavoritesStore(state => state.clearFavorites)

    const handleLogout = () => {
        logout()
        clearFavorites()
    }

    return isLoggedIn
            ? <button className={styles.btnStd} onClick={handleLogout}>Cerrar sesión</button>
            : <button className={styles.btnStd} onClick={login}>Iniciar sesión</button>
}
