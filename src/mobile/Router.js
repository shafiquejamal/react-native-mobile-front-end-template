import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import LoginForm from './access/authentication/LoginForm';
import Settings from './access/authentication/Settings';
import ChangePassword from './access/authentication/ChangePassword';
import RegisterForm from './access/registration/RegisterForm';
import ActivateForm from './access/activation/ActivateForm';
import ResetPasswordForm from './access/authentication/ResetPasswordForm';
import SampleForm from './domain/SampleForm';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }} >

      <Scene key="authentication">
        <Scene key="login" component={LoginForm} title="Login" initial />
        <Scene key="resetPassword" component={ResetPasswordForm} title="Reset Password" />
      </Scene>

      <Scene key="registration">
        <Scene key="register" component={RegisterForm} title="Register" />
      </Scene>

      <Scene key="settings">
        <Scene
          key="userSettings"
          component={Settings}
          title="Settings"
          rightTitle="Domain"
          onRight={() => Actions.domain()}
        />
        <Scene key="changePassword" component={ChangePassword} title="Change Password" />
      </Scene>

      <Scene key="activation">
        <Scene key="activate" component={ActivateForm} title="Activate" />
      </Scene>

      <Scene key="domain">
        <Scene
          key="landing"
          component={SampleForm}
          title="Landing Page"
          rightTitle="Settings"
          onRight={() => Actions.settings()}
        />
      </Scene>

    </Router>
  );
};

export default RouterComponent;
