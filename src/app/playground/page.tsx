"use client";

import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CheckCircle, Mail, XCircle } from "lucide-react";
import { useState } from "react";

const MOCK_OTP = "123456";

export default function PlaygroundPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"enter-email" | "enter-otp">("enter-email");
  const [isLoading, setIsLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"valid" | "invalid" | null>(null);
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter an email address.",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep("enter-otp");
      setIsLoading(false);
      toast({
        title: "OTP Sent!",
        description: `A mock OTP has been 'sent' to ${email}. Use 123456 to test.`,
      });
    }, 1000);
  };

  const handleValidateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (otp === MOCK_OTP) {
        setValidationStatus("valid");
        toast({
          title: "Success!",
          description: "OTP validation successful.",
          className: "bg-green-600 text-white",
        });
      } else {
        setValidationStatus("invalid");
        toast({
          variant: "destructive",
          title: "Validation Failed",
          description: "The OTP you entered is incorrect.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setEmail("");
    setOtp("");
    setStep("enter-email");
    setValidationStatus(null);
  };
  
  const handleStartOver = () => {
    setOtp("");
    setValidationStatus(null);
    setStep("enter-otp");
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
            <p className="text-muted-foreground">Test your OTP validation in real-time.</p>
        </div>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>OTP Validation Test</CardTitle>
            <CardDescription>Enter an email to receive a test OTP and validate it.</CardDescription>
          </CardHeader>
          {validationStatus ? (
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-8">
                {validationStatus === 'valid' ? (
                    <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                    <XCircle className="h-16 w-16 text-destructive" />
                )}
                <h2 className="text-2xl font-bold">
                    {validationStatus === 'valid' ? 'Validation Successful' : 'Validation Failed'}
                </h2>
                <p className="text-muted-foreground">
                    {validationStatus === 'valid' 
                        ? `The OTP for ${email} was validated successfully.`
                        : `The OTP you entered was incorrect.`}
                </p>
                <Button onClick={handleReset}>Start New Test</Button>
            </CardContent>
          ) : (
            <form onSubmit={step === 'enter-email' ? handleSendOtp : handleValidateOtp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={step === 'enter-otp'}
                  />
                </div>
                
                {step === 'enter-otp' && (
                    <div className="space-y-2 animate-in fade-in">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <Input 
                            id="otp"
                            placeholder="Enter the 6-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                        />
                    </div>
                )}
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : step === 'enter-email' ? 'Send OTP' : 'Validate OTP'}
                </Button>
                {step === 'enter-otp' && (
                  <Button variant="link" size="sm" onClick={handleReset} className="text-muted-foreground">
                    Change email address
                  </Button>
                )}
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
