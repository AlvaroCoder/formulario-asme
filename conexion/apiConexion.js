const BASE_URL = "https://asme-backend-broken-voice-4721.fly.dev"
export async function  loginPostUser(dni="") {
    return await fetch(`${BASE_URL}/login`,{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({dni}),
    })
}

export async function getBookedTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/booked_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getRemainTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/available_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getSoldTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/sold_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getPendingTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/pending_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getAvailablesTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/available_tickets?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getLastTicketSoldHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/last_sold_ticket/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getSoldOutTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/sold_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
