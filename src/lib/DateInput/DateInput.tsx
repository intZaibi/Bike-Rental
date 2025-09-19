import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

interface DateInputProps {
  errorMsg: string;
  name: string;
  errorFunction: (e: boolean, name: string) => void
  notBefore?: {
    date: string,
    name: string
  }
  onChange: (e: string) => void 
}

const re = /^(?:(?:0[13578]|1[02])\/(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)\/(?:0[1-9]|[12]\d|30)|02\/(?:0[1-9]|1\d|2[0-8])|02\/29(?=\/(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26]))|(?:(?:[02468][048]|[13579][26])00))))\/\d{4}$/;

const DateInput = (props: DateInputProps) => {

  const [date, setDate] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { onChange, name, errorFunction, notBefore } = props;
  const [hasError, setHasError] = useState<boolean>(false);
  const notBeforeDate = (notBefore && re.test(notBefore.date)) ? new Date(notBefore.date) : undefined
  useEffect(() => {
    onChange(date)
    
    if(!re.test(date))
    {
      setErrorMsg('Invalid Date. Must Be MM/DD/YYYY')
      errorFunction(true, name)
      return;
    } else if(notBeforeDate && notBeforeDate >= new Date(date))
    {
      setErrorMsg(`Date is Too Early, Can't Be On or Before ${notBefore?.name}`)
      errorFunction(true, name)
      return;
    }
    
    errorFunction(false, name)
    setErrorMsg('')
  }, [date]);

  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
        {name}
      </label>
      <div className="relative mb-3">
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm sm:text-base"
          placeholder="MM/DD/YYYY"
        />
        {/* <Calendar className="absolute right-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" /> */}
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

export default DateInput