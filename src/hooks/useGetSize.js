import { useEffect, useState } from "react"

const useGetSize = (selector) => {
    const [size, setSize] = useState({})
    useEffect(() => {
        const aside = typeof window !== 'undefined' && document.getElementById(selector)
        const handleResize = () => setSize({width: aside?.clientWidth, height: aside?.clientHeight})
        typeof window !== 'undefined' && handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [typeof window !== 'undefined'])
    return size
}

export default useGetSize