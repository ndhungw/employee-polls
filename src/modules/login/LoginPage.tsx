import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="h-full container flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
export { LoginPage as Route };
