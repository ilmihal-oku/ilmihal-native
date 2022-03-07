const light = "#e4f9ff";
const medium = "";
const dark = "";
export const buttonBg = "#0f4c75";

export default {
  headerTitle: {
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
  chapterTitleText: { fontSize: 20 },
  sectionTitleText: { fontSize: 18 },
  inlineSectionTitleText: {
    fontSize: 24,
    padding: 20,
    paddingLeft: 10,
  },
  sectionText: {
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
    color: "white",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
  },
  resultsTitle: {
    fontWeight: "bold",
    fontSize: 28,
  },
  separator: {
    backgroundColor: buttonBg,
    paddingVertical: 10,
    paddingLeft: 10,
  },

  searchResultTitle: {
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
  sectionLikedIcon: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkItemContainer: {
    position: "relative",
    borderBottomStyle: "dashed",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  bookmarkItem: {
    paddingBottom: 10,
  },
  bookmarkItemTitle: {
    textAlign: "right",
    fontSize: 13,
    paddingRight: 10,
    color: "#666",
    fontStyle: "italic",
  },
  bookmarkItemOverlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bookmarkItemOverlayItem: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  bookmarkItemOverlayIcon: {
    marginBottom: 5,
  },
  bookmarkItemOverlayText: {
    color: "white",
  },
};
