"use client";
import Image from "next/image";
import styles from "./modal.module.css";
type Item = {
  hdurl: string;
  title: string;
  explanation: string;
  copyright: string;
};
type Props = {
  item: Item | null;
  setOpen: (close: boolean) => void;
};
const Modal = ({ item, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div></div>
      <div className={styles.modal}>
        <div className={styles.modalOverlay}> </div>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{item?.title}</h2>
            <button className={styles.closeButton} onClick={handleClose}>
              x
            </button>
          </div>
          <div>
            <div className={styles.media}>
              <Image
                src={item!.hdurl}
                alt={item!.title}
                priority
                width={500}
                height={500}
              />
            </div>
            <p className={styles.description}>{item?.explanation}</p>
            <span className={styles.caption}>{item?.copyright}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
