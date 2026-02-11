package ResumeBuilder.backend.Models.DatabaseModels;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import ResumeBuilder.backend.Interfaces.IWriter;
import ResumeBuilder.backend.Utilities.DateFormatUtility;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "project")
public class ProjectModel implements IWriter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public int id;

    @Column
    public String title;

    @Column
    public LocalDate date;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_id")
    public List<ProjectBulletPointModel> description;

    public Object get(String key) {
        if (key.equals("title")) {
            return title;
        } else if (key.equals("date")) {
            return DateFormatUtility.toString(date);
        } else if (key.equals("description")) {
            return description;
        }
        return null;
    }
}
