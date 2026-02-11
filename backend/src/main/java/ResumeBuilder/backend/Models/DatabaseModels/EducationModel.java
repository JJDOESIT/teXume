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
@Table(name = "education")
public class EducationModel implements IWriter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public int id;

    @Column
    public String school;

    @Column
    public String degree;

    @Column
    public String location;

    @Column
    public LocalDate startDate;

    @Column
    public LocalDate endDate;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "education_id")
    public List<EducationBulletPointModel> description;

    public Object get(String key) {
        if (key.equals("school")) {
            return school;
        } else if (key.equals("startDate")) {
            return DateFormatUtility.toString(startDate);
        } else if (key.equals("endDate")) {
            return DateFormatUtility.toString(endDate);
        } else if (key.equals("degree")) {
            return degree;
        } else if (key.equals("location")) {
            return location;
        } else if (key.equals("description")) {
            return description;
        }
        return null;
    }
}
