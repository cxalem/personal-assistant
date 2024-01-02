import { Button } from "./ui/button";

type LoginButtonProps = {
  children: React.ReactNode;
};

export const LoginButton: React.FC<LoginButtonProps> = ({ children }) => {
  return (
    <Button className="bg-green-500 hover:bg-green-400 px-10">
      {children}
    </Button>
  );
};
