import { Button, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Text from '../../components/Text'
import QuizButton from '../../components/QuizButton'
import { Department, Question, Quiz } from '../../types'
import departments from "../../data/departements.json"
import { getRandomElements, getRandomInt, shuffleArray } from '../../utils/helpers'
import { typescaleStyle } from '../../styles/Typescale.style'
import { createTable, getAllData, getQueryResultValue, insertData, openDatabase, updateData } from '../../utils/storage'
import * as SQLite from "expo-sqlite"
import { useFocusEffect } from '@react-navigation/native'
import { useQuiz } from '../../contexts/QuizContext'
import { useModule } from '../../contexts/ModuleContext'

export default function QuizList({ navigation }) {
  const { module } = useModule()
  const [quizzesData, setQuizzesData] = useState<Quiz[]>([])
  const { quiz, setQuiz } = useQuiz()
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useFocusEffect(
    useCallback(() => {
      const db = SQLite.openDatabase("db.db");

      // drop table
      // db.transaction(tx => {
      //   tx.executeSql("DROP TABLE IF EXISTS quiz")
      // })

      db.transaction(tx => {
        tx.executeSql("SELECT EXISTS (SELECT name FROM sqlite_master WHERE type='table' AND name='quiz');", [], (_, result) => {
          // console.log("resutls", Object.values(result["rows"]["_array"][0])[0]);
          const tableExist = getQueryResultValue(result)[0];
          if (!tableExist) {
            createTable(db, "quiz", "id INT NOT NULL, moduleName TEXT NOT NULL, level INT NOT NULL", ["id", "moduleName"])
          }
        })
      })

      // reset levels
      // updateData(db, "quiz", quiz.id, ["level"], [1])

      db.transaction(tx => {
        tx.executeSql("SELECT COUNT(*) FROM quiz WHERE moduleName = ?;", [module.name], (_, result) => {
          let count = getQueryResultValue(result)[0];

          console.log("Number of quiz in", module.name, ":", count);

          // if quiz doesn't exist
          if (count === 0) {
            console.log("First utilisation of app : initialize database");

            module.quizzes.map((q) => {
              insertData(db, "quiz", ["id", "moduleName", "level"], [q.id, module.name, q.level])
            })
          }
          // get all quiz data and assign it to quizzes
          else {
            if (quizzesData.length === 0) {
              console.log("First initialization");

              getAllData(db, "quiz", ["id", "moduleName", "level"]).then((data) => {
                let quizzesTemp = module.quizzes;
                let filteredData = data.filter(q => q.moduleName === module.name)
                console.log("Donnée: " + JSON.stringify(filteredData));
                console.log(quizzesTemp);

                filteredData.map((q, i) => {
                  if (q.moduleName === module.name) {
                    quizzesTemp[i].level = q.level;
                  }
                })
                setQuizzesData(() => quizzesTemp);
                forceUpdate()
              })
            } else {
              console.log("Get updated quiz data");

              getAllData(db, "quiz", ["id", "module", "level"]).then((data) => {
                let quizzesTemp = quizzesData;
                let filteredData = data.filter(q => q.moduleName === module.name)
                filteredData.map((q, i) => {
                  if (q.moduleName === module.name) {
                    quizzesTemp[i].level = q.level;
                  }
                })
                setQuizzesData(prev => quizzesTemp);
                forceUpdate();
              })
            }
          }
        }
      )})
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizzesData as Quiz[]}
        renderItem={({ item }) => <QuizButton 
          quiz={item}
          onPress={() => {
            setQuiz(item);
            navigation.navigate("quiz", {
              screen: "settings",
            })
          }}
        />}
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
