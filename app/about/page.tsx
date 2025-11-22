import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>About PanelVerse</h1>
                <p className={styles.subtitle}>
                    The ultimate destination for graphic novel enthusiasts to discover, track, and share their reading journey.
                </p>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.text}>
                    Graphic novels are more than just comic books; they are a unique medium of storytelling that combines visual art with literary depth.
                    PanelVerse was created to give this medium the dedicated platform it deserves.
                </p>
                <p className={styles.text}>
                    Whether you're into superhero sagas, indie memoirs, manga masterpieces, or historical epics,
                    PanelVerse helps you find your next favorite read and connect with a community of like-minded readers.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What We Offer</h2>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>🔍</span>
                        <h3 className={styles.featureTitle}>Discovery</h3>
                        <p className={styles.featureText}>
                            Powerful search and filtering tools to help you navigate the vast world of graphic novels.
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>📚</span>
                        <h3 className={styles.featureTitle}>Tracking</h3>
                        <p className={styles.featureText}>
                            Keep track of what you've read, what you're reading, and what you want to read next.
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>💬</span>
                        <h3 className={styles.featureTitle}>Community</h3>
                        <p className={styles.featureText}>
                            Share reviews, join discussions, and see what others are reading.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Open Source</h2>
                <p className={styles.text}>
                    PanelVerse is an open-source project built with modern web technologies like Next.js, TypeScript, and Cloudflare.
                    We believe in transparency and community contribution.
                </p>
                <p className={styles.text}>
                    Interested in contributing? Check out our GitHub repository to see how you can help build the future of PanelVerse.
                </p>
            </section>
        </div>
    );
}
