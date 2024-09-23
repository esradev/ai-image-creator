import RegisterForm from "../components/RegisterForm";

export default function Page() {
  return (
    <div>
      <p className="text-center text-2xl text-gray-600 mb-5">
        Don't Have and account? <strong>Create One</strong>
      </p>
      <RegisterForm />
    </div>
  );
}
