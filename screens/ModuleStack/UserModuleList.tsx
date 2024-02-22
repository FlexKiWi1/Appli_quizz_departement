import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text'
import modules from "../../data/modules/list"
import Button from '../../components/Button'
import { pageStyles } from '../../styles/Page.style'
import ModuleButton from '../../components/ModuleButton'
import { navigate } from '../../utils/navigation'
import { useModule } from '../../contexts/ModuleContext'

export default function UserModuleList() {
  const {setModule} = useModule()

  return (
    <SafeAreaView style={pageStyles.container}>
      {modules.map(module => (
        <ModuleButton
          key={module.name}
          module={module}
          onPress={() => {
            setModule(() => module);
            return navigate("tabs", {screen: "Home"})
          }}
        />
      ))}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})