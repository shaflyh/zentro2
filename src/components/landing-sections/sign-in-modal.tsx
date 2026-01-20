import GlassButton from "@/components/GlassButton";
import { BorderBeam } from "@/components/BorderBeam";

type SignInModalProps = {
  onClose: () => void;
};

export default function SignInModal({ onClose }: SignInModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-['Satoshi']">
              Sign in
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative rounded-[24px] overflow-hidden">
              <BorderBeam
                size={200}
                duration={15}
                colorFrom="#FF6B9D"
                colorTo="#E91E8C"
                borderWidth={2}
              />
              <input
                type="text"
                placeholder="Username"
                className="relative z-10 w-full px-6 py-4 bg-black/5 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[16px] font-medium transition-all duration-200"
              />
            </div>

            <div className="relative rounded-[24px] overflow-hidden">
              <BorderBeam
                size={200}
                duration={15}
                colorFrom="#FF6B9D"
                colorTo="#E91E8C"
                borderWidth={2}
              />
              <input
                type="password"
                placeholder="Password"
                className="relative z-10 w-full px-6 py-4 bg-black/5 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[16px] font-medium transition-all duration-200"
              />
            </div>

            <GlassButton
              variant="cta"
              className="w-full py-4"
              contentClassName="justify-center"
            >
              <span className="text-black font-bold text-lg">Sign in</span>
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
}
