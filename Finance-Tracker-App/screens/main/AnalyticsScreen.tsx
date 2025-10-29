import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width - 32;

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f6fa" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Summary Cards */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Income</Text>
          <Text style={styles.cardValue}>$4,500</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Expenses</Text>
          <Text style={styles.cardValue}>$1,200</Text>
        </View>

        {/* Line Chart */}
        <Text style={styles.chartTitle}>Income vs Expenses</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              { data: [4000, 4200, 4500, 4800, 4700, 5000], color: () => "#2e86de", strokeWidth: 2, label: "Income" },
              { data: [1000, 1200, 900, 1300, 1100, 1200], color: () => "red", strokeWidth: 2, label: "Expenses" },
            ],
          }}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: "#f5f6fa",
            backgroundGradientTo: "#f5f6fa",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          }}
          style={{ borderRadius: 16, marginVertical: 12 }}
        />

        {/* Bar Chart Example */}
        <Text style={styles.chartTitle}>Spending by Category</Text>
        <BarChart
          data={{
            labels: ["Food", "Bills", "Shopping", "Transport", "Others"],
            datasets: [{ data: [300, 500, 200, 100, 100] }],
          }}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: "#f5f6fa",
            backgroundGradientTo: "#f5f6fa",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          }}
          style={{ borderRadius: 16, marginVertical: 12 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  cardValue: { fontSize: 24, fontWeight: "bold", color: "#2e86de" },
  chartTitle: { fontSize: 16, fontWeight: "600", marginTop: 8, marginBottom: 4 },
});
