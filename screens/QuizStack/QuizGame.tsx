import { StyleSheet, SafeAreaView, Animated, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../../components/Text'
import { useQuiz } from './ScreenContext'
import { typescaleStyle } from '../../styles/Typescale.style'
import { Question } from '../../types'
import AnswerButton from '../../components/AnswerButton'
import { COLORS, SIZES } from '../../constants/theme'
import Button from './Button'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


export default function QuizGame() {
  const navigation = useNavigation()
  
  const { quiz, settings } = useQuiz()
  const maxQuestions = 4 + quiz.level;
  const [progression, setProgression] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const [currentPropositions, setCurrentPropositions] = useState<string[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")
  let answerIsRight = currentAnswer != "" ? quiz.isRightAnswer(currentQuestion, currentAnswer) : false;

  useEffect(() => {
    const question = quiz.getQuestion()
    setCurrentQuestion(() => question)
    setCurrentPropositions(() => quiz.getPropositions(settings.propositionNumber - 1, question as Question))
  }, [])

  const answerQuestion = (answer) => {
    setCurrentAnswer(() => answer)
    setIsAnswered(true)
  }

  const nextQuestion = () => {
    const question = quiz.getQuestion()
    setCurrentQuestion(() => question)
    setCurrentPropositions(() => quiz.getPropositions(settings.propositionNumber - 1, question as Question))
    if (answerIsRight) {
      setProgression(prev => prev + 1)
    } else {
      setProgression(prev => prev > 0 ? prev - 1 : 0)
    }
    setIsAnswered(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.progressionBarContainer}>
        <View style={[styles.progressionBar, {width: `${(progression * 100) / (maxQuestions)}%`}]}></View>
      </View>

      {currentQuestion && progression < maxQuestions && (
        <>
          <View style={styles.questionContainer}>
            <Text style={typescaleStyle.h3}>{quiz.question}</Text>
            <Text style={[typescaleStyle.h1, typescaleStyle.centered]}>{currentQuestion?.value}</Text>
          </View>
          <View style={styles.propositionsContainer}>
            <FlatList
              data={currentPropositions}
              numColumns={2}
              renderItem={({ item }) => <AnswerButton
                title={item}
                isRightAnswer={quiz.isRightAnswer(currentQuestion, item)}
                isAnswered={isAnswered}
                // onPress={() => answer(item)}
                onPress={() => !isAnswered ? answerQuestion(item) : null}
              />}
            />
          </View>
        </>
      )}

      {isAnswered && <>
        {!answerIsRight && <View style={styles.rightAnswerContainer}>
          <Text>{quiz.getAnswerResponse(currentAnswer)} - {currentAnswer}</Text>
        </View>}
        <View style={styles.buttonContainer}>
          <Button
            title='Continuer'
            onPress={nextQuestion}
          />
        </View>
      </>}

      {progression == maxQuestions && <>
        <View style={styles.nextLevelContainer}>
          <Text style={[styles.nextLevelText, typescaleStyle.h2]}>Bravo tu as fini le niveau {quiz.level}</Text>
          <Button
            title='Passer au niveau suivant'
            iconRight={<Feather name="arrow-right" size={SIZES.large} color={COLORS.black} />}
            onPress={() => navigation.navigate("quiz", {
              screen: "quiz-game",
              quiz: {
                ...quiz,
                level: quiz.level + 1
              }
            })}
          />
        </View>
      </>}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  progressionBarContainer: {
    width: 300,
    alignSelf: "center",
    height: 10,
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
    borderRadius: 100,
    backgroundColor: COLORS.grayDark,
    overflow: "hidden"
  },
  progressionBar: {
    height: '100%',
    borderRadius: 100,
    backgroundColor: COLORS.grayLight
  },
  questionContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  propositionsContainer: {
    height: "40%",
    flex: 2,
    paddingHorizontal: SIZES.medium,
    // flexWrap: "wrap",
  },
  rightAnswerContainer: {
    padding: SIZES.small,
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: 100
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20
  },

  nextLevelContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: SIZES.large,
    textAlign: "center",
  },
  nextLevelText: {
    textAlign: "center",
    marginBottom: SIZES.xLarge
  }
})