import Calendar from "./components/calendar";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Calendar />
    </main>
  );
}
