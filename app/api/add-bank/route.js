import dbConnect from "@/utils/dbConnect";
import Bank from "@/models/Bank";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { bankName, accountNumber, accountName, bankAddress, routingNumber, swiftCode } = req.body;

      const newBank = new Bank({
        bankName,
        accountNumber,
        accountName,
        bankAddress,
        routingNumber,
        swiftCode,
      });

      await newBank.save();

      res.status(201).json({ message: "Bank account added successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add bank account.", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}