export type MockUser = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro";
  streak: number;
  avatar: string;
  isDemo: boolean;
};
