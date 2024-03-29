import { PanResponder, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { G, Path } from "react-native-svg";
import Text from '../../../components/Text';
import frenchMapData from "./data/frenchMap.json";
import departments from "./data/departements.json";
import regions from "./data/regions.json";
import { typescaleStyle } from '../../../styles/Typescale.style';
import { Department, Region } from '../../../types';
import { COLORS } from '../../../constants/theme';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

export function Map() {
    const [currentRegion, setCurrentRegion] = useState("")
    const [currentDepartment, setCurrentDepartment] = useState("")
    const [lastDepartment, setLastDepartment] = useState("")
    const [currentData, setCurrentData] = useState<{ department?: Department, region?: Region }>({})

    useEffect(() => {
        if (currentDepartment !== lastDepartment) {
            setCurrentData({
                department: departments.filter((department: Department) => department.code === currentDepartment)[0],
                region: regions.filter(region => region.code === currentRegion)[0]
            })
            setLastDepartment(currentDepartment);
            // console.log("current", currentDepartment, "last", lastDepartment);
        }
    }, [lastDepartment, currentDepartment, currentData])

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
            <ReactNativeZoomableView style={styles.mapContainer} contentWidth={667}>
                <Svg
                    width="667px"
                    height="100%"
                    x="0px"
                    y="0px"
                    viewBox="0 0 667 578"
                >
                    {frenchMapData.map(region => (
                        <G
                            key={region['code-insee']}
                            data-name={region.name}
                            data-code-insee={region['code-insee']}
                        >
                            {region.departments.map(department => (
                                <Path
                                    key={department.number}
                                    strokeWidth={2}
                                    stroke={department.number === currentDepartment ? COLORS.primary : region['code-insee'] === currentRegion ? COLORS.grayDarkMedium : COLORS.gray}
                                    fill={department.number === currentDepartment ? COLORS.primary : region['code-insee'] === currentRegion ? COLORS.gray : COLORS.grayDark}
                                    data-name={department.name}
                                    data-department-number={department.number}
                                    d={department.d}
                                    onPress={() => {
                                        setCurrentRegion(region['code-insee'])
                                        setCurrentDepartment(department.number)
                                    }}
                                />
                            ))}
                        </G>
                    ))}
                </Svg>
            </ReactNativeZoomableView>
            <View style={styles.infosContainer}>
                <View style={styles.infosBlockContainer}>
                    {currentDepartment === "" ? (
                        <Text style={typescaleStyle.h4}>Clique sur un département</Text>
                    ) : <>
                        <Text style={typescaleStyle.h1}>{currentDepartment}</Text>
                        <Text style={typescaleStyle.h2}>{currentData.department?.nom}</Text>
                        <Text style={typescaleStyle.h2}>Region {currentData.region?.nom}</Text>
                    </>}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '60%',
        // borderWidth: 1,
        // borderColor: "red",
        paddingHorizontal: 10,
        // backgroundColor: COLORS.grayDark,
    },
    infosContainer: {
        height: "30%",
        paddingTop: 20,
        paddingBottom: 80,
        // borderWidth: 1,
        // borderColor: "red",
        flexDirection: "row",
        gap: 10
    },
    infosBlockContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        // backgroundColor: COLORS.grayDark,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
})
