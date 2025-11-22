import { signIn } from '@/auth';
import styles from './page.module.css';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to access your library</p>

                <form
                    action={async () => {
                        "use server"
                        await signIn("google", { redirectTo: "/library" })
                    }}
                >
                    <button className={styles.socialButton} type="submit">
                        <span style={{ fontSize: '20px' }}>G</span>
                        Sign in with Google
                    </button>
                </form>

                <div className={styles.divider}>OR</div>

                <form
                    className={styles.form}
                    action={async (formData) => {
                        "use server"
                        await signIn("credentials", formData)
                    }}
                >
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            className={styles.input}
                            id="email"
                            name="email"
                            type="email"
                            defaultValue="demo@example.com"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            className={styles.input}
                            id="password"
                            name="password"
                            type="password"
                            defaultValue="password"
                            required
                        />
                    </div>
                    <button className={styles.button} type="submit">
                        Sign In with Demo Account
                    </button>
                </form>
            </div>
        </div>
    );
}
