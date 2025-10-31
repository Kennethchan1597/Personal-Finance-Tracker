import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionCard from "../../components/TransactionCard";
import { useAuth } from "../../context/AuthContext";
import { useTransaction } from "../../context/TransContext";


export default function HomeScreen() {

  const { userDto } = useAuth();
  const [error, setError] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [transactionCardVisible, setTransactionCardVisible] = useState<boolean>(false);
  const { balance, transactions } = useTransaction();
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const handleAddIncome = () => {
    setIsCreate(true);
    setType("INCOME");
    setTransactionCardVisible(true);
  }

  const handleAddExpense = () => {
    setIsCreate(true);
    setType("EXPENSE");
    setTransactionCardVisible(true);
  }

  const handlers: Record<string, () => void> = {
    "Add Income": handleAddIncome,
    "Add Expense": handleAddExpense
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hello,</Text>
      <Text style={styles.header}>guest</Text>

      {/* Balance Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Balance</Text>
        <Text style={styles.balance}>$ {balance}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {["Add Income", "Add Expense"].map((action) => (
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
              <Text style={{ color: item.type === "INCOME" ? "green" : "red" }}>{item.type === "INCOME" ? "+" : "-"}${item.amount}</Text>
            </View>
          )}
        />
      </View>

      <TransactionCard visible={transactionCardVisible} onClose={() => setTransactionCardVisible(false)} type={type} isCreate={isCreate} />

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
    justifyContent: "flex-start",
    marginBottom: 16,
    gap: 12,
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
