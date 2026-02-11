package ResumeBuilder.backend.Utilities;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;

public class DateFormatUtility {
    // Formats a given date to it's abbreviation form
    public static String toString(LocalDate date) {
        if (date == null) {
            return "Present";
        }
        String month = date.getMonth().getDisplayName(TextStyle.SHORT, Locale.getDefault());
        if (!month.toLowerCase().equals("may")) {
            month += ".";
        }
        return month + " " + date.getYear();
    }
}
