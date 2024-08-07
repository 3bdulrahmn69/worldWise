import { useEffect, useState } from 'react';
import PageNav from '../Components/PageNav';
import Button from '../Components/Button';

import styles from './Login.module.css';
import { useAuth } from '../Contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('guest@example.com');
  const [password, setPassword] = useState('123456');

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app/cities', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
