import { SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { Ref, useEffect, useRef, useState } from 'react'
import Svg, { G, Path } from "react-native-svg";
import Text from '../../../components/Text';
import frenchMapData from "./data/frenchMap.json";
import departmentsPath from "./data/departementsPath.json";
import departments from "./data/departements.json";
import regions from "./data/regions.json";
import { useMutation } from '@tanstack/react-query';
import { typescaleStyle } from '../../../styles/Typescale.style';
import { Department, Region } from '../../../types';
import { getBBoxFromD, getRandomElements, getRandomInt, shuffleArray } from "../../../utils/helpers";
import icon from "./data/_icon.png"
import { Module, Question, Quiz } from '../../../types';
import { Map } from './Map';
import { COLORS } from '../../../constants/theme';
import { resetPathCoordToZero } from '../../../utils/svg';


export const quizzes: Quiz[] = [
  {
    id: 1,
    name: "Numéro département",
    question: "Quel est le numéro du département ?",
    errorSentenceLink: "correspond au département",
    level: 1,
    excludeDataName: "Regions",
    getExcludeData: () => {
      // console.log("EXCLUDE", regions.map(region => region.nom));
      return regions.map(region => region.nom)
    },
    getRealData: (excludeData: string[]) => {
      let transform = regions.filter(region => excludeData.includes(region.nom)).map(region => region.code)
      // console.log("Transform", transform);
      const data = departments.filter(department => !transform.includes(department.codeRegion))
      // console.log(data);
      return data
    },
    getQuestion: (realData: Department[]): Question => {
      const random = realData[getRandomInt(0, realData.length - 1)];

      return {
        value: random.nom as string,
        answer: random.code as string,
      };
    },
    getPropositions: (number: number, question: Question, realData: Department[]) => {
      console.log(question);
      const rightProposition = realData.filter(department => department.nom === question.value)[0].code;
      const otherProposition = getRandomElements<Department>({
        array: realData,
        n: number,
        key: "code",
        exclude: [rightProposition as string]
      });
      otherProposition.push(rightProposition as string);
      return shuffleArray(otherProposition);
    },
    isRightAnswer: (question: Question, answer: string): boolean => {
      return question.answer === answer;
    },
    getAnswerResponse: (answer: string) => {
      return departments.filter(department => department.code === answer)[0].nom
    },
    renderQuestion: ({ question }: { question: Question }) => {
      return <Text style={typescaleStyle.h1}>{question.value}</Text>
    },
    renderAnswer: ({answer}: {answer: string}) => {
      return <Text style={typescaleStyle.h3}>{answer}</Text>
    },
  },
  {
    id: 2,
    level: 1,

    name: "Forme département",
    question: "Quel est ce département ?",
    errorSentenceLink: "",

    excludeDataName: "",

    getExcludeData: () => [""],

    getRealData: (excludeData: string[]) => {
      return departmentsPath;
    },

    getQuestion: (realData: object[]): Question => {
      const random = realData[getRandomInt(0, realData.length - 1)];

      return {
        value: random.d as string,
        // value: random.d as string,
        answer: random.name as string,
      };
    },

    getPropositions: (number: number, question: Question, realData: object[]) => {
      const rightProposition = realData.filter(department => department.d === question.value)[0].name;
      const otherProposition = getRandomElements<object>({
        array: realData,
        n: number,
        key: "name",
        exclude: [rightProposition as string]
      });
      otherProposition.push(rightProposition as string);
      return shuffleArray(otherProposition);
    },

    isRightAnswer: (question: Question, answer: string): boolean => {
      return question.answer === answer;
    },

    getAnswerResponse: (answer: string) => {
      return departmentsPath.filter(department => department.name === answer)[0].d
    },

    renderQuestion: ({ question }: { question: Question }) => {
      console.log(question);
      const pathRef = useRef<Path>(null);
      const [bbox, setBbox] = useState<{
        x: number,
        y: number,
        width: number,
        height: number,
      }>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });

      useEffect(() => {
        if (pathRef.current) {
          setBbox(() => pathRef.current!.getBBox() as SVGRect)
          console.log(pathRef.current.getBBox());
        }
      }, [question]);

      return <View style={{ borderStyle: "solid", borderWidth: 1, borderColor: "red" }}>
        <Svg width="150" height="150" viewBox={`0 0 ${bbox.width} ${bbox.height}`} fill="green">
          <Path d={question.value} stroke={COLORS.white} strokeWidth={2} ref={pathRef} translateX={-bbox.x} translateY={-bbox.y} />
        </Svg>
      </View>
    },

    renderAnswer: ({answer}: {answer: string}) => {
      return <Text style={typescaleStyle.h3}>{answer}</Text>
    },
  },
]

export default {
  name: "French Quiz",
  iconSource: icon,
  Map: Map,
  quizzes
} as Module;
