import React from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const transactions = [
  { id: "1", name: "Salary", amount: 4500, type: "income" },
  { id: "2", name: "Groceries", amount: -120, type: "expense" },
  { id: "3", name: "Netflix", amount: -15, type: "expense" },
];

export default function TransactionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <TextInput placeholder="Search transactions" style={styles.searchBar} />
      
      {/* Filter Buttons */}
      <View style={styles.filters}>
        {["All", "Income", "Expenses"].map((filter) => (
          <TouchableOpacity key={filter} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text style={[styles.transactionAmount, { color: item.type === "income" ? "green" : "red" }]}>
              {item.type === "income" ? "+" : "-"}${Math.abs(item.amount)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16 },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 12,
    elevation: 2,
  },
  filters: { flexDirection: "row", marginBottom: 12 },
  filterButton: {
    backgroundColor: "#2e86de",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterText: { color: "#fff", fontWeight: "600" },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  transactionName: { fontSize: 16 },
  transactionAmount: { fontWeight: "600" },
});
