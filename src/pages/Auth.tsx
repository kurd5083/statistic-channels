import { useState } from "react";
import { useNavigate } from "react-router";

import { useLogin } from "@/lib/useLogin";

const Auth = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate();
  
  const { mutate: mutateLogin } = useLogin();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateLogin({ username, password }, {
      onSuccess: () => navigate('/')
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F5F6FA] mx-5">
      <div className="w-full max-w-md p-8 bg-[#FCFDFF] rounded-[16px] shadow-lg">
        <h1 className="text-3xl font-semibold mb-4 text-center">Вход в аккаунт</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-[#A3ABBC]">
              Имя пользователя
            </label>
            <input
              type="text"
              placeholder="Введите имя пользователя"
              className="p-3 rounded-lg border border-[#E9EDF6] focus:outline-none focus:ring-2 focus:ring-[#488BFF] transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-[#A3ABBC]">
              Пароль
            </label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="p-3 rounded-lg border border-[#E9EDF6] focus:outline-none focus:ring-2 focus:ring-[#488BFF] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#488BFF] hover:bg-[#488BFF] text-white font-semibold py-3 rounded-lg transition"
          >
            Войти
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
