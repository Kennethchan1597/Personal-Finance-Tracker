import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { transactionAxios } from '../api/transactionsApi';
import { useTransaction } from '../context/TransContext';
import EmojiPicker from './EmojiPicker';

type TransactionCardProp = {
  visible: boolean;
  type: "INCOME" | "EXPENSE";
  onClose: () => void;
}

export default function TransactionCard({ visible, onClose, type }: TransactionCardProp) {

  const { date, setDate, category, setCategory, amount, setAmount, description, setDescription } = useTransaction();
  const [rawDate, setRawDate] = useState<Date>(new Date());
  const [emoji, setEmoji] = useState<string>("");
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const { refreshTransactions } = useTransaction();

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) setRawDate(selectedDate);
  };

  const handleCreate = async () => {
    try {
      const transactionDto = { amount, category, date: formattedDate, description, type };
      await transactionAxios.post("", transactionDto)
      setDate("");
      setRawDate(new Date());
      setCategory("")
      setEmoji("");
      setDescription("");
      setAmount("");
      refreshTransactions();
    } catch (error: any) {
      setError(error.response.data)
    }
  }

  const formattedDate = rawDate.toISOString().split("T")[0];

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => onClose()}
      // Force light appearance
      statusBarTranslucent={true}
    >
      {/* Background overlay */}
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Modal card */}
      <View style={styles.modal}>
        <Text style={styles.title}>Add Transaction</Text>

        {/* Amount input */}
        <Text style={styles.subtitle}>Amount</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          keyboardType="number-pad"
          returnKeyType="done"           // shows “Done” on iOS keyboard
          onSubmitEditing={() => Keyboard.dismiss()}  // dismiss keyboard
          onChangeText={setAmount}
          style={styles.input}
        />

        {/* Desc input */}
        <Text style={styles.subtitle}>Decsription</Text>
        <TextInput
          placeholder="Description"
          value={description}
          keyboardType="default"
          returnKeyType="done"           // shows “Done” on iOS keyboard
          onSubmitEditing={() => Keyboard.dismiss()}  // dismiss keyboard
          onChangeText={setDescription}
          style={styles.input}
        />

        {/* Category picker */}
        <Pressable
          style={styles.categoryButton}
          onPress={() => setEmojiVisible(true)}
        >
          <Text style={styles.categoryText}>
            {category ? emoji + category : "Select Category"}
          </Text>
        </Pressable>

        {/* DateTime Picker */}
        <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 12 }}>
          <DateTimePicker
            themeVariant="light"
            value={rawDate}
            mode="date"
            display="inline"
            onChange={onChange}
            style={styles.datePicker}
          />
          <Text style={styles.selectedDate}>Selected: {formattedDate}</Text>
        </View>

        {/* Emoji picker modal */}
        <EmojiPicker
          visible={emojiVisible}
          onClose={() => setEmojiVisible(false)}
          onSelect={(item) => { setCategory(item.category); setEmoji(item.icon) }}
        />

        {/* Submit button */}
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.6}
          onPress={() => {
            handleCreate();
            setDate(formattedDate);
            onClose();
          }}
        >
          <Text style={styles.submitText}>Create</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  subtitle: {
    alignSelf: "center",
    marginBottom: 7,
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    bottom: 0, // stick to bottom
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  categoryText: {
    fontSize: 18,
  },
  datePicker: {
    width: "100%",
    height: 300,
    marginVertical: 10,
  },
  selectedDate: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#2e86de",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
