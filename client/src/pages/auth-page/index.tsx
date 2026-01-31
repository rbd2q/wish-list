import { FC } from 'react';
import { AuthorizationForm } from '@/entities/authorization-form';
import styles from './auth-page.module.css';

export const AuthPage: FC = () => (
  <div className={styles.AuthWrapper}>
    <AuthorizationForm />
  </div>
);
