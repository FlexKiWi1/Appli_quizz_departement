import { Button, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text'
import QuizButton from '../../components/QuizButton'
import { Question, Quiz } from '../../types'
import departments from "../../data/departements.json"
import { getRandomElements, getRandomInt, shuffleArray } from '../../utils/helpers'

const quizzes = [
  {
    id: 1,
    name: "Numéro département",
    question: "Quel est le numéro du département ?",
    level: 1,
    getQuestion: (): Question => {
      const random = departments[getRandomInt(0, departments.length - 1)];
      return {
        value: random.nom,
        answer: random.code
      };
    },
    getPropositions: (number: number, question: Question) => {
      console.log(question);
      
      const rightProposition = departments.filter(department => department.nom === question.value)[0].code;
      const otherProposition = getRandomElements({
        array: departments,
        n: number,
        key: "code",
        exclude: [rightProposition]
      });
      otherProposition.push(rightProposition);
      return shuffleArray(otherProposition);
    },
    isRightAnswer: (question: Question, answer: string): boolean => {
      return question.answer === answer;
    },
    getAnswerResponse: (answer: string) => {
      return departments.filter(department => department.code === answer)[0].nom
    }
  },
  // {
  //   id: 2,
  //   name: "Forme département",
  //   level: 1,
  // },
]

export default function QuizList() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizzes}
        renderItem={({item}) => <QuizButton quiz={item} />}
        keyExtractor={(item: Quiz) => item.id.toString()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    }
})