package ResumeBuilder.backend.Models.DatabaseModels;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import ResumeBuilder.backend.Interfaces.IWriter;
import ResumeBuilder.backend.Utilities.DateFormatUtility;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "achievement")
public class AchievementModel implements IWriter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public int id;

    @Column
    public String title;

    @Column
    public String description;

    @Column
    public LocalDate date;

    public Object get(String key) {
        if (key.equals("title")) {
            return title;
        } else if (key.equals("description")) {
            return description;
        } else if (key.equals("date")) {
            return DateFormatUtility.toString(date);
        }
        return null;
    }
}
