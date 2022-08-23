import { produce } from "immer";
import { reorderGroupsCards } from './utils'

export const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, status: 'idle', groups: action.payload };
        case 'UPDATE_GROUP_TITLE':
            return { ...state, groups: state.groups.map(group => group.id === action.payload.id ? { ...group, title: action.payload.title } : group) };
        case 'DELETE_GROUP':
            if (state.current) {
                var arrayIndex = []
                const newList = state.groups.filter(group => group.id !== state.current.id)
                newList.map(group => arrayIndex.push(group.index))
                console.log(arrayIndex)
                return {
                    ...state, groups: newList.map(group => {
                        return {
                            ...group,
                            index: arrayIndex.indexOf(group.index)
                        }
                    }), modal: undefined, current: undefined
                }
                
            } else {
                return state;
            }
        case 'UPDATE_GROUP_CARD':
            if (state.current) {
                return {
                    ...state, groups: state.groups.map(group => {
                        return {
                            ...group,
                            cards: group.cards.map(groupCard => groupCard.id === state.current.id ? { ...groupCard, ...action.payload } : groupCard)
                        }
                    }), modal: undefined, current: undefined
                };
            } else {
                return state;
            }
        case 'ADD_GROUP_CARD':
            if (state.current) {
                return {
                    ...state, groups: state.groups.map(group => {
                        return {
                            ...group,
                            cards: group.id === state.current.id ? [...group.cards, action.payload] : group.cards
                        }
                    }), modal: undefined, current: undefined
                };
            } else {
                return state;
            }

        case 'MOVE_ITEM':
            const { from, to, fromList, toList } = action.payload;
            
            const newListState = produce(state.groups, draft => {

                const dragged = draft[fromList].cards[from];
                
                draft[fromList].cards.splice(from, 1);
                draft[toList].cards.splice(to, 0, dragged);
            });
            return { ...state, groups: reorderGroupsCards(newListState)};
        case 'DELETE_GROUP_CARD':
            if (state.current) {
                return {
                    ...state, groups: state.groups.map(group => {
                        return {
                            ...group,
                            cards: group.cards.filter(groupCard => groupCard.id !== state.current.id)
                        }
                    }), modal: undefined, current: undefined
                };
            } else {
                return state;
            }

        case 'ADD_GROUP':
            return { ...state, groups: [...state.groups, action.payload], modal: undefined };
        case 'SHOW_MODAL':
            return { ...state, ...action.payload };
        case 'HIDE_MODAL':
            return { ...state, modal: undefined, current: undefined };

        default:
            return state
    }
}
