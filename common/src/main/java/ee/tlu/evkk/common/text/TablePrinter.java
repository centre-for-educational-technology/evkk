package ee.tlu.evkk.common.text;

import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 09.01.2021
 */
public class TablePrinter {

  private static final String LINE_SEPARATOR = System.lineSeparator();

  private final Column[] columns;

  public TablePrinter(Column... columns) {
    this.columns = columns;
  }

  public String print(@NonNull List<String[]> rows) {
    Objects.requireNonNull(rows, "rows must not be null");
    rows = rows.stream().map(TablePrinter::escapeLineBreaks).collect(Collectors.toUnmodifiableList());

    int[] columnMaxLengths = new int[columns.length];
    for (int i = 0; i < columns.length; i++) columnMaxLengths[i] = columns[i].title.length();

    for (int i = 0; i < rows.size(); i++) {

      String[] row = rows.get(i);
      if (row.length != columns.length) {
        String message = String.format("row.length(%s) != columns.length(%s) at index %s", row.length, columns.length, i);
        throw new IllegalArgumentException(message);
      }

      for (int j = 0; j < row.length; j++) {
        String cell = row[j];
        columnMaxLengths[j] = getColumnMaxLength(columnMaxLengths[j], cell.length(), columns[j].maxLength);
      }

    }

    int columnLengthTotal = columns.length + 1;
    for (int i = 0; i < columns.length; i++) {
      columnLengthTotal += columnMaxLengths[i] + 2;
    }

    String[] headers = new String[columns.length];
    for (int i = 0; i < columns.length; i++) headers[i] = columns[i].title;

    StringBuilder result = new StringBuilder();
    result.append(printHorizontalLine(columnMaxLengths, "╔", "╗", "═", "╦")).append(LINE_SEPARATOR);
    result.append(printRow(headers, columnMaxLengths, idx -> Alignment.CENTER, "║")).append(LINE_SEPARATOR);
    result.append(printHorizontalLine(columnMaxLengths, "╠", "╣", "═", "╬")).append(LINE_SEPARATOR);

    if (rows.isEmpty()) result.append("│").append(" ".repeat(columnLengthTotal - 2)).append("│").append(LINE_SEPARATOR);
    else result.append(printRows(rows, columnMaxLengths)).append(LINE_SEPARATOR);

    result.append(printHorizontalLine(columnMaxLengths, "└", "┘", "─", "┴")).append(LINE_SEPARATOR);
    return result.toString();
  }

  public static Column column(String title, Alignment alignment) {
    return column(title, alignment, -1);
  }

  public static Column column(String title, Alignment alignment, int maxLength) {
    return new Column(title, alignment, maxLength);
  }

  private String printHorizontalLine(int[] columnMaxLengths, String start, String end, String line, String separator) {
    StringJoiner joiner = new StringJoiner(separator, start, end);
    for (int columnMaxLength : columnMaxLengths) joiner.add(line.repeat(columnMaxLength + 2));
    return joiner.toString();
  }

  private CharSequence printRows(List<String[]> rows, int[] columnMaxLengths) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < rows.size(); i++) {
      sb.append(printRow(rows.get(i), columnMaxLengths, idx -> columns[idx].alignment, "│"));
      if (i != rows.size() - 1) sb.append(LINE_SEPARATOR);
    }
    return sb;
  }

  private CharSequence printRow(String[] row, int[] columnMaxLengths, Function<Integer, Alignment> alignmentFunction, String verticalLine) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < columns.length; i++) {
      sb.append(verticalLine).append(" ").append(printCellValue(row[i], alignmentFunction.apply(i), columnMaxLengths[i])).append(" ");
      if (i == columns.length - 1) sb.append(verticalLine);
    }
    return sb;
  }

  private String printCellValue(String value, Alignment alignment, int maxLength) {
    String aligned = align(value, alignment, maxLength);
    return abbrWithEllipsis(aligned, maxLength);
  }

  private String align(String value, Alignment alignment, int maxLength) {
    if (value == null) return null;
    switch (alignment) {
      case LEFT:
        return rightPad(value, maxLength);
      case CENTER:
        return centerPad(value, maxLength);
      case RIGHT:
        return leftPad(value, maxLength);
      default:
        throw new IllegalStateException();
    }
  }

  private int getColumnMaxLength(int currentMaxLength, int cellLength, int maxLength) {
    if (maxLength < 0) return Math.max(currentMaxLength, cellLength);
    return Math.max(currentMaxLength, Math.min(maxLength, cellLength));
  }

  static String[] escapeLineBreaks(String[] input) {
    if (input == null) return null;
    String[] result = new String[input.length];
    for (int i = 0; i < input.length; i++) result[i] = escapeLineBreaks(input[i]);
    return result;
  }

  static String escapeLineBreaks(String input) {
    if (input == null) return null;
    return input.replace("\n", "\\n").replace("\r", "\\r");
  }

  static String abbrWithEllipsis(String input, int maxLength) {
    if (input == null) return null;
    if (input.length() <= maxLength) return input;
    return input.substring(0, maxLength - 1) + "…";
  }

  static String centerPad(String input, int totalLength) {
    if (input == null) return null;
    int lengthToAdd = totalLength - input.length();
    if (lengthToAdd <= 0) return input;
    int addToLeft = lengthToAdd >> 1;
    int addToRight = totalLength - input.length() - addToLeft;
    return " ".repeat(addToLeft) + input + " ".repeat(addToRight);
  }

  static String leftPad(String input, int totalLength) {
    if (input == null) return null;
    int lengthToAdd = totalLength - input.length();
    if (lengthToAdd <= 0) return input;
    return " ".repeat(lengthToAdd) + input;
  }

  static String rightPad(String input, int totalLength) {
    if (input == null) return null;
    int lengthToAdd = totalLength - input.length();
    if (lengthToAdd <= 0) return input;
    return input + " ".repeat(lengthToAdd);
  }

  public enum Alignment {

    LEFT,
    CENTER,
    RIGHT

  }

  public static final class Column {

    private final String title;
    private final Alignment alignment;
    private final int maxLength;

    private Column(String title, Alignment alignment, int maxLength) {
      this.title = title;
      this.alignment = alignment;
      this.maxLength = maxLength;
    }

  }

}
