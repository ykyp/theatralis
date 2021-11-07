import React from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";

export default function AboutUs() {
   const { t, lang } = useTranslation('common');
   return (
      <Layout>
         <Head>
            <title>About Us</title>
         </Head>

         <div className="w-full flex justify-around">
            <article className="prose prose-purple max-w-sm lg:max-w-lg">
               <h1>{t("aboutUsHd")}</h1>
               <h3> 💁🏻‍♀️💁🏻‍♂️💁🏻‍♀️️ {t("aboutUsSubhd")}</h3>

               <p>Είμαστε μια ομάδα θεατρόφιλων (ναι, μπορούμε να χρησιμοποιήσουμε αυτό τον χαρακτηρισμό
                  γιατί περάσαμε αμέτρητες ώρες στα θεατρικά καθίσματα και μπροστά από μια θεατρική σκηνή)
                  που παρακολουθούμε ενεργά τα θεατρικά δρώμενα της Κύπρου την τελευταία δεκαετία.
               </p>

               <p>Όμως, πάντα αντιμετωπίζαμε το ίδιο πρόβλημα μέχρι να επιλέξουμε μία συγκεκριμένη παράσταση. Η εύρεση και η αναζήτηση όλων των παρουσών θεατρικών παραστάσεων ήταν πάντα ανέφικτη έως αδύνατη με αποτέλεσμα να καταλήγουμε πάντα στη επιλογή θεατρικών
               παραστάσεων μεγάλων θιάσων που είχαν τη δική τους ιστοσελίδα παρουσίασης ή να ταλαιπωρούμαστε μέχρι να εντοπίσουμε
               από δω και απ’εκεί διάφορες παραστάσεις. Έτσι αρκετές παραστάσεις που άξιζαν, διέφευγαν της αντίληψής μας ή η αναζήτηση μιας παράστασης κατέληγε πάντα μια χρονοβόρος διαδικασία.
               </p>

               <p>Όποτε αποφασίσαμε να δημιουργήσουμε μία ενιαία ιστοσελίδα όπου θα καταχωρούμε όλες σχεδόν τις θεατρικές παραστάσεις σε όλη την Κύπρο.</p>
            </article>
         </div>
      </Layout>
   )
}

