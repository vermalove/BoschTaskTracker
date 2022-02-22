import { createGlobalState } from "react-hooks-global-state";

const showState:any={
    showModel:null,
}
const dataStoreState:any=[{
    TaskName: null,
    Comments: null,
    SelectProject:null,
    ID:null
}]
const editDataStoreState:any={
    TaskName: null,
    Comments: null,
    SelectProject:null,
    ID:null
}


export const {useGlobalState}= createGlobalState({
    showModel:showState,
    dataStore:dataStoreState,
    editDataStore:editDataStoreState
})