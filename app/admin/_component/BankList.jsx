import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function BankList({ banks }) {
  return (
    <div class="flex flex-col overflow-x-auto">
      <div class="sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="rounded-t-lg overflow-x-auto border">
            <Table className="min-w-full text-start text-sm font-light">
              <TableHeader>
                <TableRow className="border-b border-neutral-200 bg-blue-950/50 hover:bg-blue-900/50">
                  <TableHead className="text-blue-100 px-6 py-4">#</TableHead>
                  <TableHead className="text-blue-100 px-6 py-4">Bank Name</TableHead>
                  <TableHead className="text-blue-100 px-6 py-4">Account Number</TableHead>
                  <TableHead className="text-blue-100 px-6 py-4">Account Name</TableHead>
                  <TableHead className="text-blue-100 px-6 py-4">Bank Address</TableHead>
                  <TableHead className="text-blue-100 px-6 py-4">Routing Number</TableHead>
                  <TableHead className="text-blue-100 px-6 py-4">Swift Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banks.map((bank, index) => (
                  <TableRow key={bank._id} className="border-b border-neutral-200 hover:bg-blue-900/20">
                    <TableCell className="text-gray-600 px-6 py-4">{index + 1}</TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">{bank.bankName}</TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">{bank.accountNumber}</TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">{bank.accountName}</TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">{bank.bankAddress}</TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">{bank.routingNumber}</TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">{bank.swiftCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>

  );
}

export default BankList;

