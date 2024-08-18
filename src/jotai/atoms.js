import { atom } from "jotai";

export const rotateAtom = atom(true);

export const presentationAtom = atom(false);

export const scalingAtom = atom(false);

export const selectedNodeAtom = atom("");

export const selectedNodeRefAtom = atom(null);

export const nodeDetailsAtom = atom({
    title: "",
    description: "",
})