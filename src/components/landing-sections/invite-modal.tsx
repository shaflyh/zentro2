import GlassButton from "@/components/GlassButton";
import { BorderBeam } from "@/components/BorderBeam";

type InviteModalProps = {
  onClose: () => void;
  onSwitchToSignIn: () => void;
};

export default function InviteModal({
  onClose,
  onSwitchToSignIn,
}: InviteModalProps) {
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
              Request Access
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your invite or referral code to continue
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
                placeholder="Invite code"
                className="relative z-10 w-full px-6 py-4 bg-black/5 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[16px] font-medium transition-all duration-200"
              />
            </div>

            <GlassButton
              variant="cta"
              className="w-full py-4"
              contentClassName="justify-center"
            >
              <span className="text-black font-bold text-lg">Continue</span>
            </GlassButton>

            <div className="text-center space-y-3 pt-4">
              <p className="text-gray-600 text-sm">Already have an account?</p>
              <GlassButton
                className="w-full py-3"
                contentClassName="justify-center"
                onClick={onSwitchToSignIn}
              >
                <span className="text-black font-semibold text-[15px] font-['Satoshi']">
                  Sign in
                </span>
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
