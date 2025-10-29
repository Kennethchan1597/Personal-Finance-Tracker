import { useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type EmojiPickerProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: { icon: string; category: string }) => void;
};

export default function EmojiPicker({ visible, onClose, onSelect }: EmojiPickerProps) {

  const [emojis, setEmojis] = useState<Record<string, string>>({
    "🍽️": "Dining",
    "🚌": "Transportation",
    "🏠": "Housing",
    "💻": "Technology",
    "🏥": "Healthcare",
    "💵": "Income",
    "🛒": "Shopping",
  });

  const [newIcon, setNewIcon] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [removeIcon, setRemoveIcon] = useState<string>("");
  const [removeCategory, setRemoveCategory] = useState<string>("");

  const emojiKeys = Object.keys(emojis);

  const handleAddCategory = () => {
    if (newIcon.trim() && newCategory.trim()) {
      setEmojis((prev) => ({ ...prev, [newIcon]: newCategory }));
      setNewIcon("");
      setNewCategory("");
      setAddModalVisible(false);
    }
  };

  const handleRemoveCategory = () => {
    if (!removeCategory || !removeIcon) return;
    const updatedEmojis = { ...emojis };
    delete updatedEmojis[removeIcon];
    setEmojis(updatedEmojis);
    setRemoveIcon("");
    setRemoveCategory("");
    setRemoveModalVisible(false);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <Text style={styles.title}>Choose a Category</Text>

        <FlatList
          data={emojiKeys}
          keyExtractor={(item) => item}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <Pressable
              style={styles.emojiButton}
              onPress={() => {
                onSelect({ icon: item, category: emojis[item] });
                onClose();
              }}
            >
              <Text style={styles.emoji}>{item}</Text>
            </Pressable>
          )}
        />

        {/* Add Button */}
        <Pressable style={styles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.addButtonText}>＋ Add Category</Text>
        </Pressable>

        {/* Remove Button */}
        <Pressable style={styles.addButton} onPress={() => setRemoveModalVisible(true)}>
          <Text style={styles.addButtonText}>− Remove Category</Text>
        </Pressable>
      </View>

      {/* Add New Category Modal */}
      <Modal visible={addModalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setAddModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.addModal}>
          <Text style={styles.title}>Add New Category</Text>
          <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>Icon (emoji only)</Text>
          <TextInput
            maxLength={2}
            value={newIcon}
            onChangeText={(text) => {
              const emojiOnly = text.replace(
                /[^\p{Emoji_Presentation}\p{Emoji}\u200d]+/gu,
                ""
              );
              setNewIcon(emojiOnly);
              if (emojiOnly.length >= 1) Keyboard.dismiss();
            }}
            style={styles.input}
          />
          <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>Category</Text>
          <TextInput
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.input}
          />
          <Pressable
            style={newIcon == null || newCategory || null ? styles.submitButton : styles.disabledButton}
            onPress={handleAddCategory}
            disabled={newCategory == null || newIcon == null}
          >
            <Text style={styles.submitText}>Add</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Remove Button */}
      <Modal visible={removeModalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setRemoveModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.removeModal}>
          <Text style={styles.title}>Remove Category</Text>

          <FlatList
            data={emojiKeys}
            keyExtractor={(item) => item}
            numColumns={3}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => {
              const isSelected = removeIcon === item; // check if selected
              return (
                <Pressable
                  style={styles.emojiButton}
                  onPress={() => {
                    setRemoveIcon(item);
                    setRemoveCategory(emojis[item]);
                  }}
                >
                  <Text style={[styles.emoji, isSelected && styles.emojiSelected]}>
                    {item}
                  </Text>
                </Pressable>
              );
            }}
          />

          <Text style={styles.selectedText}>
            {removeCategory ? removeCategory : "Category"}
          </Text>

          <Pressable
            style={
              removeCategory == null
                ? styles.disabledButton
                : styles.submitButton
            }
            onPress={handleRemoveCategory}
            disabled={removeCategory == null}
          >
            <Text style={styles.submitText}>Remove</Text>
          </Pressable>
        </View>
      </Modal>


    </Modal >
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "30%",
    width: "80%",
    left: "10%",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  grid: {
    alignItems: "center",
  },
  emojiSelected: {
    transform: [{ scale: 1.1 }],
    backgroundColor: "#dcdcdc"
  },
  selectedText: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
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
  label: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  addButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#e8f0fe",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#1a73e8",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  closeText: {
    color: "#888",
    fontSize: 16,
  },
  addModal: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "32%",
    width: "60%",
    left: "20%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  removeModal: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "32%",
    width: "80%",
    left: "10%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 8,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#2e86de",
    borderRadius: 10,
    paddingVertical: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 8,
    opacity: 0.7,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#888",
  },
});
