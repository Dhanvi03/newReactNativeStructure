import React, { useState, Activity } from 'react'; 
// NOTE: If 'Activity' is not found in 'react', try 'unstable_Activity'
// import { unstable_Activity as Activity } from 'react'; 

import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Button 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 1. A Heavy Component that holds State
// Normally, unmounting this (hiding it) would lose the 'text' and 'count'.
const HeavyTabContent = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        <Text style={styles.title}>📝 Tab A (State Preserved)</Text>
        <Text style={styles.desc}>
          Type something or increase the counter. Then switch to Tab B and come back.
          Your data will still be here!
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Type here to test preservation..."
          value={text}
          onChangeText={setText}
        />

        <View style={styles.counterRow}>
          <Text style={styles.counterText}>Counter: {count}</Text>
          <Button title="Increase" onPress={() => setCount(c => c + 1)} />
        </View>
      </View>

      {/* Generating a list to show scroll position is also preserved */}
      {/* {Array.from({ length: 10 }).map((_, i) => (
        <Text key={i} style={styles.listItem}>List Item {i + 1}</Text>
      ))} */}
    </ScrollView>
  );
};

const SimpleTabContent = () => (
  <View style={[styles.card, { backgroundColor: '#e3f2fd' }]}>
    <Text style={styles.title}>ℹ️ Tab B</Text>
    <Text style={styles.desc}>
      This is just a placeholder. While you are reading this, Tab A is 
      "hidden" but still alive in memory.
    </Text>
  </View>
);

export default function ActivityExampleScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Activity Component Demo</Text>

      {/* 2. THE MAGIC: Instead of conditional rendering like:
         {activeTab === 'A' && <HeavyTabContent />}
         
         We use <Activity>. It never unmounts, just changes mode.
      */}
      
      <View style={styles.contentArea}>
        {/* Tab A Wrapper */}
        <Activity mode={activeTab === 'A' ? 'visible' : 'hidden'}>
          <HeavyTabContent />
        </Activity>

        {/* Tab B Wrapper */}
        <Activity mode={activeTab === 'B' ? 'visible' : 'hidden'}>
          <SimpleTabContent />
        </Activity>
      </View>
      
        {/* Tab A Wrapper */}
      {/* <View style={styles.contentArea}>
        {activeTab === 'A' ? <HeavyTabContent /> : <SimpleTabContent />}
      </View> */}

      {/* Bottom Tab Switcher */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom || 20 }]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'A' && styles.activeTab]} 
          activeOpacity={0.6}
          onPress={() => setActiveTab('A')}
        >
          <Text style={[styles.tabText, activeTab === 'A' && styles.activeTabText]}>Tab A</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'B' && styles.activeTab]} 
          activeOpacity={0.6}
          onPress={() => setActiveTab('B')}
        >
          <Text style={[styles.tabText, activeTab === 'B' && styles.activeTabText]}>Tab B</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
  contentArea: { flex: 1 },
  scrollContent: { padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 14, color: '#666', marginBottom: 15, lineHeight: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8 },
  counterText: { fontSize: 16, fontWeight: '600' },
  listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', color: '#888' },
  
  // Custom Tab Bar Styles
  tabBar: { flexDirection: 'row', backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee' },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTab: { borderTopWidth: 2, borderTopColor: '#007AFF' },
  tabText: { fontSize: 16, color: '#999' },
  activeTabText: { color: '#007AFF', fontWeight: 'bold' },
});