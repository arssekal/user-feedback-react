import { createContext, useContext } from "react";
import { useState } from "react";
import MyAlert from "../components/MyAlert";


const AlertContext = createContext({})

export const AlertProvider = ({children}) => {

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("this is a success message");

    function showHideTostAlert(text) {
        setContent(text)
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 3000)
    }

    return (
        <AlertContext.Provider  value={{showHideTostAlert}}>
            <MyAlert open={open} content={content}/>
            {children}
        </AlertContext.Provider>
    )
}
export const useAlert= () => {
    return useContext(AlertContext)
}
