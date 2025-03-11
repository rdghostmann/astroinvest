'use client';

const BankTable = ({ banks }) => {
  return (
    <div className="max-w-3xl md:w-screen mx-auto overflow-x-scroll my-6 bg-white shadow-md p-4 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="text-slate-600 text-sm/5">
            <th>#</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Account Name</th>
            <th>Bank Address</th>
            <th>Routing Number</th>
            <th>Swift Code</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {banks.length > 0 ? (
            banks.map((bank, index) => (
              <tr key={bank.id || index} className="border-t">
                <td>{index + 1}</td>
                <td>{bank.bankName}</td>
                <td>{bank.accountNumber}</td>
                <td>{bank.accountName}</td>
                <td>{bank.bankAddress}</td>
                <td>{bank.routingNumber}</td>
                <td>{bank.swiftCode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-gray-500">No banks added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BankTable;
