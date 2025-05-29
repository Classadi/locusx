import React, { useState } from "react";
import OrderList from "../../src/app/components/OrderList";
import AssignModal from "../../src/app/components/AssignModal";
import Navbar from "@/app/components/Navbar";

const VendorDashboard = () => {
  const [orders, setOrders] = useState([
    { id: "1", customerName: "Alice", status: "Pending" },
    { id: "2", customerName: "Bob", status: "Pending" },
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAssign = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrderId(null);
  };

  const handleModalConfirm = (orderId: string, agentId: string) => {
    console.log(`Assigning agent ${agentId} to order ${orderId}`);
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: `Assigned to ${agentId}` }
          : order
      )
    );
  };

  return (
    <div
      className="bg-[#001613] w-[100%] h-[900px]"
      style={{ padding: "2rem", fontFamily: "monospace", fontSize: "20px" }}
    >
      <Navbar>
        <h2
          className="cursor-pointer text-amber-50 hover:text-amber-300 transition-all text-[20px]"
          onClick={() => (window.location.href = "http://localhost:3000")}
        >
          Logout
        </h2>
      </Navbar>
      <center>
        {" "}
        <h1
          className="text-[40px]"
          style={{ fontFamily: "Times", marginTop: "20px" }}
        >
          Vendor Dashboard
        </h1>
        <hr className="w-[600px]" />
        <br />
        <br />
      </center>
      <OrderList orders={orders} onAssign={handleAssign} />
      <AssignModal
        visible={isModalVisible}
        orderId={selectedOrderId}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default VendorDashboard;
