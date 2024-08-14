import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())



app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    const isValidToken = await db.onRampTransaction.findFirst({
        where: {
            token: paymentInformation.token
        }
    });
    
    if(!isValidToken) {
        res.status(400).json({
            message: "Invalid token"
        });
        return;
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})
app.post('/withdraw-bank', async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        withdrawAmount: number;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        withdrawAmount: Number(req.body.amount),
    };

    // Log values to debug
    console.log('Parsed User ID:', Number(paymentInformation.userId));
    console.log('Parsed Withdraw Amount:', Number(paymentInformation.withdrawAmount));

    if (isNaN(paymentInformation.withdrawAmount)) {
        res.status(400).json({ message: 'Invalid withdraw amount' });
        return;
    }

    try {
        const isValidToken = await db.ofRampTransaction.findFirst({
            where: { token: paymentInformation.token },
        });

        if (!isValidToken) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }

        const user = await db.balance.findFirst({
            where: { userId: Number(paymentInformation.userId) },
        });

        if (!user || user.amount < paymentInformation.withdrawAmount) {
            res.status(400).json({ message: "Insufficient balance" });
            return;
        }

        await db.$transaction([
            db.balance.updateMany({
                where: { userId: Number(paymentInformation.userId) },
                data: {
                    amount: {
                        decrement: Number(paymentInformation.withdrawAmount),
                    },
                },
            }),
            db.ofRampTransaction.updateMany({
                where: { token: paymentInformation.token },
                data: { status: "Success" },
            }),
        ]);

        res.json({ message: "Withdrawal successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while processing withdrawal" });
    }
});

app.post("/merchant/withdraw-bank", async (req, res) => {
    const paymentInformation: {
        token: string;
        merchantId: number;
        withdrawAmount: number;
    } = {
        token: req.body.token,
        merchantId: req.body.merchant_identifier,
        withdrawAmount: Number(req.body.amount),
    };

    // Log values to debug
    console.log('Parsed Merchant ID:', Number(paymentInformation.merchantId));
    console.log('Parsed Withdraw Amount:', Number(paymentInformation.withdrawAmount));

    if (isNaN(paymentInformation.withdrawAmount)) {
        res.status(400).json({ message: 'Invalid withdraw amount' });
        return;
    }

    try {
        const isValidToken = await db.merchantOfRampTransaction.findFirst({
            where: { token: paymentInformation.token },
        });

        if (!isValidToken) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }

        const merchant = await db.balance.findFirst({
            where: { merchantId: Number(paymentInformation.merchantId) },
        });

        if (!merchant || merchant.locked < paymentInformation.withdrawAmount) {
            console.log(merchant);
            res.status(400).json({ message: "Insufficient balance" });
            return;
        }

        await db.$transaction([
            db.balance.updateMany({
                where: { merchantId: Number(paymentInformation.merchantId) },
                data: {
                    locked: {
                        decrement: Number(paymentInformation.withdrawAmount),
                    }
                },
            }),
            db.merchantOfRampTransaction.updateMany({
                where: { token: paymentInformation.token },
                data: { status: "Success" },
            }),
        ]);

        res.json({ message: "Withdrawal successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while processing withdrawal" });
    }
});


app.listen(3003 , ()=>{
    console.log("Running on port 3003");
     
});