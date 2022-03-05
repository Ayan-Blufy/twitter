import { atom } from "recoil"

export const modalState = atom({
    key: "modalState",
    default: false
});
export const postIdState = atom({
    key: "postIdState",
    default: ""
});

export const caseState= atom({
    key: "caseState",
    default: false
})