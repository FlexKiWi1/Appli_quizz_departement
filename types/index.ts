import { ReactNode } from "react";

export type Quiz = {
    id: number;
    name: string;
    question: string;
    level: number;
    getQuestion: () => Question;
    getPropositions: (number: number, question: Question) => string[];
    isRightAnswer: (question: Question, answer: string) => boolean;
    getAnswerResponse: (answer: string) => string;
    renderQuestion: (question: Question) => ReactNode;
    renderAnswer: (answer: string) => ReactNode;
}

export type Department = {
    nom?: string;
    code?: string;
    codeRegion?: string;
}

export type Region = {
    nom?: string;
    code?: string;
}

export type Question = {
    value: string;
    answer: string;
}