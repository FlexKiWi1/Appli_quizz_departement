import { Button, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Text from '../../components/Text'
import QuizButton from '../../components/QuizButton'
import { Department, Question, Quiz } from '../../types'
import departments from "../../data/departements.json"
import { getRandomElements, getRandomInt, shuffleArray } from '../../utils/helpers'
import { typescaleStyle } from '../../styles/Typescale.style'
import { createTable, getAllData, insertData, openDatabase, updateData } from '../../utils/storage'
import * as SQLite from "expo-sqlite"
import { useFocusEffect } from '@react-navigation/native'
import { useQuiz } from '../QuizStack/ScreenContext'

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
      const otherProposition = getRandomElements<Department>({
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
    },
    renderQuestion: (question: Question) => {
      return <Text style={typescaleStyle.h1}>{question.value}</Text>
    },
    renderAnswer: (answer: string) => {
      return <Text style={typescaleStyle.h3}>{answer}</Text>
    },
  },
  {
    id: 2,
    name: "Forme département",
    level: 1,
  },
]

export default function QuizList({ navigation }) {
  const [quizzesData, setQuizzesData] = useState<Quiz[]>([])
  const {quiz} = useQuiz()
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useFocusEffect(
    useCallback(() => {
      const db = SQLite.openDatabase("db.db");
      createTable(db, "quiz", "id INT PRIMARY KEY NOT NULL, level INT")

      // updateData(db, "quiz", quiz.id, ["level"], [1])

      db.exec([{ sql: "SELECT COUNT(*) FROM quiz", args: [] }], false, (_, results) => {
        let count = results[0].rows[0]["COUNT(*)"];
        // console.log("first", count);

        // if quiz doesn't exist
        if (count === 0) {
          console.log("First utilisation of app : initialize database");

          quizzes.map((q) => {
            insertData(db, "quiz", "id, level", [q.id, q.level])
          })
        }
        // get all quiz data and assign it to quizzes
        else {
          if (quizzesData.length === 0) {
            console.log("First initialization");

            getAllData(db, "quiz", ["id", "level"]).then((data) => {
              let quizzesTemp = quizzes;
              data.map((q, i) => {
                quizzesTemp[i].level = q.level;
              })
              setQuizzesData(() => quizzesTemp);
            })
          } else {
            console.log("Get updated quiz data");

            getAllData(db, "quiz", ["id", "level"]).then((data) => {
              let quizzesTemp = quizzesData;
              data.map((quiz, i) => {
                quizzesTemp[i].level = 0;
                quizzesTemp[i].level = quiz.level;
              })
              setQuizzesData(prev => quizzesTemp);
              forceUpdate();
            })
          }
        }
      })
    }, [])
  )

  useEffect(() => {
    console.log(quizzesData[quiz.id - 1]?.level);
  }, [quizzesData])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizzesData as Quiz[]}
        renderItem={({ item }) => <QuizButton quiz={item} />}
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
