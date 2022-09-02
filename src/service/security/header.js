const header = {
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth')).data.access_token}`
}
export default header