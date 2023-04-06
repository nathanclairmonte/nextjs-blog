import { parseISO, format } from "date-fns";

export default function Date({ dateString, type }) {
    const date = parseISO(dateString);
    // return <time dateTime={dateString}>{format(date, "yyyy-MM-dd")}</time>;
    // return <time dateTime={dateString}>{format(date, "LLLL Do, yyyy")}</time>;

    if (!type) {
        type = "numeric";
    }

    const long = <time dateTime={dateString}>{format(date, "LLLL Do, yyyy")}</time>;
    const numeric = <time dateTime={dateString}>{format(date, "yyyy-MM-dd")}</time>;

    return type === "long" ? long : numeric;
}
