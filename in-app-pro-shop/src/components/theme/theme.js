import colors from "./colors";

export default {

    appTheme: {
        navbar: {
            left: colors.accent1,
            right: colors.accent2,
            bg: colors.accent2,
            bottom: colors.accent2,
            brand: colors.accent2,
            button: colors.text1,
            hover: colors.text2,
        },

        menuitem: {
            top: colors.accent1,
            bottom: colors.text1,
            active: colors.light,
            button: colors.text1,
            hover: colors.accent1,
            disabled: colors.grayMedium
        },

        well: {
            top: colors.accent1,
            bottom: colors.accent2,
            bg: colors.accent1,
            head: colors.light,
            border: colors.accent2,
        },

        panel: {
            left: colors.accent1,
            right: colors.accent2,
            bg: colors.accent2,
            title: colors.accent2,
            subtitle: colors.light,
            divider: colors.accent2,
            label: colors.text1,
        },

        button: {
            bottom: colors.light,
            top: colors.white,
            bg: colors.light,
            label: colors.text1,
            hover: colors.text2,
            disabled: colors.grayMedium
        },

        table: {
            header_bg: colors.light,
            header: colors.text1,
            row_bg: colors.grayLight
        },

        form: {
            label: colors.text1,
            help: colors.text1,
            input: colors.text2
        },
    },

};