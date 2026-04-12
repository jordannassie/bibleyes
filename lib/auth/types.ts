export type MockUser = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Plus";
  streak: number;
  avatar: string;
  isDemo: boolean;
};
