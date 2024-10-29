const BASE_URL = "http://172.20.25.150:8000"
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
    return await fetch(`${BASE_URL}/home/booked_tickets/?id=${id_user}`,{
        method : 'GET'
    })
}
export async function getRemainTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/remain_tickets/?id=${id_user}`,{
        method : 'GET'
    })
}

export async function getLastTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/last_booked_ticket/?id=${id_user}`,{
        method : 'GET'
    })
}