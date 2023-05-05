import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginLayout } from './layouts';
import { LoginForm, ResetPasswordForm, ChangePasswordForm, CreateAccountForm } from './pages/login/index';

export default function UnauthenticatedContent() {
  return (
    <Routes>
      <Route
        path='/login' 
        element={
          <LoginLayout title="Sign In">
            <LoginForm />
          </LoginLayout>
        }
      />
      <Route
        path='/create-account'
        element={
          <LoginLayout title="Sign Up">
            <CreateAccountForm />
          </LoginLayout>
        }
      />
      <Route 
        path='/reset-password'
        element={
          <LoginLayout
            title="Reset Password"
            description="Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
          >
            <ResetPasswordForm />
          </LoginLayout>
        }
      />
      <Route
        path='/change-password/:recoveryCode'
        element={
          <LoginLayout title="Change Password">
            <ChangePasswordForm />
          </LoginLayout>
        }
      />
      <Route path='*' element={<Navigate to={'/login'} />}></Route>
    </Routes>
  );
}
