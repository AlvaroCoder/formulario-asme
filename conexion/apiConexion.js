export async function  loginPostUser(dni="") {
    return await fetch('http://192.168.1.102:8000/login',{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({dni}),
    })
}

export async function getBookedTicketsHome(id_user=1) {
    return await fetch(`http://192.168.1.102:8000/home/booked_tickets/?id=${id_user}`,{
        method : 'GET'
    })
}
export async function getRemainTicketsHome(id_user=1) {
    return await fetch(`http://192.168.1.102:8000/home/remain_tickets/?id=${id_user}`,{
        method : 'GET'
    })
}

export async function getLastTicketsHome(id_user=1) {
    return await fetch(`http://192.168.1.102:8000/home/last_booked_ticket/?id=${id_user}`,{
        method : 'GET'
    })
}