import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import CustomerOrderDetailsView from "./order-details";

const CustomerOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    return (
        <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          
                  <TableRow>
                    <TableCell>123456</TableCell>
                    <TableCell>27/06/2025</TableCell>
                    <TableCell>
                 pending
                    </TableCell>
                    <TableCell>$100</TableCell>
                    <TableCell>
                    <Dialog open={openDetailsDialog}
                        onOpenChange={ 
                          setOpenDetailsDialog
                          
                        }>

                    <Button
                        onClick={()=>setOpenDetailsDialog(true)}
                        >
                          View Details
                        </Button>
                        <CustomerOrderDetailsView/>
                    </Dialog>
                       
                    
                      
                    </TableCell>
                  </TableRow>
            
          </TableBody>
        </Table>
      </CardContent>
     </Card>
    
     
    );
};
export default CustomerOrders;