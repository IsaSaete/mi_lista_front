import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Footer from "@/UI/components/Footer/Footer";

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen max-w-[500px] mx-auto flex flex-col">
      <header className="w-full bg-primary p-4 uppercase">
        <h1 className="text-2xl font-bold text-foreground text-center">
          Mi menú
        </h1>
      </header>
      <main className="p-4 ">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full gap-1 grid-cols-2">
            <TabsTrigger value="login" className="text-base">
              Iniciar sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="text-base">
              Registrarse
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 items-center justify-center">
            <TabsContent value="login">
              <LoginForm onTabChange={setActiveTab} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onTabChange={setActiveTab} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
