import { Dispatch, SetStateAction } from "react";

export type objArray = {
    id: number,
    count: number,
    title: string,
    price: number,
    imgUrl: string
}

export type ContextType = [objArray[], Dispatch<SetStateAction<objArray[]>>];

export interface Product {
    id: number;
    title: string;
    price: number;
    imgUrl: string;
}