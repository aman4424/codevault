import AuthLayout from "../layouts/AuthLayout"; 
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useState } from "react";
const ForgotPassword = () => {
     
  return (
    <AuthLayout heading="Forgot your password?" description="Enter your email and we'll send you a reset link.">
        <ForgotPasswordForm/>
    </AuthLayout>
  )
}

export default ForgotPassword
