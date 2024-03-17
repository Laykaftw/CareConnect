import { openDatabase } from 'expo-sqlite';

const db = openDatabase('CareConnect.db');

db.transaction(tx => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Parent (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            User TEXT,
            Phone TEXT,
            Password TEXT
        );`,
        [],
        () => console.log('Parent table created successfully'),
        (_, error) => console.error('Error creating Parent table:', error)
    );
});
// db.transaction(tx => {
//     tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS BabySitter (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             Name TEXT,
//             Phone TEXT,
//             Password TEXT,
//         );`,
//         [],
//         () => console.log('Support table created successfully'),
//         (_, error) => console.error('Error creating Support table:', error)
//     );
// });
const addParent = (User, Phone, Password) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Parent (User,Phone, Password) VALUES ( ?,?,?);',
            [User, Phone, Password],
            () => console.log('Parent added successfully ',User,'   ',Password),
            (_, error) => console.error('Error adding parent:', error)
        );
    });
};

const getParentId = (User, pass, callback) => {
    // console.log("getUser called with:", User, pass);
    db.transaction(tx => {
        tx.executeSql(
            'SELECT Id FROM Parent WHERE User=? AND Password=?',
            [User, pass],
            (_, { rows }) => {
                // console.log("Rows:", rows);
                if (rows.length > 0) {
                    const Id = rows.item(0).Id;
                    console.log("Retrieved Id:", Id);
                    callback(Id);
                } else {
                    console.log("No matching user found.");
                    callback(null);
                }
            },
            (_, error) => {
                console.error('Error finding parent:', error);
                callback(null);
            }
        );
    });
};



const resetParent = () => {
    db.transaction(tx => {
        tx.executeSql(
            'Drop Table Parent;',
            [],
            () => console.log('Table Dropped successfully'),
            (_, error) => console.error('Error Droping table:', error)
        );
    });
}


export {addParent,getParentId,resetParent}