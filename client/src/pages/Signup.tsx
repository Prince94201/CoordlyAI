
import SignupForm from "@/components/auth/SignupForm";
import Layout from "@/components/layout/Layout";

const Signup = () => {
  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
