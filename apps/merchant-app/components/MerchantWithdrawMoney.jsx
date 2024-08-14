"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { withdrawMerchant } from "../lib/withdrawMerchant";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];



export default function MerchantWithdrawMoney(){
    const [accountNo , setAccountNo] = useState("");
    const [ifsc , setIfsc] = useState("");
    const [amount, setamount] = useState(0);
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);

    return <Card title="Withdraw Money to Bank">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(e) => {
                    setamount(Number(e));
            }} />
            <TextInput label={"AccountNo"} placeholder={"Account Number"} onChange={(e) => {
                    setAccountNo(e);
            }} />
            <TextInput label={"Ifsc"} placeholder={"Ifsc code"} onChange={(e) => {

            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setprovider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={() => {
                    withdrawMerchant( provider ,accountNo,amount);
                }}>
                Withdraw Money
                </Button>
            </div>
        </div>
         </Card>
}