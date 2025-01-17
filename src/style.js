import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row', // TextInput과 Text를 가로로 배치하기 위해 추가
    alignItems: 'center', // 세로 중앙 정렬
    flexWrap: 'wrap',
  },
  listText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    width: 80, // Label의 고정 폭 설정
  },
  itemInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    flex: 1, // 남은 공간을 채우도록 flex 사용
    marginBottom: 5,
    marginLeft: 5,
    minWidth: 50, // 최소 길이
    maxWidth: 200, // 최대 길이
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
  },
});

export default styles;