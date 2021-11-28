import React from 'react';
import Link from 'next/link';
import useTranslation from "next-translate/useTranslation";
import styles from "../layout.module.css";

const BackToHome = () =>  {
   const {t, lang} = useTranslation('common');

   return (
      <div className={styles.backToHome}>
         <Link href="/">
            <a>  ← {t("backToHome")}</a>
         </Link>
      </div>
   )};

export { BackToHome };
