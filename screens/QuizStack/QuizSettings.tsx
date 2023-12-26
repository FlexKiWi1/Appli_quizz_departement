import { SafeAreaView, StyleSheet, TouchableOpacity, Animated, Pressable, View, useWindowDimensions, ScrollView, Dimensions, Text as DefaultText } from 'react-native'
import { createContext, useContext, useEffect, useState } from 'react'
import Text from '../../components/Text'
import { COLORS, SIZES } from '../../constants/theme';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Button from './Button';
import { Feather } from '@expo/vector-icons';
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group';

import regions from "../../data/regions.json";
import { Switch } from 'react-native-switch';
import { typescaleStyle } from '../../styles/Typescale.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';
import { useQuiz } from './ScreenContext';


export default function QuizSettings() {
  const navigation = useNavigation()

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0)

  const [routes, _] = useState([
    { key: 'proposition', title: "Proposition" },
    { key: 'region', title: "Region" },
  ])

  return (
    <SafeAreaView>
      <ScrollView>
        <TabView
          renderTabBar={props => <TabBar
            style={TabBaStyles.container}
            tabStyle={{}}

            renderLabel={({ route, focused, color }) => (
              <DefaultText style={focused ? { lineHeight: SIZES.medium * 1.2, fontSize: SIZES.medium, fontWeight: "600", color } : { lineHeight: SIZES.medium * 1.2, fontSize: SIZES.medium, color }}>
                {route.title + "    "}
              </DefaultText>
            )}

            indicatorContainerStyle={{
              flex: 1,
              backgroundColor: COLORS.grayDarkMedium,
            }}
            indicatorStyle={{
              height: "100%",
              backgroundColor: COLORS.primary,
            }}

            activeColor={COLORS.black}
            inactiveColor={COLORS.grayLight}

            {...props}
          />}

          navigationState={{ index, routes }}
          renderScene={SceneMap({
            proposition: PropositionTab,
            region: RegionTab
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={{ height: layout.height - 60 }}
        />
      </ScrollView>

      <View style={styles.overlayContainer}>
        <BouncyCheckbox
          style={{ marginBottom: SIZES.medium }}
          text={`Sauvegarder vos préférences`}
          fillColor={COLORS.grayLight}
          innerIconStyle={{ borderWidth: 0 }}
          unfillColor={COLORS.grayDarkMedium}
          textStyle={{ textDecorationLine: "none", color: COLORS.white }}
        />
        <Button
          title='Lancer le quiz'
          iconRight={<Feather name="arrow-right" size={SIZES.xLarge} color={COLORS.black} />}
          onPress={(e) => {
            navigation.navigate("quiz-game", {
            })
          }}
        />
      </View>
    </SafeAreaView>
  )
}

function PropositionTab() {
  const { settings } = useQuiz()

  return (
    <View style={styles.container}>
      <BouncyCheckboxGroup initial={"2"} data={[
        {
          id: "1",
          text: "2 propositions",
          "aria-valuetext": "2",
          fillColor: COLORS.primary,
          unfillColor: COLORS.grayDarkMedium,
          textStyle: { textDecorationLine: "none", color: COLORS.white },
          innerIconStyle: { borderWidth: 0 },
        },
        {
          id: "2",
          text: "4 propositions",
          "aria-valuetext": "4",
          fillColor: COLORS.primary,
          unfillColor: COLORS.grayDarkMedium,
          textStyle: { textDecorationLine: "none", color: COLORS.white },
          innerIconStyle: { borderWidth: 0 },
        },
        {
          id: "3",
          text: "6 propositions",
          "aria-valuetext": "6",
          fillColor: COLORS.primary,
          unfillColor: COLORS.grayDarkMedium,
          textStyle: { textDecorationLine: "none", color: COLORS.white },
          innerIconStyle: { borderWidth: 0 },
        },
      ]}
        onChange={(selectedItem: ICheckboxButton) => {
          settings.setPropositionNumber(parseInt(selectedItem['aria-valuetext'] as string))
        }}
        style={{ flexDirection: "column", gap: SIZES.medium }}
      />
    </View>
  )
}

function RegionTab() {
  const { settings } = useQuiz()

  return (
    <ScrollView style={styles.container}>
      {regions.map(region => (
        <Pressable key={region.code} style={styles.switchContainer} onPress={(e) => {
          if (settings.disabledRegions.includes(region.code)) {
            settings.setDisabledRegions(settings.disabledRegions.filter(regionCode => region.code != regionCode))
          } else {
            settings.setDisabledRegions([...settings.disabledRegions, region.code])
          }
        }
        }>
          <Switch
            value={!settings.disabledRegions.includes(region.code)}
            onValueChange={(val) => val
              ? settings.setDisabledRegions(settings.disabledRegions.filter(regionCode => region.code != regionCode))
              : settings.setDisabledRegions([...settings.disabledRegions, region.code])
            }
            renderActiveText={false}
            renderInActiveText={false}
            changeValueImmediately={true}
            backgroundActive={COLORS.primary}
            backgroundInactive={COLORS.grayDarkMedium}
            circleActiveColor={COLORS.black}
            circleInActiveColor={COLORS.grayLight}
            circleBorderActiveColor={COLORS.primary}
            circleBorderInactiveColor={COLORS.grayDarkMedium}
          />
          <Text style={typescaleStyle.h4}>{region.nom}</Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  overlayContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.black
  },
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: SIZES.small,
    marginBottom: SIZES.medium,
    paddingLeft: 10
  }
})

const TabBaStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 100,
    overflow: "hidden",
  },
})

const checkBoxStyles = {

}