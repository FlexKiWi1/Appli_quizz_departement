import { Button, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text'
import QuizButton from '../../components/QuizButton'
import { Quiz } from '../../types'

const quizzes = [
  {
    id: 1,
    name: "Numéro département",
    level: 1,
  },
  {
    id: 2,
    name: "Forme département",
    level: 1,
  },
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