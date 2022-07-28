import { Group } from '../types'

export type State = {
    status: 'idle' | 'fetching' | 'error';
    groups: Group[];
    error?: { key: string, value: Error };
}

export type Action = | { type: 'FETCH_DATA'; payload: Group[] } | { type: 'UPDATE_GROUP_TITLE'; payload: { id: number; title: string } }

export const reducer = (state: State, action: Action) => {
    switch( action.type ){
        case 'FETCH_DATA': 
        return {...state, status: 'idle', groups: action.payload};
        
        case 'UPDATE_GROUP_TITLE':
            const newGroups = (state.groups).map(group => group.id === action.payload.id? {...group, title: action.payload.title} : group);
            return {...state, groups: newGroups}; 

        default: 
        return state
    }
}



