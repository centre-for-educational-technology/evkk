import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 1,
        width: 250
    },
    indeterminateColor: {
        color: "#f50057"
    },
    selectAllText: {
        fontWeight: 500
    },
    selectedAll: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    variant: "menu"
};

const addedYearOptions = [
    "2000—2009",
    "2010—2019",
    "2020..."
];

const charactersOptions = [
    "kuni 500",
    "501—1000",
    "1001—1500",
    "1501—2500",
    "2501—5000",
    "üle 5000"
]

const wordsOptions = [
    "kuni 100",
    "101—200",
    "201—300",
    "301—400",
    "401—600",
    "601—800",
    "üle 800"
]

const sentencesOptions = [
    "kuni 10",
    "11—20",
    "21—30",
    "31—60",
    "61—100",
    "üle 100"
]

export { useStyles, MenuProps, addedYearOptions, charactersOptions, wordsOptions, sentencesOptions };
