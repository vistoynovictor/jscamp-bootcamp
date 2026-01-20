import { useRef } from "react"

export function useSearch({techId, locationId, expLevelId, txtSearchId, OnSearch}){

    const timeoutId = useRef(null)

    const handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const textSearchCheck = e.target.name === txtSearchId

        if (textSearchCheck){
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }

        const filters = {
            tech: formData.get(techId),
            location: formData.get(locationId),
            expLevel: formData.get(expLevelId),
            txtSearch: formData.get(txtSearchId)
        }
        
        if (textSearchCheck){
            timeoutId.current = setTimeout(() => {
                OnSearch(filters)
            }, 500)
        }else{
            OnSearch(filters)
        }
    }

    return { handleSubmit }
}
