import { Card } from "@repo/ui/card";

export const RecentTransaction = ({
    transactions,
    title
}: {
    transactions: {
        id: number,
        time: Date,
        amount: number,
        toUser?: { name: string },
        fromUser?: { name: string }
    }[],
    title: string
}) => {
    if (!transactions.length) {
        return (
            <Card title={title}>
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }
    const condition = title.includes('Sent') ? 'text-red-600' : 'text-green-600';
    return (
        <Card title={title}>
            <div className="pt-2">
                {transactions.map(t => (
                    <div key={t.id} className="flex justify-between">
                        <div>
                            <div className="text-sm">
                                {title.includes("Sent") ? `Sent INR to ${t.toUser?.name}` : `Received INR from ${t.fromUser?.name}`}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {new Date(t.time).toDateString()}
                            </div>
                        </div>
                        <div className={`flex flex-col justify-center ${condition}`}>
                            {title.includes("Sent") ? `- Rs ${t.amount / 100}` : `+ Rs ${t.amount / 100}`}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
