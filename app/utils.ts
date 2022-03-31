/**
 * Since we need to pass API key to everywhere, let's do it smarth.
 * 
 * @param path The API path
 * @param params extra filters to be passed
 * @returns URL
 */
export const createApiUrl = (path: string, params?: any) => {
    if (!process.env.API_KEY || !process.env.API_URL) {
        throw new Error("Please set API environment.")
    } 
    const searchParams = new URLSearchParams()
    searchParams.set('api_key', process.env.API_KEY)
    for (let k in params) {
        searchParams.set(k, params[k])
    }

    return `${process.env.API_URL}${path}?${searchParams.toString()}`
}

export const createImageUrl = (path: string, width = 'w500') => {
    return `https://image.tmdb.org/t/p/${width}/${path}`
}