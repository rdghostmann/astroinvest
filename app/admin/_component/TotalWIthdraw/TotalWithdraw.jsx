import React from 'react'
import { HandHelping } from "lucide-react";

const TotalWithdraw = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md flex items-center justify-between">
      <p>Withdraw</p>
      <div className="text-green-500">
        <HandHelping className="h-10 w-10" />
      </div>
    </div>
  )
}

export default TotalWithdraw
