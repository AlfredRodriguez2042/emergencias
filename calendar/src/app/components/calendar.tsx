"use client";
import { PlanetaryService } from "@/services";
import { useEffect, useState } from "react";
import styles from "./calendar.module.css";
import CardContent from "./card/cardContent";
import CardHeader from "./card/cardHeader";
import Modal from "./modal";
type Item = {
  hdurl: string;
  title: string;
  explanation: string;
  copyright: string;
};
const Calendar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Item | null>(null);
  const [data, setData] = useState<Item[] | undefined>();
  useEffect(() => {
    PlanetaryService({
      start_date: "2023-2-1",
      end_date: "2023-2-28",
    }).then((res) => setData(res));
  }, []);

  return (
    <div className={styles.container}>
      <CardHeader />
      {data && <CardContent data={data} setOpen={setOpen} setItem={setItem} />}

      {open && <Modal item={item} setOpen={setOpen} />}
    </div>
  );
};

export default Calendar;
