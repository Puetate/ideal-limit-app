import { main } from "../../wailsjs/go/models";


export interface Frequency {
    [key: string]: main.Frequency
}

export interface Word {
    [key: string]: main.Word
}


export interface Detail {
    key: string,
    count: number,
    frequency: number,
    redundancy: number
}

export interface FrequencyDetail {
    value: number,
    count: number,
    total: number,
}