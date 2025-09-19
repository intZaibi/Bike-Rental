import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

interface InputProps {
  // errorMsg: string;
  name: string;
  isLoading?: boolean;
  disabled?: boolean;
  onType?: () => void,
  errorFunction: (e: boolean) => void
  // onChange: (e: string) => void 
}

const Input = (props: InputProps) => {

  const [input, setInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { 
    //onChange, 
    isLoading, disabled,
    onType,
    name, errorFunction 
  } = props;

  useEffect(() => {    
    if(input.length == 0)
    {
      errorFunction(true)
      setErrorMsg(`${name} can't be empty`)
      return
    }
    
    errorFunction(false)
    setErrorMsg('')
  }, [input]);

  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
        {name}
      </label>
      <div className="relative mb-3">
        <input
          type="text"
          disabled={(disabled  === true)}
          value={input}
          onChange={(e) => {
            if(onType)
            {
              onType();
            }
            setInput(e.target.value)
          }}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm sm:text-base"
          placeholder={name}
        />
      </div>
      {errorMsg.length > 0 && (
        <div className="flex gap-2">
          <CircleAlert className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-red-500"/>
          <p className="text-red-500">{errorMsg}</p>
        </div>
      )}
    </div>
  )
}

export default Input