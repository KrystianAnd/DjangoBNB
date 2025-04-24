'use client';

import CustomButton from "../forms/CustomButton";

const ConversationDetail = () => {
    return (
        <div>
            <div className="max-h-[1400px] overflow-auto flex flex-col space-y-4 ">
                <div className="w-[80%] py-4 px-8 rounded-xl bg-gray-200">
                    <p className="font-bold text-gray-500 ">John Doe</p>

                    <p>hbhveufgevbuyefrv</p>
                </div>

                <div className="w-[80%] ml-[20%] py-4 px-8 rounded-xl bg-blue-200">
                    <p className="font-bold text-gray-500 ">Steve Pon</p>

                    <p>hbhveufgevbuyefrv</p>
                </div>
            </div>
            
            <div className="mt-4 py-4 px-6 flex border border-gray-200 space-x-4 rounded-xl">
                <input 
                    type="text"
                    placeholder="Type your massage..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                />

                <CustomButton 
                    label="Send"
                    onClick={() => console.log('Click')}
                    className=" w-[100px] "
                />
            </div>
        </div>
        
        
    )
}

export default ConversationDetail;