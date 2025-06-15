import { useState } from 'react';
import validator from 'validator';



interface Props {
    setLoginSuccess: (success: boolean) => void;
}

export const LoginPage = ({setLoginSuccess}: Props) => {
  
    const [userId, setUserId] = useState<string>('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
      if (validator.isUUID(userId)) {    
        setLoginSuccess(true);
        
        localStorage.setItem('userId', userId);
      }

    }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.squarespace-cdn.com/content/v1/535b1632e4b0ab57db46e48b/1607375832504-4387KQHAOBLTVT0NGJ2W/sunset4.jpg?format=1000w"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="userid" className="block text-gray-600">
              User ID
            </label>
            <input
              type="text"
              id="userid"
              name="userid"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="off"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>

        {/* Sign up Link */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
};
