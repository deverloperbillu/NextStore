// Example API Call in Next.js
import axios from 'axios';


type formData = {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    email: string;
    phone: number;
    product_id: number;
    quantity: number;



}
export const placeOrder = async (formData) => {
  const orderPayload = {
    payment_method: "cod",
    payment_method_title: "Cash on Delivery",
    set_paid: false,
    billing: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address_1: formData.address,
      city: formData.city,
      email: formData.email,
      phone: formData.phone
    },
    shipping: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address_1: formData.address,
      city: formData.city
    },
    line_items: formData.cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }))
  };

  const response = await axios.post(
    'https://dev-nextwebstore.pantheonsite.io/',
    orderPayload,
    {
      auth: {
        username: 'ck_e0e0bf3574a95ae23967a67621f8d769f47856d4',
        password: 'cs_3a02fadba2a1ae408349046349d113a615b05a98'
      }
    }
  );

  return response.data;
};
