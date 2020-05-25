const light = "#e4f9ff";
const medium = "";
const dark = "";
const buttonBg = "#0f4c75";

export default {
  headerTitle: {
    fontFamily: "sans-serif-condensed",
    fontSize: 30,
    padding: 10,
    marginVertical: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  sectionsHeaderTitle: {
    fontFamily: "sans-serif-condensed",
    fontSize: 20,
    padding: 10,
    marginVertical: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  appWrapper: { flex: 1, backgroundColor: light },
  chapterTitle: {
    padding: 15,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#bbe1fa",
    borderStyle: "solid",
  },
  sectionTitle: {
    padding: 15,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#bbe1fa",
    borderStyle: "solid",
  },
  chapterTitleText: { fontFamily: "sans-serif-light", fontSize: 20 },
  sectionTitleText: { fontFamily: "sans-serif-light", fontSize: 18 },
  inlineSectionTitleText: {
    fontFamily: "sans-serif-light",
    fontSize: 24,
    padding: 20,
    paddingLeft: 10,
  },
  sectionText: {
    fontFamily: "sans-serif-light",
    fontSize: 18,
    lineHeight: 27,
    padding: 10,
  },
  newSearchButton: {
    backgroundColor: buttonBg,
    paddingLeft: 15,
    paddingVertical: 3,
    borderRadius: 15,
    marginRight: 15,
  },
  newSearchText: {
    fontFamily: "sans-serif-light",
    color: "white",
    fontSize: 15,
    paddingRight: 15,
  },
  searchIcon: {
    fontSize: 25,
    paddingLeft: 20,
    marginTop: 9,
    marginRight: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  searchInputStyle: {
    fontFamily: "sans-serif-light",
    fontSize: 16,
    width: "100%",
    paddingVertical: 8,
  },
  clearIcon: { fontSize: 20, paddingLeft: 10, paddingRight: 10 },
  searchButton: {
    borderRadius: 30,
    margin: 15,
    padding: 10,
    height: 50,
    backgroundColor: buttonBg,
  },
  searchButtonText: {
    fontFamily: "sans-serif-light",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
  },
  resultsTitle: {
    fontFamily: "sans-serif-light",
    fontWeight: "bold",
    fontSize: 28,
  },
  separator: {
    backgroundColor: buttonBg,
    paddingVertical: 10,
    paddingLeft: 10,
  },

  searchResultTitle: {
    fontFamily: "sans-serif-light",
    fontSize: 16,
  },
  searchResultContent: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbe1fa",
    borderStyle: "solid",
  },
  randomButton: {
    borderRadius: 0,
    justifyContent: "center",
    height: 50,
    backgroundColor: buttonBg,
  },
};
