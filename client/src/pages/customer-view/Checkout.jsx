import Address from "@/components/customer-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/customer-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/customer/order-slice";
import { useToast } from "@/hooks/use-toast";

const CustomerCheckout = () => {
  const { cartItems } = useSelector((state) => state.customerCart);
  const { user} = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.customerOrder);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const totalCartAmount =
  cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;
  const handleInitiatePaypalPaymet = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }
    const orderData = {
      userId:user?.id,
      cartId:cartItems?._id,
      cartItems:cartItems.items.map(singleCartItem=>({ 
        productId:singleCartItem?.productId,
        image:singleCartItem?.image,
        title:singleCartItem?.title,
        price:
        singleCartItem?.salePrice > 0
          ? singleCartItem?.salePrice
          : singleCartItem?.price,
        salePrice:singleCartItem.salePrice,
        quantity:singleCartItem.quantity
      })),
      addressInfo:{ 
        address:currentSelectedAddress?.address,
        city:currentSelectedAddress?.city,
        phone:currentSelectedAddress?.phone,
        pincode:currentSelectedAddress?.pincode,
        notes:currentSelectedAddress?.notes
      },
      orderStatus:'pending',
      paymentMethod:'paypal',
      paymentStatus:'pending',
      totalAmount:totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId:'',
      payerId:'',
      
    }
   console.log(orderData,"Adnandata"); 

   dispatch(createNewOrder(orderData)).then((data) => {
    console.log(data, "Adnan");
    if (data?.payload?.success) {
      setIsPaymemntStart(true);
    } else {
      setIsPaymemntStart(false);
    }
  });
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
    <div className="relative h-[300px] w-full overflow-hidden">
      <img src={img} className="h-full w-full object-cover object-center" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
      <Address
        setCurrentSelectedAddress={setCurrentSelectedAddress}
      />
      <div className="flex flex-col gap-4">
        {cartItems && cartItems.items && cartItems.items.length > 0
          ? cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} />
            ))
          : null}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">TK:৳{totalCartAmount}</span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button onClick={handleInitiatePaypalPaymet} className="w-full">
           Pay With PayPal
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CustomerCheckout;