import { AuthorizationForm } from '../../entities/authorization-form';
import { FC } from 'react';
import styles from './auth-page.module.css';

export const AuthPage: FC = () => {
  return (
    <div className={styles.AuthWrapper}>
      <AuthorizationForm />
    </div>
  );
};
