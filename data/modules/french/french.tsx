import { SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { G, Path } from "react-native-svg";
import Text from '../../../components/Text';
import frenchMapData from "./data/frenchMap.json";
import departments from "./data/departements.json";
import regions from "./data/regions.json";
import { useMutation } from '@tanstack/react-query';
import { typescaleStyle } from '../../../styles/Typescale.style';
import { Department, Region } from '../../../types';
import { getRandomElements, getRandomInt, shuffleArray } from "../../../utils/helpers";
import icon from "./data/_icon.png"
import { Module, Question, Quiz } from '../../../types';
import { Map } from './Map';

export const quizzes: Quiz[] = [
  {
    id: 1,
    name: "Numéro département",
    question: "Quel est le numéro du département ?",
    level: 1,
    excludeDataName: "Regions",
    getExcludeData: () => {
      console.log("EXCLUDE", regions.map(region => region.nom));
      return regions.map(region => region.nom)
    },
    getRealData: (excludeData: string[]) => {
      const transform = regions.filter(region => excludeData.includes(region.nom)).map(region => region.code)
      console.log("Transform", transform);
      const data = departments.filter(department => !transform.includes(department.codeRegion))
      console.log(data);
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
    excludeDataName: ""
  },
]

export default {
  name: "French Quiz",
  iconSource: icon,
  Map: Map,
  quizzes
} as Module;
