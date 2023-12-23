import { Button, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text'
import QuizButton from '../../components/QuizButton'

export default function QuizList() {
  return (
    <SafeAreaView style={styles.container}>
      <QuizButton level={10} quizName='Numéro département' />
      <QuizButton level={4} quizName='Numéro département' />
      <QuizButton level={1} quizName='Numéro département' />
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