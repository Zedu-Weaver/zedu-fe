import type { Metadata } from "next";
import Image from "next/image";
import { members } from "../index";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Zedu-Weaver — Our Team",
  description: "Meet the 17 members of the Zedu-Weaver team.",
};

export default function ContributorsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.masthead}>
          <Image
            className={styles.logo}
            src="/contributors-zedu-logo.png"
            alt="Zedu logo: a purple bell with a lightning bolt beside the Zedu wordmark"
            width={1780}
            height={884}
            priority
          />
        </div>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Our team</p>
          <h1 className={styles.title}>
            Zedu-Weaver<span aria-hidden="true">.</span>
          </h1>
        </header>

        <section aria-labelledby="members-heading">
          <div className={styles.rosterHeading}>
            <h2 id="members-heading">Team members</h2>
            <span className={styles.count}>{members.length} members</span>
          </div>
          <ol className={styles.roster}>
            {members.map(({ fullName, username }) => (
              <li className={styles.member} key={fullName}>
                <span className={styles.name}>{fullName}</span>
                <span className={styles.username}>{username}</span>
              </li>
            ))}
          </ol>
        </section>

        <footer className={styles.footer}>
          <span>Zedu-Weaver</span>
          <span className={styles.endMark} aria-hidden="true">
            ZW / {members.length}
          </span>
        </footer>
      </div>
    </main>
  );
}
