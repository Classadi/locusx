import React from "react";

interface AssignModalProps {
  visible: boolean;
  orderId: string | null;
  onClose: () => void;
  onConfirm: (orderId: string, agentId: string) => void;
}

const AssignModal: React.FC<AssignModalProps> = ({
  visible,
  orderId,
  onClose,
  onConfirm,
}) => {
  const [agentId, setAgentId] = React.useState("");

  if (!visible || !orderId) return null;

  const handleConfirm = () => {
    onConfirm(orderId, agentId);
    setAgentId("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "black",
          padding: "2rem",
          borderRadius: "8px",
          position: "relative",
          fontSize: "25px",
        }}
      >
        <h3>Assign Delivery Agent</h3>
        <p>Order ID: {orderId}</p>
        <input
          type="text"
          placeholder="Enter Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          style={{
            margin: "15px",
            fontSize: "18px",
            border: "solid 1px gray",
            padding: "5px",
            borderRadius: "10px",
          }}
        />
        <div>
          <center>
            <button
              onClick={handleConfirm}
              className="mr-4 text-[15px] border-l-2 border-r-2 border-[#50ffa5] text-white p-[10px] hover:border-l-0 hover:border-r-0 hover:border-t-2 hover:border-b-2 transition-all cursor-pointer ease"
            >
              Confirm
            </button>
          </center>
          <button
            style={{
              position: "absolute",
              right: "10px",
              top: "5px",
              cursor: "pointer",
              color: "#50ffa5",
            }}
            onClick={onClose}
            title="close"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
