import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

export async function openDatabase() {
    return SQLite.openDatabase("db.db");
}

export function createTable(db: SQLite.SQLiteDatabase, tableName: string, columns: string, primaryKey: string[]) {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${tableName} (
                ${columns},
                PRIMARY KEY (${primaryKey.join(",")})
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

export function insertData(db: SQLite.SQLiteDatabase, tableName: string, columnsName: string[], columnsData: any[]) {
    // console.log(`INSERT INTO ${tableName} (${columnsName.join(", ")}) VALUES (${columnsName.map((column, i) => i === 0 ? "?" : " ?")})`);
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT INTO ${tableName} (${columnsName.join(", ")}) VALUES (${columnsName.map((column, i) => i === 0 ? "?" : " ?")})`,
            columnsData,
            (_, result) => {
                console.log('Données', result["insertId"], 'insérées avec succès', result["rows"]["_array"]);
            },
            (_, error) => {
                console.log('Erreur lors de l\'insertion des données', error);
                return false;
            }
        );
    });
}

export function updateData(
    db: SQLite.SQLiteDatabase,
    tableName: string,
    primaryKeyName: string[],
    primaryKeyValue: any[],
    columnsName: string[],
    columnsData: any[]
) {
    const sql = `UPDATE ${tableName} SET ${columnsName.map(column => `${column} = ? `)} WHERE ${primaryKeyName.map((pk, i) => i < primaryKeyName.length - 1 ? pk + " = ? AND " : pk + " = ?").join("")}`

    console.log(sql, columnsData.concat(primaryKeyValue));
    db.transaction((tx) => {
        tx.executeSql(
            sql,
            columnsData.concat(primaryKeyValue),
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


export function getQueryResultValue(result: SQLite.SQLResultSet) {
    return Object.values(result["rows"]["_array"][0])
}