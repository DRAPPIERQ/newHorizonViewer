export default function () {
    const methods = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
        PATCH: 'PATCH',
    }
    const AcnhOptions = {
        baseURL: 'https://api.nookipedia.com/',
        headers: {
            'X-API-KEY': 'fd2b4786-f817-48a3-a286-a43a039ada6c',
            'Accept-Version': '1.0.0'
        }
    }
    return {
        ...methods,
        AcnhOptions
    }
}