import {createContext, useContext, useState} from "react";


const PayloadGeneratorContext = createContext({});

const PayloadGeneratorProvider = ({children}) =>{

    const payloadGeneratorForNewObjects = (e, parentComponentId, payloadOfNewObject, setPayloadOfNewObject) =>{
        console.log(parentComponentId)
        const brightBackground = ["bg-light","bg-warning"]

        if(parentComponentId !== undefined){
            setPayloadOfNewObject(prevState => ({
                ...prevState,id: parentComponentId}))}

        const {name, value} = e.target;

        setPayloadOfNewObject(prevState => ({
            ...prevState,[name]:value}))

        pickTextColor(brightBackground, payloadOfNewObject, setPayloadOfNewObject)

    }

    const notBoard = (parentComponentId) =>{
        return parentComponentId !== undefined
    }

    const pickTextColor = (brightBackground,payloadOfNewObject, setPayloadOfNewObject) =>{
        if (brightBackground.some((color) => (color === payloadOfNewObject.bgColor))){
            setPayloadOfNewObject(prevState => ({
                ...prevState,textColor: "text-dark"
            }))
        } else {
            setPayloadOfNewObject(prevState => ({
                ...prevState,textColor: "text-white"
            }))
        }
    }

    const payloadGenerator = {
        forNewObject: payloadGeneratorForNewObjects
    }


    return(
        <PayloadGeneratorContext.Provider value={{payloadGenerator}}>
            {children}
        </PayloadGeneratorContext.Provider>
    )

}

export const usePayloadGenerator = () => useContext(PayloadGeneratorContext).payloadGenerator
export default PayloadGeneratorProvider;