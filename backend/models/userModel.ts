interface User {
  email: string;
  password: string;
  role: "vendor" | "delivery" | "customer";
}

export const users: User[] = [
  {
    email: "vendor@example.com",
    password: "vendor123",
    role: "vendor",
  },
  {
    email: "delivery@example.com",
    password: "delivery123",
    role: "delivery",
  },
  {
    email: "customer@example.com",
    password: "customer123",
    role: "customer",
  },
];
