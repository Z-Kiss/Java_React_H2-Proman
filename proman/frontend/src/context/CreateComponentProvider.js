import {createContext, useContext, useEffect, useState} from "react";


const CreateComponentContext = createContext({})

const CreateComponentProvider = ({children, copyOfState, setState}) =>{


    const createNewObject = async (payload, url) => {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        return response;
    }


    const createBoardProps = {
            placement: "bottom",
            buttonStyle: "primary",
            buttonTitle: "Create Board",
            url: "/board/create"
    }

    const createColumnProps =  {
            placement: "right",
            buttonStyle: "outline-dark",
            buttonTitle: "Add Column",
            url: "/boardcolumn/create"
    }

    const createCardProps =  {
        placement: "right",
        buttonStyle: "outline-dark btn-sm",
        buttonTitle: "+",
        url: "/card/create"
    }

    return(
        <CreateComponentContext.Provider value={{createNewObject,createBoardProps,createColumnProps,createCardProps}}>
            {children}
        </CreateComponentContext.Provider>
    )

}


export const useCreateBoardProps = () => useContext(CreateComponentContext).createBoardProps;
export const useCreateColumnProps = () => useContext(CreateComponentContext).createColumnProps;
export const useCreateCardProps = () => useContext(CreateComponentContext).createCardProps;
export const useCreateNewComponent = () => useContext(CreateComponentContext).createNewObject;
export default CreateComponentProvider;