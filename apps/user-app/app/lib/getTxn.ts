import prisma from "@repo/db/client";

async function getAllTransactions(userId: number) {
  const sentP2PTransfers = await prisma.p2pTransfer.findMany({
    where: { fromUserId: userId },
    select: {
      amount: true,
      timestamp: true,
    },
  });

  const receivedP2PTransfers = await prisma.p2pTransfer.findMany({
    where: { toUserId: userId },
    select: {
      amount: true,
      timestamp: true,
    },
  });

  const sentMerchantTransfers = await prisma.userToMerchantTransaction.findMany({
    where: { userId: userId },
    select: {
      amount: true,
      timestamp: true,
    },
  });

  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: { userId: userId },
    select: {
      amount: true,
      startTime: true,
    },
  });

  const offRampTransactions = await prisma.ofRampTransaction.findMany({
    where: { userId: userId },
    select: {
      amount: true,
      startTime: true,
    },
  });

  const transactions = [
    ...sentP2PTransfers.map(t => ({ amount: t.amount/100, date: t.timestamp, type: 'sent' })),
    ...receivedP2PTransfers.map(t => ({ amount: t.amount/100, date: t.timestamp, type: 'received' })),
    ...sentMerchantTransfers.map(t => ({ amount: t.amount/100, date: t.timestamp, type: 'sent' })),
    ...onRampTransactions.map(t => ({ amount: t.amount/100, date: t.startTime, type: 'received' })),
    ...offRampTransactions.map(t => ({ amount: t.amount/100, date: t.startTime, type: 'received' })),
  ];

  return transactions;
}

export default getAllTransactions;
