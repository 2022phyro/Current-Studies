var customerList=[];

const addCustomer=(CustomerId, CustomerName,CustomerAge,CustomerAddress,CustomerContactNumber,Category)=>{
	customer = [CustomerId, CustomerName,CustomerAge,CustomerAddress,CustomerContactNumber,Category]
	if (!customerList.find(cmer => cmer[0] == CustomerId))  {
		customerList.push(customer)	
	}
}

const updateCustomer=(CustomerId, CustomerName,CustomerAge,CustomerAddress,CustomerContactNumber,Category)=>{
      cId = customerList.findIndex(cmer => cmer[0 ] == CustomerId);
	if (cId  >= 0) {
		customerList [cId] = [CustomerId, CustomerName,CustomerAge,CustomerAddress,CustomerContactNumber,Category]
	}
}

const getAllCustomers=()=>{
  // Write the Logic here
	return customerList
}

module.exports={addCustomer,updateCustomer,getAllCustomers}
