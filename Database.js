import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, email TEXT, password TEXT, dob TEXT)',
      [],
      (tx, results) => {
        console.log('Database initialized successfully');
      },
      error => {
        console.error('Error initializing database:', error);
      }
    );
  });
};

export { db, initializeDatabase };