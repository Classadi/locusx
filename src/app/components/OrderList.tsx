import React from "react";

interface Order {
  id: string;
  customerName: string;
  status: string;
}

interface OrderListProps {
  orders: Order[];
  onAssign: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onAssign }) => {
  return (
    <div>
      <div className="border-[gold] border-1 hover:border-[#deff49] hover:text-[#deff49] p-1 w-[100px] rounded-full cursor-pointer text-[gold]">
        <center>Orders</center>
      </div>
      <br />
      <div>
        <ul
          style={{ listStyle: "none", padding: 0 }}
          className="flex flex-row "
        >
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "10px",
                height: "200px",
                width: "300px",
              }}
            >
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <br />
              <center>
                <button
                  className="bg-[#004239] hover:bg-[#0042399f] cursor-pointer p-[5px] px-[5px] rounded-full"
                  onClick={() => onAssign(order.id)}
                >
                  Assign Delivery
                </button>
              </center>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderList;
