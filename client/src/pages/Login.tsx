
import LoginForm from "@/components/auth/LoginForm";
import Layout from "@/components/layout/Layout";

const Login = () => {
  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
