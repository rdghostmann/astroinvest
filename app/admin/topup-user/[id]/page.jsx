import { getUserWithWallet } from '@/lib/actions';
import TopUp from './TopUp';

const Page = async ({ params }) => {
    
  const { id } = params;

  // Fetch user and wallet details
  const data = await getUserWithWallet(id);

  if (!data) {
    return <p className="text-red-500">User not found or wallets unavailable.</p>;
  }

  return <TopUp data={data} />;
};

export default Page;