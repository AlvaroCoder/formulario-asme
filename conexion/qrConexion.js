const BASE_URL = "http://172.20.29.95:8000"

export async function getQrLinkFormUser(data) {
    return fetch(`${BASE_URL}/home/qr_section`,{
        method : 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body :JSON.stringify(data)
    })
}
