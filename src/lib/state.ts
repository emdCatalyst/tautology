import { atom } from "jotai";
const language = atom("en");
const truthTable = atom<{ [key: string]: 0 | 1 }[]>([]);
export { language, truthTable };
