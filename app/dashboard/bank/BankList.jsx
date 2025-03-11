import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function BankList({ banks }) {
  return (
    <div className="w-full min-w-xs mx-auto px-0 lg:px-10">
      <div className="rounded-t-lg overflow-x-auto border">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-blue-950/50 hover:bg-blue-900/50">
              <TableHead className="text-blue-100">#</TableHead>
              <TableHead className="text-blue-100">Bank Name</TableHead>
              <TableHead className="text-blue-100">Account Number</TableHead>
              <TableHead className="text-blue-100">Account Name</TableHead>
              <TableHead className="text-blue-100">Bank Address</TableHead>
              <TableHead className="text-blue-100">Routing Number</TableHead>
              <TableHead className="text-blue-100">Swift Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank, index) => (
              <TableRow key={bank._id} className="border-b hover:bg-blue-900/20">
                <TableCell className="text-gray-600">{index + 1}</TableCell>
                <TableCell className="text-gray-600">{bank.bankName}</TableCell>
                <TableCell className="text-gray-600">{bank.accountNumber}</TableCell>
                <TableCell className="text-gray-600">{bank.accountName}</TableCell>
                <TableCell className="text-gray-600">{bank.bankAddress}</TableCell>
                <TableCell className="text-gray-600">{bank.routingNumber}</TableCell>
                <TableCell className="text-gray-600">{bank.swiftCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default BankList;