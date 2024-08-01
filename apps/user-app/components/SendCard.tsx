"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/p2p";
import { getUserName } from "../app/lib/getUserName";


export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [reciverName , setReciverName] = useState<string>("");
    const [ack , setAck] = useState("")
    
    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 text-center pt-2">
                    {ack}
                </div>
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={async(value) => {
                        setNumber(value)
                        if(value.length > 9){
                            const name = await getUserName(value) ;
                            setReciverName(name)
                        }
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    { reciverName ? 
                      <div className="pt-2">
                            <div>Receiver Name: {reciverName}</div>
                        </div> : ""
                    }
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                           const isDone = await  p2pTransfer(number , Number(amount));
                           if (!isDone) {
                            setAck('Transfer successful!');
                        } else {
                            setAck('Transfer failed.');
                        }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}