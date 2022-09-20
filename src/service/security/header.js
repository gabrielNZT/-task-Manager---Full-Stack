const header = {
        "Content-Type": "application/json",
        "Accept": "application/json"
}

function headers() {
        return{
                ...header,
                Authorization:  `Bearer ${JSON.parse(localStorage.getItem('auth'))?.access_token}`
        }
}

export default headers