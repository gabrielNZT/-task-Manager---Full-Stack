export const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, users: action.payload }

        case 'SUBMIT_USER':
            return { ...state, users: [...state.users, action.payload] }

        case 'DELETE_USER':
            return { users: state.users.filter(user => user.id !== action.payload.id) }

        case 'UPDATE_USER':
            return {
                ...state, users: state.users.map(
                    user => user.id === action.payload.id ? {
                        ...user,
                        username: action.payload.username,
                        email: action.payload.email,
                        adm: action.payload.adm
                    } : user
                )
            }

        default:
            return state;
    }
}