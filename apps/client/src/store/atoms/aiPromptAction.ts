import { atom } from "recoil";


export const aiPrompt = atom({
    key:'ai-prompt',
    default:""
})
export const aiResLoading = atom({
    key:"ai-res-loading",
    default:false
})

export const aiResponse = atom({
    key:"ai-response",
    default: ""
})
