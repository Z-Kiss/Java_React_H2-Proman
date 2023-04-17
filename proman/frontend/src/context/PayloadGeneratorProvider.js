import {createContext, useContext} from "react";


const PayloadGeneratorContext = createContext({});

const PayloadGeneratorProvider = ({children}) =>{

    const payloadGeneratorForNewObjects = (e, parentComponentId, payloadOfNewObject, setPayloadOfNewObject) =>{

        const brightBackground = ["bg-light","bg-warning"]

        if(notBoard(parentComponentId)) {recordParentComponentId(setPayloadOfNewObject, parentComponentId);}

        const {name, value} = e.target;

        recordAttributeOfNewObject(setPayloadOfNewObject,name, value)

        pickTextColor(brightBackground, payloadOfNewObject, setPayloadOfNewObject)

    }

    const notBoard = (parentComponentId) =>{
        return parentComponentId !== undefined
    }

    const recordParentComponentId = (setPayloadOfNewObject, parentComponentId) =>{
        setPayloadOfNewObject(prevState => ({
            ...prevState,id: parentComponentId}))
    }

    const recordAttributeOfNewObject = (setPayloadOfNewObject,name, value) =>{
        setPayloadOfNewObject(prevState => ({
            ...prevState,[name]:value}))
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