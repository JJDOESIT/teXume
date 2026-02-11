package ResumeBuilder.backend.Models.DatabaseModels;

import com.fasterxml.jackson.annotation.JsonProperty;

import ResumeBuilder.backend.Interfaces.IWriter;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "experience_bullet_point")
public class ExperienceBulletPointModel implements IWriter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public int id;

    @Column
    public String point;

    public Object get(String key) {
        if (key.equals("point")) {
            return point;
        }
        return null;
    }
}
