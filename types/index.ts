import { Asset } from "expo-asset";
import React, { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";


// Main types
export type Module = {
    name: string;
    iconSource: ImageSourcePropType;
    Map: () => React.JSX.Element;
    quizzes: Quiz[];
}

export type Quiz = {
    id: number;
    name: string;
    question: string;
    level: number;
    excludeDataName: string;
    getExcludeData: () => string[];
    getRealData: (excludeData: string[]) => object[];
    getQuestion: (realData: object[]) => Question;
    getPropositions: (number: number, question: Question, realData: object[]) => string[];
    isRightAnswer: (question: Question, answer: string) => boolean;
    getAnswerResponse: (answer: any) => string;
    renderQuestion: (question: Question) => ReactNode;
    renderAnswer: (answer: any) => ReactNode;
}

export type Question = {
    value: string;
    answer: string;
}


// Other types
export type Department = {
    nom?: string;
    code?: string;
    codeRegion?: string;
}

export type Region = {
    nom?: string;
    code?: string;
}


// Storage types
export type SQLResultSet = {
    /**
     * The row ID of the row that the SQL statement inserted into the database, if a row was inserted.
     */
    insertId?: number;
    /**
     * The number of rows that were changed by the SQL statement.
     */
    rowsAffected: number;
    rows: SQLResultSetRowList;
};

export interface SQLResultSetRowList {
    /**
     * The number of rows returned by the query.
     */
    length: number;
    /**
     * Returns the row with the given `index`. If there is no such row, returns `null`.
     * @param index Index of row to get.
     */
    item(index: number): any;
    /**
     * The actual array of rows returned by the query. Can be used directly instead of
     * getting rows through rows.item().
     */
    _array: any[];
}
