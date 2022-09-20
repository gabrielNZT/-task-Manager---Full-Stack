export function reorderGroupsCards(groups) {
    return groups.map(group => {
        return {
            ...group,
            cards: group.cards.map((card, position) => ({
                ...card,
                position: position
            }))
        }
    }
    );
}

export function findGroup(groups, cardId) {
    var currentGroup = null
    groups.forEach(group => {
        group.cards.forEach(card => {
            if (card.id === cardId) {
                currentGroup = group
            }
        })
    })
    return currentGroup
}