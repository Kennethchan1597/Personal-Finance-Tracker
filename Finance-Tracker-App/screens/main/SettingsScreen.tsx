// import { Button, Text, View } from "react-native";
// import { useAuth } from "../../context/AuthContext";

// export default function SettingsScreen() {
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout().catch(err => {
//       console.error("Logout failed:", err);
//     });
//   };

//   return (
//     <View>
//       <Text style={{ padding: 20 }}>Hello</Text>
//       <Button title="Log out" onPress={handleLogout} />
//     </View>
//   );
// }

import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function SettingsScreen() {

  const { logout, userDto } = useAuth();

  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Profile Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Text style={styles.cardValue}>{userDto?.username}</Text>
        <Text>Email: {userDto?.email}</Text>
      </View>

      {/* Preferences */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16 },
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
  cardValue: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logoutButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
});
