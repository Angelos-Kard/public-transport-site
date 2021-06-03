# Public Transport Site
Ομαδικό Project

Καρδούτσος Άγγελος

Καλδής Χρήστος

---

Η εργασία αυτή υλοποιήθηκε στα πλαίσια του μαθήματος "Προγραμματισμός Διαδικτύου" για το ακαδημαϊκό έτος 2020-2021.

## Εγκατάσταση
Για την εγκατάσταση του συγκεκριμένου package: 
1. [Κατεβάζετε τον κώδικα](https://github.com/Angelos-Kard/public-transport-site/archive/refs/heads/master.zip)
2. Επιλέγεται το φάκελο στον οποίο αποσυμπιέζεται το .zip αρχείο

- **Περίπτωση Α**

3. Ανοίγετε το τερματικό στο συγκεκριμένο φάκελο
4. Εκτελείτε την εντολή `npm install -dev` με σκοπό να εγκαθιστούν τα dependencies και τα devDependencies
5. "Τρέχετε" τον server τοπικά εκτελώντας στο τερματικό την εντολή `npm run debug`.
Για να τρέξει ο server τοπικά, απαιτείται να οριστούν ορισμένες enviromental variables, ώστε να είναι δυνατή η επικοινωνία με τη βάση δεδομένων.
Επομένως πρέπει να οριστεί ένα `.env` αρχείο. Το αρχείο αυτό πρέπει να βρίσκεται στον root φάκελο και να έχει τη μορφή:
```
HOST=...
DB_PORT=...
USER_DB=...
PASSWORD=...
DB_NAME=...
```

- **Περίπτωση Β**

3. Εκτελείτε το αρχείο [initProject.bat](initProject.bat)

## Dependencies
- [express](https://github.com/expressjs/express)
- [express-handlebars](https://github.com/express-handlebars/express-handlebars)
- [mysql](https://github.com/mysqljs/mysql)
- [dotenv](https://github.com/mysqljs/mysql)

## Ιστοσελίδα
- [x] [Site link](https://angelos-kard.github.io/public-transport-site/)
