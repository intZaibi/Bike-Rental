import CheckoutInput from "./CheckoutInput"

const Checkout = () => {

    return (
      <div className='max-w-7xl mx-auto py-20'>

        <div className="grid sm:px-10 lg:grid-cols-2 px-5 2xl:px-0">
            {/* <OrderSum price={price}/> */}
            <div></div>
            <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
                
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>
                <div className="">
                    {[
                      {name: 'Email', placeholder: "johndoe@example.com"},
                      {name: 'Card Holder', placeholder: "John Doe"}
                    ].map(obj => (
                      <CheckoutInput 
                        name={obj.name}
                        placeholder={obj.placeholder}
                        click={() => {}}
                      />
                    ))}
                    <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
                    <div className="flex">
                        <div className="relative w-7/12 flex-shrink-0">
                            <input disabled type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                </svg>
                            </div>
                        </div>
                        <input disabled type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
                        <input disabled type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
                    </div>
                    <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex-shrink-0 sm:w-7/12">
                            <input disabled type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
                            </div>
                        </div>
                        <select name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                            <option value="State">State</option>
                        </select>
                        <input disabled type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
                    </div>

                    <div className="pt-5 mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">{100}</p>
                    </div>
                </div>
                <button 
                    onClick={() => {}}
                    className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                >Place Order</button>
            </div>
        </div>
    </div>
  )
}

export default Checkout