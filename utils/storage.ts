import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

export async function openDatabase() {
    return SQLite.openDatabase("db.db");
}

export function createTable(db: SQLite.SQLiteDatabase, tableName: string, columns: string) {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${tableName} (
                ${columns}
            );`,
            [],
            (_, result) => {
                console.log('Table créée avec succès', result);
            },
            (_, error) => {
                console.log('Erreur lors de la création de la table', error);
                return true;
            }
        )
    })
}

export function insertData(db: SQLite.SQLiteDatabase, tableName: string, columns: string, columnsData: any[]) {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT INTO ${tableName} (${columns}) VALUES (?, ?)`,
            columnsData,
            (_, result) => {
                console.log('Données insérées avec succès', result);
            },
            (_, error) => {
                console.log('Erreur lors de l\'insertion des données', error);
                return false;
            }
        );
    });
}

export function updateData(db: SQLite.SQLiteDatabase, tableName: string, id: number, columnsName: string[], columnsData: any[]) {
    console.log(`UPDATE ${tableName} SET ${columnsName.map(column => `${column} = ? `)} WHERE id = ?`, columnsData.concat([id]),);
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE ${tableName} SET ${columnsName.map(column => `${column} = ? `)} WHERE id = ?`,
            columnsData.concat([id]),
            (_, result) => {
                console.log('Données mises à jour avec succès', result);
            },
            (_, error) => {
                console.log('Erreur lors de la mise à jour des données', error);
                return false;
            }
        );
    });
};


export function getAllData(db: SQLite.SQLiteDatabase, tableName: string, dataFormat: any[]) {
    return new Promise<any[]>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, result) => {
                    const rows = result.rows;
                    const data: any[] = [];

                    for (let i = 0; i < rows.length; i++) {
                      const rowData: any = {};

                      for (let j = 0; j < dataFormat.length; j++) {
                        const dataRow = dataFormat[j];
                        rowData[dataRow] = rows.item(i)[dataRow];
                      }

                      data.push(rowData);
                    }
                    resolve(data);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};
