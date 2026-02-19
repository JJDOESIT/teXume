package ResumeBuilder.backend.Logic;

import java.io.BufferedWriter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import ResumeBuilder.backend.Interfaces.IWriter;
import ResumeBuilder.backend.Models.DatabaseModels.LineModel;

@Service
public class TemplateLogic {

    // Recursive algorithm to write user data to the output file
    public void solve(List<LineModel> lines, Object data, int position, BufferedWriter writer) {
        try {
            List<IWriter> writerData = (List<IWriter>) data;
            IWriter writerInterface = writerData.get(position);

            for (int index = 0; index < lines.size(); index++) {
                LineModel line = lines.get(index);

                if (line.isHidden) {
                    continue;
                }

                if (!line.isCommand) {
                    writer.write(line.line);
                    writer.newLine();
                    continue;
                }

                if (line.isLoopStart) {
                    List<LineModel> newLines = fetchLoop(lines, index + 1);

                    solve(newLines, writerInterface.get(line.key), 0, writer);

                    index += newLines.size() + 1;
                } else if (line.isWriteable) {
                    if (line.isDelimited) {
                        boolean lastEntry = !inBounds(data, position + 1);
                        if (!lastEntry) {
                            writer.write((String) writerInterface.get(line.key) + line.delimiter + " ");
                        } else {
                            writer.write((String) writerInterface.get(line.key));
                            writer.newLine();
                        }
                    } else {
                        String write = (String) writerInterface.get(line.key);
                        if (write != "") {
                            writer.write(write);
                            writer.newLine();
                        }
                    }
                } else {
                    writer.write(line.line);
                    writer.newLine();
                }
            }
            solve(lines, data, position + 1, writer);
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return;
        }
    }

    // Swap two given sections
    public void swapSections(List<LineModel> lines, String sectionOne, String sectionTwo) {

        int sectionOneIndex = fetchSectionStartIndex(lines, sectionOne);
        int sectionTwoIndex = fetchSectionStartIndex(lines, sectionTwo);

        if (sectionOneIndex == -1 || sectionTwoIndex == -1) {
            return;
        }

        List<LineModel> sectionOneLines = fetchSection(lines, sectionOne);
        List<LineModel> sectionTwoLines = fetchSection(lines, sectionTwo);

        removeSection(lines, sectionOne);
        removeSection(lines, sectionTwo);

        if (sectionTwoIndex < sectionOneIndex) {
            insertLines(lines, sectionOneLines, sectionTwoIndex);
            int difference = sectionOneLines.size() - sectionTwoLines.size();
            insertLines(lines, sectionTwoLines, sectionOneIndex + difference);
        } else {
            insertLines(lines, sectionTwoLines, sectionOneIndex);
            int difference = sectionTwoLines.size() - sectionOneLines.size();
            insertLines(lines, sectionOneLines, sectionTwoIndex + difference);
        }
    }

    // Hides the given section
    public void hideSection(List<LineModel> lines, String section) {
        List<LineModel> linesToRemove = fetchSection(lines, section);

        for (LineModel line : linesToRemove) {
            line.isHidden = true;
        }
    }

    // Unhides the given section
    public void unhideSection(List<LineModel> lines, String section) {
        List<LineModel> linesToAdd = fetchSection(lines, section);

        for (LineModel line : linesToAdd) {
            line.isHidden = false;
        }
    }

    // Fetches a list of lines between the start and end of the section
    private List<LineModel> fetchSection(List<LineModel> lines, String section) {
        boolean add = false;
        List<LineModel> newLines = new ArrayList<>();

        for (LineModel line : lines) {
            if (line.isSectionStart && line.key.equals(section)) {
                add = true;
            }
            if (add) {
                newLines.add(line);
            }
            if (line.isSectionEnd && line.key.equals(section)) {
                break;
            }
        }
        return newLines;
    }

    // Fetches a list of lines between the start and end of the loop
    private List<LineModel> fetchLoop(List<LineModel> lines, int start) {
        List<LineModel> newLines = new ArrayList<>();
        int count = 1;
        for (int index = 0; index < lines.size(); index++) {
            if (index < start) {
                continue;
            }
            LineModel line = lines.get(index);

            if (line.isLoopStart) {
                count += 1;
            } else if (line.isLoopEnd) {
                count -= 1;
            }

            if (count == 0) {
                return newLines;
            }
            newLines.add(line);
        }
        return newLines;
    }

    // Given lines to add, and a start index, insert the lines
    private void insertLines(List<LineModel> lines, List<LineModel> linesToAdd, int insertIndex) {
        for (int index = linesToAdd.size() - 1; index >= 0; index--) {
            LineModel line = linesToAdd.get(index);
            lines.add(insertIndex, line);
        }
    }

    // Fetch the starting index of a given section
    private int fetchSectionStartIndex(List<LineModel> lines, String section) {
        for (int index = 0; index < lines.size(); index++) {
            LineModel line = lines.get(index);
            if (line.isSectionStart && line.key.equals(section)) {
                return index;
            }
        }
        return -1;
    }

    // Checks whether the index is inbounds
    private boolean inBounds(Object data, int position) {
        try {
            List<IWriter> writerData = (List<IWriter>) data;
            writerData.get(position);
            return true;
        } catch (Exception error) {
            return false;
        }
    }

    // Removes the given section
    private void removeSection(List<LineModel> lines, String section) {
        List<LineModel> linesToRemove = fetchSection(lines, section);

        for (LineModel line : linesToRemove) {
            lines.remove(line);
        }
    }
}
