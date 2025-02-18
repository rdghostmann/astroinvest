import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const kycForm = () => {
  return (
    <form className="space-y-4">

      <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="w-full">
          <Label htmlFor="" className="text-sm text-gray-500">Identification Type:</Label>
          <Select className="bg-transparent p-2 rounded w-full">
            <SelectTrigger className="bg-transparent p-2 rounded w-full">
              <SelectValue placeholder="-- Select Asset --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>International Passport</SelectItem>
              <SelectItem>Driver's License</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="w-full">
          <Label className="text-sm text-gray-500">Identity Front:</Label>
          <Input
            type="file"
            className="bg-transparent p-2 rounded w-full"
            disabled
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="w-full">
          <Label className="text-sm text-gray-500">Identity Back:</Label>
          <Input
            type="file"
            className="bg-transparent p-2 rounded w-full"
            disabled
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg mt-6">
        Upload
      </Button>

    </form>
  )
}

export default kycForm
