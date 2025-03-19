import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "./ui/button";
import { verifyOtp } from "@/utils/supabase/auth";
import { useRouter } from "next/router";

interface OTPModalProps {
  open: boolean;
  email: string;
}

const OTPModal: React.FC<OTPModalProps> = ({ open, email }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await verifyOtp(email, password);

      if (response.success) {
        console.log("OTP verified successfully!");
        router.push("/")
      } else {
        console.error("OTP verification failed:", response.error);
      }
    } catch (error) {
      console.error("Failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResentOtp = async () => {
    // Your resend OTP logic here
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter Your OTP
            <Image
              alt="close"
              src="/assets/icons/close-dark.svg"
              width={20}
              height={20}
              className="otp-close-button"
              onClick={() => setIsOpen(false)}
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We have sent an OTP to your{" "}
            <span className="pl-1 text-brand-100">{email}</span> address.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            {/* </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup> */}
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex flex-col w-full gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Continue
              {isLoading && (
                <Image
                  alt=""
                  src="/assets/icons/loader.svg"
                  height={24}
                  width={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>
            <div className="sutitle-2 mt-2 text-center text-light-100">
              Didn't receive the OTP?{" "}
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand-100"
                onClick={handleResentOtp}
              >
                Resend OTP
              </Button>
            </div>
          </div>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
