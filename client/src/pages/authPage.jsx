import AuthForm from "../components/auth/authForm";
  
const AuthPage = () => {


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section - Auth Form */}
      <AuthForm />


      {/* Right Section - Chat Preview */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white items-center justify-center p-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold leading-tight">
            Connect & Chat in <br /> Real Time <div className="animate-bounce inline-block w-0">🚀</div>
          </h2>
          <p className="text-lg text-gray-200">
            Enjoy instant messaging, group chats, and seamless communication
            with friends.
          </p>

          {/* Chat preview mockup */}
          <div className="bg-white rounded-2xl shadow-xl p-4 text-gray-800 max-w-sm">
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">Hey! 👋</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-success">
                Hello! How are you?
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">
                I’m good, thanks! Excited to try this app 😍
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
