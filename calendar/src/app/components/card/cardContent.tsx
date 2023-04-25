"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";
type Props = {
  data: any[];
  setOpen: (close: boolean) => void;
  setItem: (item: any) => void;
};

const CardContent = ({ data, setOpen, setItem }: Props) => {
  const [selected, setSelected] = useState("");
  const handleModal = (el: any) => {
    setSelected(el.date);
    setItem(el);
    setOpen(true);
  };
  return (
    <div className={clsx(styles.CardContent, styles.cardGrid)}>
      {data.map((el: any, index: number) => (
        <div
          key={el.title}
          className={clsx(styles.cardItem, {
            [styles.active]: el.date === selected,
          })}
          onClick={() => handleModal(el)}
        >
          <Image
            src={el.url}
            alt={el.title}
            width={50}
            height={50}
            priority
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <div className={styles.cardOverlay}>{index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default CardContent;
