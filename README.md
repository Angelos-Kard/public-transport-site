# Public Transportation Site
Ομαδικό Project

- Καλδής Χρήστος (@[ChrisKaldis](https://github.com/ChrisKaldis))

- Καρδούτσος Άγγελος (@[Angelos-Kard](https://github.com/Angelos-Kard))

Η εργασία αυτή υλοποιήθηκε στα πλαίσια του μαθήματος "Προγραμματισμός Διαδικτύου" για το ακαδημαϊκό έτος 2020-2021.

---

## Εγκατάσταση
Για την εγκατάσταση του συγκεκριμένου package: 
1. [Κατεβάζετε τον κώδικα](https://github.com/Angelos-Kard/public-transport-site/archive/refs/heads/master.zip)
2. Επιλέγετε το φάκελο στον οποίο αποσυμπιέζεται το .zip αρχείο

- **Περίπτωση Α**

3. Ανοίγετε το τερματικό στο συγκεκριμένο φάκελο
4. Εκτελείτε την εντολή `npm install -dev` με σκοπό να εγκαθιστούν τα dependencies και τα devDependencies (ή την εντολή `npm install` για να εγκαταστηθούν μόνο τα dependencies)
5. "Τρέχετε" τον server τοπικά εκτελώντας στο τερματικό με την εντολή `npm run debug` (χρήση nodemon) ή `node ./index.js`.
Για να τρέξει ο server τοπικά, απαιτείται να οριστούν ορισμένες enviromental variables, ώστε να είναι δυνατή η επικοινωνία με τη βάση δεδομένων.
Επομένως πρέπει να οριστεί ένα `.env` αρχείο. Το αρχείο αυτό πρέπει να βρίσκεται στον root φάκελο και να έχει τη μορφή:
```
HOST=...
DB_PORT=...
USER_DB=...
PASSWORD=...
DB_NAME=...
GOOGLE_KEY=...
SMPT_USER=...
SMPT_PASS=...
RECEIVER_EMAIL=...
```

- **Περίπτωση Β**

3. Εκτελείτε το αρχείο [initProject.bat](initProject.bat) (για Windows), το οποίο θα ανοίξει ένα cmd παράθυρο.
4. Ακολουθείτες τις οδηγίες που εμφανίζονται στο cmd παράθυρο.
Το `initProject.bat` αρχείο θα κατεβάσει τα dependencies, θα δημιουργήσει το `.env` αρχείο (αν δεν υπάρχει) στη μορφή που περιγράφηκε προηγουμένως (Περίπτωση Α, Βήμα 5) και τέλος θα ξεκινήσει τον server. Σε περίπτωση που ξανατρέξετε το αρχείο ή τα ανωτέρω αρχεία έχουν εγκαταστηθεί ήδη, τότε το .bat αρχείο θα ξεκινήσει μόνο τον server.

Σε περίπτωση πο θέλετε να δοκιμάσετε τον server με μία δική σας βάση δεδομένων, παρέχεται το αρχείο [public_transportation.sql](./database/public_transportation.sql), το οποίο περιέχει τους απαραίτητους πίνακες, καθώς και δεδομένα.

## Dependencies
- [express](https://github.com/expressjs/express)
- [express-handlebars](https://github.com/express-handlebars/express-handlebars)
- [mysql](https://github.com/mysqljs/mysql)
- [node-fetch](https://github.com/node-fetch/node-fetch)
- [nodemailer](https://github.com/nodemailer/nodemailer)
- [dotenv](https://github.com/mysqljs/mysql) (devDependency)

## Αρχεία
Σε αυτή την ενότητα θα περιγραφούν οι εργασίες, που επιτελούν τα αρχεία του package. Θα τα χωρίσουμε σε δύο κατηγορίες: front-end και back-end.

### Back-end
- [index.js](./index.js): Επιτελεί την μέθοδο `listen` του `Express` object, ώστε να ξεκινήσει ο server.
- [app.js](./app.js): Φορτώνει τις απαραίτητες βιβλιοθήκες, όπως `express` και `express-handlebars` και αρχικοποιεί τα handlebars ορίζοντας τη θέση των views, static φακέλους, καθώς και `Helpers`.
- [/server/pt-routes.js](./server/pt-routes.js): Χειρίζεται τα αιτήματα του client και καλεί τις κατάλληλες συναρτήσεις από το [pt-controller.js](./server/pt-controller.js).
- [/server/pt-controller.js](./server/pt-controller): Σκοπός των συναρτήσεών του είναι να κάνει render τις σελίδες, θέτοντας τις κατάλληλες τιμές στις μεταβλητές. Όταν κρίνεται απαραίτητο, καλεί συναρτήσεις από το [pt-model.js](./server/pt-model.js), ώστε να προσθέσει δεδομένα από τη βάση δεδομένων.
- [/server/pt-model.js](./server/pt-model.js): Οι συναρτήσεις του επικοινωνούν με τη βάση δεδομένων, ανακτούν δεδομένα, τα επεξεργάζονται και, τέλος, τα στέλνουν στο [pt-controller.js](./server/pt-controller.js)
- [/database](./database): Περιέχει αρχεία για την περιγραφή της βάσης (ERD Model και Σχεσιακό Μοντέλο), καθώς και το αρχείο [public_transport_site_28_5.sql](./database/public_transport_site_28_5.sql), το οποίο περιέχει τους πίνακες και ορισμένα δεδομένα.

### Front-end
- [/views](./views): Οι σελίδες της ιστοσελίδας ως `.hbs`. Κάθε `.hbs` αρχείο αντιστοιχεί σε μία σελίδα. Το αρχείο [main.hbs](./views/layouts/main.hbs) περιέχει τον κώδικα html, ο οποίος είναι κοινός για όλες τις ιστοσελίδες.
- [/css](./css): Περιέχει τα `.css` αρχεία για τη μορφοποίηση των σελίδων. Κάθε αρχείο αφορά μία σελίδα, με εξαίρεση ορισμένα αρχεία, τα οποία αφορούν ορσιμένα κοινά στοιχεία των σελίδων. 
- [/scripts](./scripts): Περιέχει του κώδικες Javascript, τους οποίους φορτώνουν οι σελίδες και εκτελούνται στην πλευρά του client.

### Επιπλέον αρχεία και φάκελοι
- [/external](./external): Screenshots, παρουσιάσεις και αναφορές.
- [/docs](./docs):  Περιέχει στατικές σελίδες `.html`, οι οποίες αποτέλεσαν πρώτυπα για τη δημιουργία των `.hbs` αρχείων.

## Ιστοσελίδα
- [Σύνδεσμος](https://public-transport-server.herokuapp.com/index) (Ο server "τρέχει" στο Heroku)
