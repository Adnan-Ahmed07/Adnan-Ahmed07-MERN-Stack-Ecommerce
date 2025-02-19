import { addressFormControls } from "@/config";

import { useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
const Address=()=>{
  const [formData, setFormData] = useState(initialAddressFormData);


  function handleManageAddress(event) {
    event.preventDefault();

  
  }
    
  return(
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
       Address List
      </div>
      <CardHeader>
        <CardTitle>
         Add new Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={ "Add"}
          onSubmit={handleManageAddress}
          
        />
      </CardContent>
    </Card>
  );
}
export default Address;