import { toast } from "sonner";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" width="21" height="21">
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.2H24v8h11a9.4 9.4 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.8 6-15.2Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.2a12.2 12.2 0 0 1-18.1-6.4H5.8v5.3A20.4 20.4 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.7 27.5a12.3 12.3 0 0 1 0-7.8v-5.3H5.8a20 20 0 0 0 0 18.4l6.9-5.3Z"
      />
      <path
        fill="#EA4335"
        d="M24 11.3c3 0 5.6 1 7.7 3l5.8-5.8A19.4 19.4 0 0 0 24 3.2 20.4 20.4 0 0 0 5.8 14.4l6.9 5.3A12.1 12.1 0 0 1 24 11.3Z"
      />
    </svg>
  );
}

export function GoogleButton() {
  return (
    <button
      type="button"
      className="google-button"
      aria-describedby="oauth-notice"
      onClick={() =>
        toast.info(
          "Google sign-in is coming in Phase 2. No authentication is configured yet.",
        )
      }
    >
      <GoogleIcon />
      <span>Continue with Google</span>
    </button>
  );
}
