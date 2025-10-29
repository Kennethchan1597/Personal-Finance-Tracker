import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionCard from "../../components/TransactionCard";
import { useAuth } from "../../context/AuthContext";
import { useTransaction } from "../../context/TransContext";

export default function HomeScreen() {

  const { username } = useAuth();
  const [error, setError] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [transactionCardVisible, setTransactionCardVisible] = useState<boolean>(false);
  const { balance, transactions } = useTransaction();

  const handleAddIncome = () => {
    setType("INCOME");
    setTransactionCardVisible(true);
  }

  const handleAddExpense = () => {
    setType("EXPENSE");
    setTransactionCardVisible(true);
  }

  const handleDownload = () => {

  }

  const handlers: Record<string, () => void> = {
    "Add Income": handleAddIncome,
    "Add Expense": handleAddExpense,
    "Download": handleDownload,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hello,</Text>
      <Text style={styles.header}>{username}</Text>

      {/* Balance Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Balance</Text>
        <Text style={styles.balance}>$ {balance}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {["Add Income", "Add Expense", "Downlaod"].map((action) => (
          <Pressable key={action} style={styles.actionButton}
            onPress={handlers[action]}>
            <Text style={styles.actionText}>{action}</Text>
          </Pressable>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>
        <FlatList
          keyExtractor={(item) => item.id.toLocaleString()}
          data={transactions}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <Text style={{ fontSize: 15 }}>{item.category}</Text>
              <Text style={{ color: item.type === "INCOME" ? "green" : "red" }}>{item.amount}</Text>
            </View>
          )}
        />
      </View>

      <TransactionCard visible={transactionCardVisible} onClose={() => setTransactionCardVisible(false)} type={type} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f6fa",
  },
  header: {
    fontSize: 35,
    paddingBottom: 14
  },
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e86de",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#2e86de",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
