import Text from "../../components/Text";
import { typescaleStyle } from "../../styles/Typescale.style";
import { Question, Quiz } from "../../types";
import { getRandomElements, shuffleArray } from "../../utils/helpers";

/**
 * Render the SVG map of the region
 * 
 * @returns ReactNode
 */
export function Map() {
  return (
    <></>
  )
}


/**
 * All the region's quizzes with their own logic and rendering methods.
 */
export const quizzes: Quiz[] = [
  {
    id: 1,
    level: 1,

    name: "",
    question: "",

    /**
     * @brief Returns a random question
     * 
     * @returns {Question}
     */
    getQuestion: (): Question => {
      return {
        value: "",
        answer: ""
      };
    },

    /**
     * @brief Returns random propositions
     * 
     * @param number number of propositions
     * @param question 
     * @returns []
     */
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
    getAnswerResponse: (answer: undefined) => {
      return ""
    },

    /**
     * @brief Render the question
     * @description Allows you to render a text, image or map according to the quiz

     * @param question 
     * @returns 
     */
    renderQuestion: (question: Question) => {
      return <Text style={typescaleStyle.h1}>{question.value}</Text>
    },

    /**
     * @brief Render the answer
     * @description Allows you to render a text, image according to the quiz

     * @param answer
     * @returns 
     */
    renderAnswer: (answer: string) => {
      return <Text style={typescaleStyle.h3}>{answer}</Text>
    },
  },
]

export default {
  name: "",
  iconSource: "",
  quizzes
}
