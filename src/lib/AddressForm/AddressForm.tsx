import { LoaderCircle } from "lucide-react";
import Input from "./Input"
import {useState, useEffect} from "react";

interface AddressFormProps {
  errorFunction: (e: boolean, name: string) => void
}

const AddressForm = (props: AddressFormProps) => {
  const [errorMap, setErrorMap] = useState<{[key:string]: boolean}>({})
  const [loading, setLoading] = useState<boolean>(false);
  const { errorFunction } = props;

  const errMapFunct = (value: boolean, name: string) => {
    setErrorMap(prev => {
      if(value)
      {
        return {
          ...prev,
          [name]: true
        }
      } else {
        const newMap = {...prev};
        delete newMap[name]
        return newMap
      }
    })
  }

  useEffect(() => {
    errorFunction((Object.keys(errorMap).length > 0), "Address From")
  }, [errorMap])

  return (
    <div>
    <h3 className=" font-bold text-black mb-6 sm:mb-8">
      Delivery/Pickup Address (This will also be your Billing Address)
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
      
      <Input name={"Name"} errorFunction={(value) => {
        errMapFunct(value, "Name")
      }} />
      <Input name={"Address"} errorFunction={(value) => {
        errMapFunct(value, "Address")
      }} />
      <Input name={"City"} errorFunction={(value) => {
        errMapFunct(value, "City")
      }} />
      <Input name={"State"} errorFunction={(value) => {
        errMapFunct(value, "State")
      }} />
      <Input name={"Zip"} errorFunction={(value) => {
        errMapFunct(value, "Zip")
      }} />
    </div>

    <h3 className="font-bold text-black mb-2 sm:mb-3">
      Billing Information
    </h3>
     {(loading) ? <p style={{fontSize: '13px'}} className="flex gap-2 font-bold text-black mb-3 sm:mb-4">
      <LoaderCircle className={"h-4 w-4 animate-spin"} /> Loading Billing Information Form...
    </p>
    :
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">

      <Input name={"Card Number"} 
        onType={() => {
          setLoading(true)
        }}
        errorFunction={(value) => {
          errMapFunct(value, "Card Holder")
        }} 
      />
      <Input disabled name={"Card Holder"} errorFunction={(value) => {
        errMapFunct(value, "Card Number")
      }} />
      <Input disabled name={"Expiration Date"} errorFunction={(value) => {
        errMapFunct(value, "Card Address")
      }} />
      <Input disabled name={"CVC"} errorFunction={(value) => {
        errMapFunct(value, "Zip")
      }} />
    </div>}
    </div>
  )   
}

export default AddressForm