import { Card } from "@repo/ui/card";

enum OnRampStatus {
    Success = "Success",
    Failure = "Failure",
    Processing = "Processing",
}

export const PreviousTxn = ({
    transactions,
}: {
    transactions: {
        status: OnRampStatus;
        bankAccount: string;
        accountNo: string;
        startTime: Date;
        amount: number;
    }[];
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="Recent Withdrawls">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between">
                        <div>
                            <div className="text-sm">Received INR</div>
                            <div className="text-sm">{OnRampStatus[t.status]}</div>
                            <div className="text-slate-600 text-xs">
                                {t.startTime.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
