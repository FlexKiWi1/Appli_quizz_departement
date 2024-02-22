import Text from "../../../components/Text";
import { typescaleStyle } from "../../../styles/Typescale.style";
import { Module, Question, Quiz } from "../../../types";
import { getRandomElements, shuffleArray } from "../../../utils/helpers";
import icon from "./data/_icon.png"
import Map from "./Map";

export const quizzes: Quiz[] = [
  {
    id: 1,
    level: 1,
    name: "blablabla",
    question: "why ... ?",
    excludeDataName: "",
    getExcludeData() {
      return []
    },
    getQuestion: (): Question => {
      return {
        value: "",
        answer: ""
      };
    },
    getPropositions: (number: number, question: Question) => {
      const rightProposition = "";
      const otherProposition = getRandomElements({
        array: [],
        n: number,
        exclude: [rightProposition],
        key: ""
      });
      otherProposition.push(rightProposition);
      return shuffleArray(otherProposition);
    },
    isRightAnswer: (question: Question, answer: string): boolean => {
      return question.answer === answer;
    },
    getGoodResponseOfAnswer: (answer: string) => {
      return ""
    },
    renderQuestion: (question: Question) => {
      return <Text style={typescaleStyle.h1}>{question.value}</Text>
    },
    renderAnswer: (answer: string) => {
      return <Text style={typescaleStyle.h3}>{answer}</Text>
    },
  }
]

export default {
  name: "World Quiz",
  iconSource: icon,
  Map: Map,
  quizzes: quizzes
} as Module;
