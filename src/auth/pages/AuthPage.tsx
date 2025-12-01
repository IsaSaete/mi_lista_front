import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex justify-center pt-3 rounded-md">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full gap-1 grid-cols-2">
          <TabsTrigger value="login" className="text-base">
            Iniciar sesión
          </TabsTrigger>
          <TabsTrigger value="register" className="text-base">
            Registrarse
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm onTabChange={setActiveTab} />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm onTabChange={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
