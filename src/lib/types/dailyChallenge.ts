export interface DailyChallenge {
    id: number;
    letter: string; 
    categories: string[];
    date: string;
    creator: string | null;
    plays: number;
    scores: {
        '0': number;
        '1': number;
        '2': number;
        '3': number;
        '4': number;
        '5': number;
        '6': number;
        '7': number;
        '8': number;
        '9': number;
        '10': number;
        '11': number;
        '12': number;
    };
}
