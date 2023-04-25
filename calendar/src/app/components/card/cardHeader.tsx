import styles from "./styles.module.css";

const daysOfWeek = ["Sum", "Mon", "The", "Wend", "Thu", "Fri", "Sat"];
const CardHeader = () => {
  return (
    <div>
      <div className={styles.cardTitle}>
        <h3>Calendar Frebrary</h3>
      </div>
      <div className={styles.cardGrid}>
        {daysOfWeek.map((day: string) => (
          <div key={day} className={styles.cardSubTitle}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHeader;
