import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureRecognizer from "react-native-swipe-gestures";
import { transactionAxios } from "../../api/transactionsApi";
import TransactionCard from "../../components/TransactionCard";
import { Transaction, useTransaction } from "../../context/TransContext";


export default function TransactionsScreen() {

  const { transactions, refreshTransactions } = useTransaction();
  const [transactionCardVisible, setTransactionCardVisible] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [search, setSearch] = useState<string>("");

  const [emojiMap, setEmojiMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadEmojiMap = async () => {
      const json = await AsyncStorage.getItem("categoryEmojis");
      if (json) setEmojiMap(JSON.parse(json));
    };
    loadEmojiMap();
  }, []);

  const handleSwipeLeft = () => {
    const nextMonth = new Date(selectedMonth);
    nextMonth.setMonth(selectedMonth.getMonth() + 1);
    setSelectedMonth(nextMonth);
  };

  const handleSwipeRight = () => {
    const prevMonth = new Date(selectedMonth);
    prevMonth.setMonth(selectedMonth.getMonth() - 1);
    setSelectedMonth(prevMonth);
  };

  const handleOnPress = () => {
    setIsCreate(false);
    setTransactionCardVisible(true);
  }

  const handleSearch = (text: string) => {
    setSelectedFilter("Search")
    setSearch(text);
  };

  const transactionBySearch = useMemo(() => {
    if (search.trim() === "") {
      return transactions;
    } else {
      return transactions.filter((t) => {
        return t.description.trim().toLowerCase().includes(search.trim().toLowerCase());
      })
    }
  }, [transactions, search])

  const transactionByCategory = useMemo(() => {
    if (!selectedEmoji || !emojiMap[selectedEmoji]) return transactions;
    console.log("working")
    const result = emojiMap[selectedEmoji];
    console.log("before return selected emoji: " + selectedEmoji)
    console.log("before return result: " + result)
    return transactions.filter((t) => t.category === result);
  }, [transactions, selectedEmoji, emojiMap]);

  const transactionsByMonth = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.date);
      return (
        tDate.getMonth() === selectedMonth.getMonth() &&
        tDate.getFullYear() === selectedMonth.getFullYear()
      );
    });
  }, [transactions, selectedMonth]);

  const category: string = selectedEmoji === "" ? "Category" : selectedEmoji;

  const filteredTransactions = useMemo(() => {
    if (selectedFilter === "All") return transactions;
    if (selectedFilter === "Months") return transactionsByMonth;
    if (selectedFilter === category) return transactionByCategory;
    if (selectedFilter === "Search") return transactionBySearch;
    return [];
  }, [selectedFilter, transactionsByMonth, transactions, transactionByCategory, transactionBySearch]);

  const handleRemove = async (id?: number) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete the selected transactions? \nThis action is irreversible!",
      [
        {
          text: "Delete", style: "destructive", onPress: async () => {
            try {
              await transactionAxios.delete(`/${id}`);
              refreshTransactions(); // if you want to refresh the list
            } catch (error: any) {
              console.error(error);
            }
          },
        },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <TextInput placeholder="Search transactions" style={styles.searchBar} value={search} onChangeText={handleSearch} />

      {/* Filter Buttons */}
      <View style={styles.filters}>
        {["All", "Months", category].map((filter) => (
          <TouchableOpacity key={filter} style={[styles.filterButton, selectedFilter === filter && { backgroundColor: "#2e86de" }]} onPress={() => {
            if (filter != category) {
              setSelectedFilter(filter);
              setSelectedEmoji("");
              setSearch("");
            } else {
              setEmojiVisible(true)
            }
          }}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GestureRecognizer
        onSwipeLeft={selectedFilter === "Months" ? handleSwipeLeft : undefined}
        onSwipeRight={selectedFilter === "Months" ? handleSwipeRight : undefined}
        style={{ flex: 1 }}
      >
        {selectedFilter === "Months" && (
          <View style={styles.monthHeaderContainer}>
            <Text style={styles.monthHeader}>
              {selectedMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </Text>
          </View>
        )}

        {/* Transactions List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            const emoji = Object.keys(emojiMap).find(key => emojiMap[key] === item.category);
            return (
              <TouchableOpacity style={styles.transactionCard} activeOpacity={0.5} onPress={() => {
                setSelectedTransaction(item);
                handleOnPress();
              }}
                onLongPress={() => handleRemove(item.id)}
              >
                <View style={styles.transactionCardElement}>
                  <Text style={styles.transactionName}>{item.description}</Text>
                  <Text style={[styles.transactionAmount, { color: item.type === "INCOME" ? "green" : "red" }]}>
                    {item.type === "INCOME" ? "+" : "-"}${item.amount}
                  </Text>
                </View>
                <Text style={styles.transactionDetail}>{item.date}</Text>
                <Text style={styles.transactionDetail}>{item.category}</Text>
                <Text style={styles.transactionDetail}>{emoji}</Text>
              </TouchableOpacity>
            )
          }}
          showsVerticalScrollIndicator={false}
        />
      </GestureRecognizer>

      {/* Category Emoji picker modal */}
      <Modal visible={emojiVisible} animationType="fade" transparent onRequestClose={() => { setEmojiVisible(false) }}>
        <TouchableWithoutFeedback onPress={() => setEmojiVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.emojiModal}>
          <Text style={styles.title}>Filter by Category</Text>

          <FlatList
            data={Object.keys(emojiMap)}
            keyExtractor={(item) => item}
            numColumns={3}
            contentContainerStyle={{ alignItems: "center", }}
            renderItem={({ item }) => {
              const isSelected = selectedEmoji === item; // check if selected
              return (
                <Pressable
                  style={styles.emojiButton}
                  onPress={() => {
                    setSelectedEmoji(item);
                    setSelectedFilter(item);
                    setSearch("")
                    setEmojiVisible(false);
                  }}
                >
                  <Text style={[styles.emoji, isSelected && styles.emojiSelected]}>
                    {item}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>

      <TransactionCard visible={transactionCardVisible} onClose={() => setTransactionCardVisible(false)} type={selectedTransaction?.type} isCreate={isCreate} Transaction={selectedTransaction || undefined} />

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
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2.2,
      },
      android: {
        elevation: 5
      }
    })
  },
  filters: { flexDirection: "row", marginBottom: 12 },
  filterButton: {
    backgroundColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2.2,
      },
      android: {
        elevation: 5
      }
    })
  },
  filterText: {
    color: "#fff",
    fontWeight: "600"
  },
  transactionCard: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    width: "96%",
    left: "2%",
    borderRadius: 12,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2.2,
      },
      android: {
        elevation: 5
      }
    })
  },
  transactionCardElement: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionDetail: {

  },
  transactionName: { fontSize: 16 },
  transactionAmount: { fontWeight: "600" },
  monthHeaderContainer: {
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    // Remove any border or outline
    borderWidth: 0,
    borderColor: "transparent",
  },
  monthHeader: {
    fontSize: 25,                   // larger font
    fontWeight: "bold",
    color: "black",
    letterSpacing: 0.5,
    textAlign: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  emojiModal: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "32%",
    width: "80%",
    left: "10%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  emojiButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    margin: 6,
  },
  emoji: {
    fontSize: 20,
    paddingVertical: 13,
    paddingHorizontal: 26,
    backgroundColor: "#f3f3f3",
    borderRadius: 8
  },
  emojiSelected: {
    transform: [{ scale: 1.1 }],
    backgroundColor: "#dcdcdc"
  },
});
