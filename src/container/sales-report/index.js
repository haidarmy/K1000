/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {ms, mvs} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory-native';
import {IcChartBar, IcChartLine} from '../../assets';
import {Gap, Header} from '../../components';
import {getUserSalesReport} from '../../redux/action/SalesReportAction';
import {colors, colorsDark, formatCash, getData} from '../../utils';
import {getDateLabel} from '../../utils/salesReportHelper';
import SalesReportSkeleton from './SalesReportSkeleton';

export default function SalesReportTemplate({
  salesData,
  onTimeFrameData,
  headerTittle,
  type,
}) {
  const navigation = useNavigation();
  const {isDarkMode: theme} = useSelector(state => state.DarkModeReducer);
  const {dataReportResult, dataReportLoading, dataReportError} = salesData;
  const [chartType, setChartType] = useState('LINE_CHART');
  const [timeFrame, setTimeFrame] = useState('WEEKLY');
  const [externalEventMutations, setExternalEventMutations] = useState();
  const isFirstRender = useRef(true);
  const [showPieChart, setShowPieChart] = useState(true);
  const dispatch = useDispatch();
  const styles = getStyles(theme);

  useEffect(() => {
    getData('user').then(({uid}) => {
      if (uid) {
        // dispatch(getUserSalesReport(uid, timeFrame, isFirstRender.current));
        onTimeFrameData(uid, timeFrame, isFirstRender.current);
        if (isFirstRender.current && !dataReportError) {
          isFirstRender.current = false;
        }
      }
    });
  }, [dispatch, timeFrame, dataReportError, onTimeFrameData]);

  const handleSalesData = useMemo(
    () =>
      dataReportResult
        ? Object.values(dataReportResult).map(({revenue}) => revenue)
        : [0, 0, 0, 0, 0, 0, 0],
    [dataReportResult],
  );

  const handleSalesDataLabel = useMemo(
    () =>
      dataReportResult
        ? Object.values(dataReportResult).map(({date}) => getDateLabel(date))
        : [],
    [dataReportResult],
  );

  const handleCategoryData = useMemo(() => {
    return dataReportResult && !showPieChart
      ? Object.values(
          Object.values(dataReportResult)
            .map(datum => Object.values(datum.categoryList))
            .flat()
            .reduce((acc, {sold, ...r}) => {
              const key = JSON.stringify(r);
              acc[key] = acc[key] || {...r, sold: 0};
              // eslint-disable-next-line prettier/prettier
              return ((acc[key].sold += sold), acc);
              // return ((acc[key].sold += sold), acc);
            }, {}),
        )
      : [];
  }, [dataReportResult, showPieChart]);

  const handlePieCountPercentage = useMemo(() => {
    const total =
      handleCategoryData &&
      !showPieChart &&
      handleCategoryData.reduce((acc, cur) => acc + cur.sold, 0);
    return handleCategoryData
      ? handleCategoryData.map(item => ({
          ...item,
          percentage: (item.sold / total) * 100,
        }))
      : [];
  }, [handleCategoryData, showPieChart]);

  const handleSalesDetails = useMemo(() => {
    return dataReportResult
      ? Object.values(
          Object.values(dataReportResult)
            .map(e => e.salesDetails)
            .reduce((acc, {cancel, sold, viewed, ...r}) => {
              const key = JSON.stringify(r);
              acc[key] = acc[key] || {...r, cancel: 0, sold: 0, viewed: 0};
              return (
                (acc[key].cancel += cancel),
                (acc[key].sold += sold),
                (acc[key].viewed += viewed),
                acc
              );
            }, {}),
        )
      : [];
  }, [dataReportResult]);

  const handleTimeFrame = useCallback(tf => {
    setTimeFrame(tf);
    setExternalEventMutations([
      {
        target: ['labels'],
        eventKey: 'all',
        mutation: () => ({active: false}),
        callback: () => setExternalEventMutations(undefined),
      },
    ]);
  }, []);

  const chartStyle = useMemo(
    () => ({
      chartConfig: {
        formatYLabel: datum => `${formatCash(datum)}`,
        backgroundColor: theme ? colorsDark.grey : colors.default,
        backgroundGradientFrom: theme ? colorsDark.grey : colors.default,
        backgroundGradientFromOpacity: 0.8,
        backgroundGradientTo: theme ? colorsDark.grey : colors.default,
        backgroundGradientToOpacity: 1,
        strokeWidth: ms(2),
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForLabels: {
          fontFamily: 'Poppins-Medium',
          fontSize: mvs(10),
        },
      },
      width: Dimensions.get('window').width /* - ms(30) */,
      height: mvs(240),
    }),
    [theme],
  );

  const chartData = useMemo(
    () => ({
      labels: handleSalesDataLabel,
      datasets: [
        {
          data: handleSalesData,
        },
      ],
    }),
    [handleSalesDataLabel, handleSalesData],
  );

  const graphicColor = useMemo(
    () => [
      '#9762fe',
      '#FF895D',
      '#5572FD',
      '#3DE5B2',
      '#5dc3fa',
      '#EB6383',
      '#BC658D',
      '#FA9191',
      '#FFE9C5',
      '#FAB57A',
    ],
    [],
  );

  const renderPieChart = useMemo(
    () => (
      <View style={styles.pieChart}>
        <VictoryPie
          externalEventMutations={externalEventMutations}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: ({nativeEvent}) => {
                  return [
                    {
                      target: 'labels',
                      eventKey: 'all',
                      mutation: () => ({active: false}),
                    },
                  ];
                },
                onPressOut: ({nativeEvent}) => {
                  return [
                    {
                      target: 'labels',
                      mutation: () => ({active: true}),
                    },
                  ];
                },
              },
            },
            {
              target: 'parent',
              eventHandlers: {
                onPressIn: ({nativeEvent}) => {
                  return [
                    {
                      target: 'labels',
                      eventKey: 'all',
                      mutation: () => ({active: false}),
                    },
                  ];
                },
              },
            },
          ]}
          animate={{easing: 'circleInOut', duration: 500}}
          data={handlePieCountPercentage}
          x="id"
          y="sold"
          padding={50}
          innerRadius={60}
          radius={({datum}) => 75 + datum.percentage * 1}
          labelRadius={({datum}) => 75 + datum.percentage * 1}
          padAngle={2}
          colorScale={graphicColor}
          labels={({datum}) =>
            `${datum?.percentage?.toFixed(2)}%\n${datum?.sold?.toFixed(0)}kg`
          }
          labelComponent={
            <VictoryTooltip
              flyoutPadding={10}
              cornerRadius={12}
              dy={15}
              dx={0}
              style={{
                fill: theme ? colorsDark.white : colors.white,
                fontFamily: 'Poppins-Medium',
              }}
              flyoutStyle={{
                fill: theme ? colorsDark.black : colors.black,
                strokeWidth: 0,
              }}
              pointerLength={0}
              orientation="top"
              height={mvs(70)}
            />
          }
        />
        <VictoryLegend
          x={Dimensions.get('screen').width / 2 - ms(110)}
          orientation="horizontal"
          gutter={20}
          style={{
            labels: {
              fill: theme ? colorsDark.black : colors.black,
              fontFamily: 'Poppins-Medium',
            },
          }}
          colorScale={graphicColor}
          itemsPerRow={3}
          data={handleCategoryData}
        />
      </View>
    ),
    [
      styles.pieChart,
      handlePieCountPercentage,
      graphicColor,
      theme,
      handleCategoryData,
      externalEventMutations,
    ],
  );

  const renderLineChart = useMemo(
    () => (
      <LineChart
        formatYLabel={datum => `${formatCash(datum)}`}
        data={chartData}
        withDots={false}
        withVerticalLines={false}
        width={chartStyle.width}
        height={chartStyle.height}
        chartConfig={{
          ...chartStyle.chartConfig,
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: colors.default,
            fill: colors.white,
          },
          propsForBackgroundLines: {
            x: 5,
            scaleX: 0.875,
          },
        }}
        bezier
        style={{
          ...styles.chart,
          marginRight: ms(20),
          marginLeft: ms(20),
        }}
        xLabelsOffset={-7.5}
        yLabelsOffset={15}
      />
    ),
    [
      chartData,
      chartStyle.chartConfig,
      chartStyle.height,
      chartStyle.width,
      styles.chart,
    ],
  );

  const renderBarChart = useMemo(
    () => (
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - ms(19)}
        height={chartStyle.height}
        yAxisSuffix=""
        yAxisInterval={2}
        chartConfig={{
          ...chartStyle.chartConfig,
          barPercentage: 0.5,
          propsForBackgroundLines: {
            x: 60,
            scaleX: 0.75,
          },
        }}
        style={{
          ...styles.chart,
          paddingRight: ms(50),
          marginRight: ms(-70),
        }}
        xLabelsOffset={-7.5}
        yLabelsOffset={1}
      />
    ),
    [chartData, chartStyle.chartConfig, chartStyle.height, styles.chart],
  );

  const renderChartOption = useMemo(
    () => (
      <View style={styles.chartOptionContainer}>
        <View style={styles.chartToggleWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setChartType('LINE_CHART')}
            style={[
              styles.chartToggleIconWrapper,
              chartType === 'LINE_CHART' && {
                backgroundColor: theme
                  ? 'rgba(111, 95, 144, 0.25)'
                  : 'rgba(111, 95, 144, 0.8)',
              },
            ]}>
            <IcChartLine
              fill={
                chartType === 'LINE_CHART'
                  ? theme
                    ? colors.default
                    : colors.white
                  : colors.grey
              }
              height={mvs(18)}
              width={ms(18)}
            />
          </TouchableOpacity>
          <Gap width={ms(10)} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setChartType('BAR_CHART')}
            style={[
              styles.chartToggleIconWrapper,
              chartType === 'BAR_CHART' && {
                backgroundColor: theme
                  ? 'rgba(111, 95, 144, 0.25)'
                  : 'rgba(111, 95, 144, 0.8)',
              },
            ]}>
            <IcChartBar
              fill={
                chartType === 'BAR_CHART'
                  ? theme
                    ? colors.default
                    : colors.white
                  : colors.grey
              }
              height={mvs(18)}
              width={ms(18)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.timelineWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.timelineItem,
              timeFrame === 'WEEKLY' && {
                backgroundColor: theme
                  ? 'rgba(255,255,255, 0.1)'
                  : 'rgba(111, 95, 144, 0.5)',
              },
            ]}
            onPress={() => handleTimeFrame('WEEKLY')}>
            <Text
              style={[
                styles.textTimeLine,
                timeFrame === 'WEEKLY' && {
                  color: colors.white,
                },
              ]}>
              7D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.timelineItem,
              timeFrame === 'MONTHLY' && {
                backgroundColor: theme
                  ? 'rgba(255,255,255, 0.1)'
                  : 'rgba(111, 95, 144, 0.5)',
              },
            ]}
            onPress={() => handleTimeFrame('MONTHLY')}>
            <Text
              style={[
                styles.textTimeLine,
                timeFrame === 'MONTHLY' && {
                  color: colors.white,
                },
              ]}>
              1M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.timelineItem,
              timeFrame === 'BIYEARLY' && {
                backgroundColor: theme
                  ? 'rgba(255,255,255, 0.1)'
                  : 'rgba(111, 95, 144, 0.5)',
              },
            ]}
            onPress={() => handleTimeFrame('BIYEARLY')}>
            <Text
              style={[
                styles.textTimeLine,
                timeFrame === 'BIYEARLY' && {
                  color: colors.white,
                },
              ]}>
              6M
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [
      chartType,
      styles.chartOptionContainer,
      styles.chartToggleIconWrapper,
      styles.chartToggleWrapper,
      styles.textTimeLine,
      styles.timelineItem,
      styles.timelineWrapper,
      theme,
      timeFrame,
      handleTimeFrame,
    ],
  );

  const renderPieToggle = useMemo(
    () => (
      <View style={styles.pieToggle}>
        <ToggleSwitch
          animationSpeed={200}
          isOn={!showPieChart}
          onColor={colors.default}
          offColor={theme ? colors.whiteTranslucent : colors.grey}
          size="medium"
          onToggle={() => setShowPieChart(!showPieChart)}
        />
        <Gap width={ms(10)} />
        <Text style={[styles.pieToggleLabel, !theme && {color: colors.black}]}>
          {`${showPieChart ? 'Lihat' : 'Tutup'} rincian produk ${
            type === 'SALES' ? 'terjual' : 'dibeli'
          }`}
        </Text>
      </View>
    ),
    [showPieChart, styles.pieToggle, styles.pieToggleLabel, theme, type],
  );

  const salesInfoItem = useCallback(
    (isRenderRuler = true, title, value) => (
      <>
        <View style={styles.salesInfoItem}>
          <Text style={styles.salesInfoItemLabel}>{title}</Text>
          <Text style={styles.salesInfoItemValue}>{value}</Text>
        </View>
        {isRenderRuler && <View style={styles.salesInfoItemRuler} />}
      </>
    ),
    [
      styles.salesInfoItem,
      styles.salesInfoItemLabel,
      styles.salesInfoItemRuler,
      styles.salesInfoItemValue,
    ],
  );

  const renderSaleInfo = useMemo(
    () =>
      dataReportLoading ? (
        <SalesReportSkeleton
          containerStyle={styles.salesInfo}
          infoItemStyle={styles.salesInfoItem}
          rulerSeparatorStyle={styles.salesInfoItemRuler}
        />
      ) : (
        <View style={styles.salesInfo}>
          {salesInfoItem(undefined, 'Dilihat', handleSalesDetails[0]?.viewed ?? 0)}
          {salesInfoItem(
            undefined,
            type === 'SALES' ? 'Terjual' : 'Dibeli',
            handleSalesDetails[0]?.sold ?? 0,
          )}
          {salesInfoItem(false, 'Batal', handleSalesDetails[0]?.cancel ?? 0)}
        </View>
      ),
    [
      salesInfoItem,
      styles.salesInfo,
      handleSalesDetails,
      dataReportLoading,
      styles.salesInfoItem,
      styles.salesInfoItemRuler,
      type,
    ],
  );

  const renderRevenueChart = useMemo(() => {
    if (dataReportLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loading}>
            <ActivityIndicator size={ms(28)} color={colors.default} />
          </View>
        </View>
      );
    }
    switch (chartType) {
      case 'LINE_CHART':
        return renderLineChart;
      case 'BAR_CHART':
        return renderBarChart;
      default:
        <></>;
    }
  }, [
    chartType,
    dataReportLoading,
    renderBarChart,
    renderLineChart,
    styles.loading,
    styles.loadingContainer,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? colorsDark.white : colors.white}
      />
      <Header label={headerTittle} onPress={() => navigation.goBack()} />
      <View styles={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {renderChartOption}
          <Gap height={mvs(10)} />
          {renderRevenueChart}
          <Gap height={mvs(20)} />
          {renderPieToggle}
          {showPieChart && <Gap height={mvs(20)} />}
          {!showPieChart && renderPieChart}
          {renderSaleInfo}
        </ScrollView>
      </View>
    </View>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    content: {
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      padding: mvs(9),
    },
    contentContainer: {alignItems: 'center', minHeight: '100%'},
    chart: {
      margin: 0,
      padding: 0,
      borderRadius: mvs(12),
      marginRight: ms(-20),
      marginLeft: ms(-20),
      marginTop: mvs(-30),
      paddingTop: mvs(30),
    },
    chartToggleIconWrapper: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      borderWidth: ms(1),
      borderColor: 'rgba(111, 95, 144, 0.5)',
      borderRadius: mvs(10),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: ms(8),
      paddingVertical: mvs(4),
    },
    chartToggleWrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    chartOptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '85%',
    },
    salesInfo: {
      width: '85%',
      borderRadius: mvs(10),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: theme ? colorsDark.grey : colors.lightgrey,
      elevation: 3,
      padding: mvs(20),
    },
    salesInfoItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '33%',
    },
    salesInfoItemLabel: {
      color: colors.grey,
      fontFamily: 'Poppins-Medium',
      fontSize: mvs(16),
    },
    salesInfoItemValue: {
      color: theme ? colorsDark.black : colors.black,
      fontFamily: 'Poppins-SemiBold',
      fontSize: mvs(16),
    },
    salesInfoItemRuler: {
      width: ms(1),
      height: '50%',
      backgroundColor: theme ? colorsDark.black : colors.black,
    },
    timelineWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: mvs(8),
      padding: mvs(4),
    },
    timelineItem: {
      borderRadius: mvs(10),
      paddingHorizontal: ms(10),
      paddingVertical: mvs(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textTimeLine: {
      fontSize: ms(14),
      fontFamily: 'Poppins-SemiBold',
      color: colors.grey,
    },
    pieChart: {
      flex: 1,
      maxHeight: '45%',
    },
    pieToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pieToggleLabel: {
      color: colors.white,
      fontFamily: 'Poppins-Medium',
      fontSize: mvs(16),
    },
    loading: {
      width: ms(36),
      height: mvs(36),
      borderRadius: mvs(18),
      backgroundColor: theme ? colorsDark.grey : colors.lightgrey,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      height: mvs(240),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
