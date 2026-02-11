package ResumeBuilder.backend.Models.DatabaseModels;

public class LineModel {
    public String line;
    public boolean isCommand;
    public boolean isLoopStart;
    public boolean isLoopEnd;
    public boolean isSectionStart;
    public boolean isSectionEnd;
    public boolean isWriteable;
    public boolean isDelimited;
    public boolean isHidden;
    public String delimiter;
    public String key;

    public LineModel(String rawLine) {
        rawLine = rawLine.strip();
        line = rawLine;

        if (rawLine.startsWith("%")) {
            rawLine = rawLine.replace("%", "");
            isCommand = true;
            String[] args = rawLine.split("-");
            if (args[0].equals("loop") && args[2].equals("start")) {
                isLoopStart = true;
                key = args[1];
            } else if (args[0].equals("loop") && args[2].equals("end")) {
                isLoopEnd = true;
                key = args[1];
            } else if (args[0].equals("section") && args[2].equals("start")) {
                isSectionStart = true;
                key = args[1];
            } else if (args[0].equals("section") && args[2].equals("end")) {
                isSectionEnd = true;
                key = args[1];
            } else {
                key = args[0];
                isWriteable = true;
            }

            for (int index = 0; index < args.length; index++) {
                String arg = args[index];
                if (arg.equals("delimited")) {
                    isDelimited = true;
                    delimiter = args[index + 1];
                }
            }
        }
    }
}
