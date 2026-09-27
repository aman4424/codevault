import AuthLayout from "../layouts/AuthLayout"
import ResetPasswordForm from "../components/ResetPasswordForm"
const ResetPassword = () => {
  return (
    <AuthLayout heading="Set a new password" description="Choose a new password for your CodeVault account.">
        <ResetPasswordForm/>
    </AuthLayout>
  )
}

export default ResetPassword
