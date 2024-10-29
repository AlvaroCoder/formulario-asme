const BASE_URL = "http://172.20.29.95:8000"
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
export async function getLastTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/last_booked_ticket/?id=${id_user}`,{
        method : 'GET'
    })
}
export async function getSoldOutTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/sold_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
