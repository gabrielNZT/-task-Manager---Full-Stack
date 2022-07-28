export type Card = {
    id: number;
    title: string;
    description?: string;
    order: number;
}

export type Group = {
    
    id: number;
    title: String;
    order: number;
    cards: Card[]; 
}

