import React from 'react'
import { HandHelping } from "lucide-react";


const TotalInvest = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md flex items-center justify-between">
      <p>Total Investment</p>
       <div className="text-green-500">
              <HandHelping className="h-10 w-10" />
            </div>
    </div>
  )
}

export default TotalInvest
