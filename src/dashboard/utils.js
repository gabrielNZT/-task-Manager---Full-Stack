export function reorderGroupsCards(groups) {
    return groups.map(group => {
        return {
            ...group,
            cards: group.cards.map((card, index) => ({
                ...card,
                index: index
            }))
        }
    }
    );
}