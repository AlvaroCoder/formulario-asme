const BASE_URL = "https://asme-backend-broken-voice-4721.fly.dev"

export async function getQrLinkFormUser(data) {
    return fetch(`${BASE_URL}/home/qr_section`,{
        method : 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body :JSON.stringify(data)
    })
}

export async function updateStatusTicketSold(data) {
    return fetch(`${BASE_URL}/home/confirm_ticket_sale/`,{
        method : 'PUT',
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify(data)
    })
}