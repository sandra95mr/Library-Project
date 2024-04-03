const controladorTransaction ={}
const transactions = require("../models/transaction")

controladorTransaction.getTransactionByUser = async (req, res) => {
  const userId = req.params.userId;
  const userTransactions = await transactions.find({ user_id: userId });
  res.json(userTransactions);
};


controladorTransaction.createTransaction = async (req, res) => {
  const transaction = new transactions({
    user_id:req.body.user_id,
    total:req.body.total,
    products:req.body.products
  });
  await transaction.save();
  res.json({ status: "Transacción Creada" });
};


controladorTransaction.getTransactions = async (req, res) => {
  try {
    const transactionsList = await transactions.find();
    res.json(transactionsList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener las transacciones" });
  }
};


module.exports = controladorTransaction;